import { Router } from 'express';
import { z } from 'zod';
import slugify from 'slugify';
import { prisma } from '../utils/prisma';
import { authenticate } from '../middlewares/auth';

const router = Router();

const tagSchema = z.object({
  name: z.string().min(1).max(50),
  slug: z.string().min(1).max(50).optional(),
});

// Public: List tags
router.get('/', async (_req, res, next) => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: { select: { posts: true } },
      },
      orderBy: { name: 'asc' },
    });
    res.json({ data: tags });
  } catch (error) {
    next(error);
  }
});

// Public: Get single tag
router.get('/:slug', async (req, res, next) => {
  try {
    const tag = await prisma.tag.findUnique({
      where: { slug: req.params.slug },
      include: {
        _count: { select: { posts: true } },
      },
    });
    if (!tag) return res.status(404).json({ message: '标签不存在' });
    res.json(tag);
  } catch (error) {
    next(error);
  }
});

// Protected: Create tag
router.post('/', authenticate, async (req, res, next) => {
  try {
    const data = tagSchema.parse(req.body);
    const slug = data.slug || slugify(data.name, { lower: true, strict: true });
    const tag = await prisma.tag.create({
      data: { name: data.name, slug },
    });
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
});

// Protected: Delete tag
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.tag.delete({ where: { id } });
    res.json({ message: 'Tag deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
