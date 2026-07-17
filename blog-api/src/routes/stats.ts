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

    // 分别执行查询，避免一个失败导致全部失败
    let totalPosts = 0, publishedPosts = 0, draftPosts = 0;
    let totalCategories = 0, totalTags = 0, totalComments = 0;
    let totalViews = 0, viewsLast7Days = 0, viewsLast30Days = 0;
    let dailyViews: any = [];

    try { totalPosts = await prisma.post.count(); }
    catch (e: any) { console.error('[stats] totalPosts error:', e?.message || e); }

    try { publishedPosts = await prisma.post.count({ where: { status: 'PUBLISHED' } }); }
    catch (e: any) { console.error('[stats] publishedPosts error:', e?.message || e); }

    try { draftPosts = await prisma.post.count({ where: { status: 'DRAFT' } }); }
    catch (e: any) { console.error('[stats] draftPosts error:', e?.message || e); }

    try { totalCategories = await prisma.category.count(); }
    catch (e: any) { console.error('[stats] totalCategories error:', e?.message || e); }

    try { totalTags = await prisma.tag.count(); }
    catch (e: any) { console.error('[stats] totalTags error:', e?.message || e); }

    try { totalComments = await prisma.comment.count(); }
    catch (e: any) { console.error('[stats] totalComments error:', e?.message || e); }

    try {
      const viewsResult = await prisma.post.aggregate({ _sum: { viewCount: true } });
      totalViews = viewsResult._sum.viewCount || 0;
    }
    catch (e: any) { console.error('[stats] totalViews error:', e?.message || e); }

    try { viewsLast7Days = await prisma.viewLog.count({ where: { visitedAt: { gte: last7Days } } }); }
    catch (e: any) { console.error('[stats] viewsLast7Days error:', e?.message || e); }

    try { viewsLast30Days = await prisma.viewLog.count({ where: { visitedAt: { gte: last30Days } } }); }
    catch (e: any) { console.error('[stats] viewsLast30Days error:', e?.message || e); }

    try {
      const rawDailyViews = await prisma.$queryRaw`
        SELECT DATE(visited_at) as date, COUNT(*) as count
        FROM view_logs
        WHERE visited_at >= ${last7Days}
        GROUP BY DATE(visited_at)
        ORDER BY date ASC
      `;
      // Prisma $queryRaw 返回的 COUNT(*) 是 BigInt，需要转换为 Number
      // 否则 JSON.stringify 会报错：TypeError: Do not know how to serialize a BigInt
      dailyViews = (rawDailyViews as any[]).map((row: any) => ({
        date: row.date,
        count: Number(row.count),
      }));
    }
    catch (e: any) { console.error('[stats] dailyViews error:', e?.message || e); }

    res.json({
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories,
      totalTags,
      totalComments,
      totalViews,
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
