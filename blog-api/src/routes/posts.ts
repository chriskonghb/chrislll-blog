import { Router } from 'express';
import { z } from 'zod';
import slugify from 'slugify';
import { prisma } from '../utils/prisma';
import { authenticate, AuthRequest } from '../middlewares/auth';

const router = Router();

const postSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  categoryId: z.number().optional().nullable(),
  tagIds: z.array(z.number()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  publishedAt: z.string().datetime().optional().nullable(),
});

// Public: List posts
router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
    const category = req.query.category as string;
    const tag = req.query.tag as string;
    const search = req.query.search as string;

    const where: any = { status: 'PUBLISHED' };

    if (category) {
      where.category = { slug: category };
    }

    if (tag) {
      where.tags = { some: { tag: { slug: tag } } };
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: { select: { id: true, username: true, nickname: true } },
          category: { select: { id: true, name: true, slug: true } },
          tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
          _count: { select: { comments: true } },
        },
        orderBy: { publishedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    // Record view log
    if (req.ip) {
      await prisma.viewLog.create({
        data: {
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          path: req.path,
        },
      });
    }

    res.json({
      data: posts.map(p => ({
        ...p,
        tags: p.tags.map(t => t.tag),
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

// Public: Get single post by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      include: {
        author: { select: { id: true, username: true, nickname: true } },
        category: { select: { id: true, name: true, slug: true } },
        tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
        _count: { select: { comments: true } },
      },
    });

    if (!post || post.status !== 'PUBLISHED') {
      return res.status(404).json({ message: '文章不存在' });
    }

    // Increment view count
    await prisma.post.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    });

    // Record view log
    if (req.ip) {
      await prisma.viewLog.create({
        data: {
          postId: post.id,
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          path: req.path,
        },
      });
    }

    res.json({
      ...post,
      tags: post.tags.map(t => t.tag),
      viewCount: post.viewCount + 1,
    });
  } catch (error) {
    next(error);
  }
});

// Protected: Admin list (includes drafts)
router.get('/admin/list', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
    const status = req.query.status as string;

    const where: any = {};
    if (status && ['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(status)) {
      where.status = status;
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: { select: { id: true, username: true, nickname: true } },
          category: { select: { id: true, name: true, slug: true } },
          tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
          _count: { select: { comments: true } },
        },
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    res.json({
      data: posts.map(p => ({
        ...p,
        tags: p.tags.map(t => t.tag),
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

// Protected: Create post
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const data = postSchema.parse(req.body);
    const slug = data.slug || slugify(data.title, { lower: true, strict: true });

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        status: data.status || 'DRAFT',
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        authorId: req.user!.id,
        categoryId: data.categoryId,
        tags: data.tagIds ? {
          create: data.tagIds.map(tagId => ({ tagId })),
        } : undefined,
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
      },
    });

    res.status(201).json({
      ...post,
      tags: post.tags.map(t => t.tag),
    });
  } catch (error) {
    next(error);
  }
});

// Protected: Update post
router.put('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = postSchema.parse(req.body);
    const slug = data.slug || slugify(data.title, { lower: true, strict: true });

    // Delete existing tags and recreate
    if (data.tagIds !== undefined) {
      await prisma.postTag.deleteMany({ where: { postId: id } });
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        status: data.status,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        categoryId: data.categoryId,
        tags: data.tagIds ? {
          create: data.tagIds.map(tagId => ({ tagId })),
        } : undefined,
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
      },
    });

    res.json({
      ...post,
      tags: post.tags.map(t => t.tag),
    });
  } catch (error) {
    next(error);
  }
});

// Protected: Delete post
router.delete('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.post.delete({ where: { id } });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
