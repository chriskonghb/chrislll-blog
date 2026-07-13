import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate } from '../middlewares/auth';
import { upload } from '../middlewares/upload';

const router = Router();

// Protected: Upload image
router.post('/', authenticate, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '未选择文件' });
    }

    const media = await prisma.media.create({
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`,
      },
    });

    res.status(201).json({
      id: media.id,
      url: media.url,
      originalName: media.originalName,
      size: media.size,
    });
  } catch (error) {
    next(error);
  }
});

// Protected: List media
router.get('/', authenticate, async (_req, res, next) => {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ data: media });
  } catch (error) {
    next(error);
  }
});

// Protected: Delete media
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.media.delete({ where: { id } });
    res.json({ message: '文件已删除' });
  } catch (error) {
    next(error);
  }
});

export default router;
