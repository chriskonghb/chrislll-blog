import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Public: Basic stats for frontend display
router.get('/', async (_req, res, next) => {
  try {
    const [totalPosts, totalCategories, totalTags, totalViews] = await Promise.all([
      prisma.post.count({ where: { status: 'PUBLISHED' } }),
      prisma.category.count(),
      prisma.tag.count(),
      prisma.post.aggregate({ _sum: { viewCount: true } }),
    ]);

    res.json({
      data: {
        totalPosts,
        totalCategories,
        totalTags,
        totalViews: totalViews._sum.viewCount || 0,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Protected: Overview stats
router.get('/overview', authenticate, async (_req, res, next) => {
  try {
    const now = new Date();
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories,
      totalTags,
      totalComments,
      totalViews,
      viewsLast7Days,
      viewsLast30Days,
    ] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: 'PUBLISHED' } }),
      prisma.post.count({ where: { status: 'DRAFT' } }),
      prisma.category.count(),
      prisma.tag.count(),
      prisma.comment.count(),
      prisma.post.aggregate({ _sum: { viewCount: true } }),
      prisma.viewLog.count({ where: { visitedAt: { gte: last7Days } } }),
      prisma.viewLog.count({ where: { visitedAt: { gte: last30Days } } }),
    ]);

    // Daily views for last 7 days
    const dailyViews = await prisma.$queryRaw`
      SELECT DATE(visited_at) as date, COUNT(*) as count
      FROM view_logs
      WHERE visited_at >= ${last7Days}
      GROUP BY DATE(visited_at)
      ORDER BY date ASC
    `;

    res.json({
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories,
      totalTags,
      totalComments,
      totalViews: totalViews._sum.viewCount || 0,
      viewsLast7Days,
      viewsLast30Days,
      dailyViews,
    });
  } catch (error) {
    next(error);
  }
});

// Protected: Post ranking by views
router.get('/posts', authenticate, async (req, res, next) => {
  try {
    const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        title: true,
        slug: true,
        viewCount: true,
        publishedAt: true,
      },
      orderBy: { viewCount: 'desc' },
      take: limit,
    });
    res.json({ data: posts });
  } catch (error) {
    next(error);
  }
});

export default router;
