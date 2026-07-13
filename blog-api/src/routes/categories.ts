import { Router } from 'express';
import { z } from 'zod';
import slugify from 'slugify';
import { prisma } from '../utils/prisma';
import { authenticate } from '../middlewares/auth';

const router = Router();

const categorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
});

// Public: List categories
router.get('/', async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { posts: true } },
      },
      orderBy: { name: 'asc' },
    });
    res.json({ data: categories });
  } catch (error) {
    next(error);
  }
});

// Public: Get single category
router.get('/:slug', async (req, res, next) => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
      include: {
        _count: { select: { posts: true } },
      },
    });
    if (!category) return res.status(404).json({ message: '分类不存在' });
    res.json(category);
  } catch (error) {
    next(error);
  }
});

// Protected: Create category
router.post('/', authenticate, async (req, res, next) => {
  try {
    const data = categorySchema.parse(req.body);
    const slug = data.slug || slugify(data.name, { lower: true, strict: true });
    const category = await prisma.category.create({
      data: { name: data.name, slug, description: data.description },
    });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

// Protected: Update category
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = categorySchema.parse(req.body);
    const slug = data.slug || slugify(data.name, { lower: true, strict: true });
    const category = await prisma.category.update({
      where: { id },
      data: { name: data.name, slug, description: data.description },
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
});

// Protected: Delete category
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.category.delete({ where: { id } });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
