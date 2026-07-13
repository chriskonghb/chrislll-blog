import { Router } from 'express';
import { prisma } from '../utils/prisma';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const q = req.query.q as string;
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));

    if (!q || q.trim().length === 0) {
      return res.json({ data: [], pagination: { page, limit, total: 0, totalPages: 0 } });
    }

    const where: any = {
      status: 'PUBLISHED',
      OR: [
        { title: { contains: q } },
        { excerpt: { contains: q } },
        { content: { contains: q } },
      ],
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: { select: { id: true, username: true, nickname: true } },
          category: { select: { id: true, name: true, slug: true } },
          tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
        },
        orderBy: { publishedAt: 'desc' },
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

export default router;
