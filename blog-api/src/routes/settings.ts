import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate } from '../middlewares/auth';

const router = Router();

const settingsSchema = z.record(z.string());

// Public: Get all settings
router.get('/', async (_req, res, next) => {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap = settings.reduce((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {} as Record<string, string>);
    res.json(settingsMap);
  } catch (error) {
    next(error);
  }
});

// Protected: Update settings
router.put('/', authenticate, async (req, res, next) => {
  try {
    const data = settingsSchema.parse(req.body);

    const updates = Object.entries(data).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );

    await prisma.$transaction(updates);

    const settings = await prisma.setting.findMany();
    const settingsMap = settings.reduce((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {} as Record<string, string>);

    res.json(settingsMap);
  } catch (error) {
    next(error);
  }
});

export default router;
