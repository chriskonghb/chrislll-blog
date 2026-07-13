import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 创建管理员
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@chrislll.cn',
      password: hashedPassword,
      nickname: 'Chris',
      role: 'ADMIN',
    },
  });

  console.log('管理员已创建:', admin.username);

  // 创建默认分类
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'technology' },
      update: {},
      create: { name: '技术', slug: 'technology', description: '技术文章与教程' },
    }),
    prisma.category.upsert({
      where: { slug: 'life' },
      update: {},
      create: { name: '生活', slug: 'life', description: '个人故事与经历' },
    }),
    prisma.category.upsert({
      where: { slug: 'learning' },
      update: {},
      create: { name: '学习', slug: 'learning', description: '学习笔记与资源分享' },
    }),
  ]);

  console.log('分类已创建:', categories.map(c => c.name).join(', '));

  // 创建默认标签
  const tags = await Promise.all([
    prisma.tag.upsert({ where: { slug: 'javascript' }, update: {}, create: { name: 'JavaScript', slug: 'javascript' } }),
    prisma.tag.upsert({ where: { slug: 'nodejs' }, update: {}, create: { name: 'Node.js', slug: 'nodejs' } }),
    prisma.tag.upsert({ where: { slug: 'vue' }, update: {}, create: { name: 'Vue', slug: 'vue' } }),
    prisma.tag.upsert({ where: { slug: 'nuxt' }, update: {}, create: { name: 'Nuxt', slug: 'nuxt' } }),
    prisma.tag.upsert({ where: { slug: 'typescript' }, update: {}, create: { name: 'TypeScript', slug: 'typescript' } }),
  ]);

  console.log('标签已创建:', tags.map(t => t.name).join(', '));

  // 创建示例文章
  const samplePosts = [
    {
      title: '欢迎来到 Chris 博客',
      slug: 'welcome-to-chris-blog',
      excerpt: '这是 Chris 博客的第一篇文章。在这里，我将分享技术探索、学习心得与生活感悟。',
      content: '<p>欢迎来到我的博客！这是一个记录技术探索、学习心得与生活感悟的空间。希望你能在这里找到有价值的内容。</p><p>我将会分享关于技术、编程、学习方法以及个人成长方面的话题。欢迎随时浏览和留言。</p>',
      status: 'PUBLISHED' as const,
      categoryId: categories[1].id,
      tagIds: [tags[4].id],
    },
    {
      title: '用 Vue 和 Node.js 从零搭建这个博客',
      slug: 'how-i-built-this-blog',
      excerpt: '详细介绍如何使用 Vue 3、Nuxt 3、Express 和 MySQL 从零搭建一个全栈博客。',
      content: '<p>在这篇文章中，我将分享如何从零开始搭建这个博客。技术栈如下：</p><ul><li>Vue 3 + Nuxt 3 用于前端 SSR</li><li>Express + TypeScript 用于后端 API</li><li>MySQL 配合 Prisma ORM</li><li>Tailwind CSS 用于样式</li></ul><p>后续还会分享更多技术细节，敬请期待！</p>',
      status: 'PUBLISHED' as const,
      categoryId: categories[0].id,
      tagIds: [tags[0].id, tags[1].id, tags[2].id, tags[3].id, tags[4].id],
    },
    {
      title: '我的 2026 年学习计划',
      slug: 'learning-plan-2026',
      excerpt: '制定目标，为提升技术能力规划清晰的学习路径。',
      content: '<p>持续学习是技术人的必修课。这是我的 2026 年计划：</p><ol><li>深入学习 Rust 语言</li><li>掌握 Docker 和 Kubernetes</li><li>每周至少写一篇技术博客</li><li>参与开源项目贡献</li></ol><p>坚持是成功的关键！</p>',
      status: 'PUBLISHED' as const,
      categoryId: categories[2].id,
      tagIds: [],
    },
  ];

  for (const postData of samplePosts) {
    const { tagIds, ...rest } = postData;
    const post = await prisma.post.upsert({
      where: { slug: rest.slug },
      update: {},
      create: {
        ...rest,
        authorId: admin.id,
        publishedAt: new Date(),
        tags: {
          create: tagIds.map(tagId => ({ tagId })),
        },
      },
    });
    console.log('文章已创建:', post.title);
  }

  // 创建默认网站设置
  const defaultSettings = [
    { key: 'siteTitle', value: 'Chris 博客' },
    { key: 'siteDescription', value: '一个分享技术探索、学习心得与生活感悟的个人博客。' },
    { key: 'siteKeywords', value: '技术, 博客, 编程, 学习, 生活' },
    { key: 'footerText', value: 'Copyright 2026 Chris. All rights reserved.' },
    { key: 'postsPerPage', value: '10' },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('默认设置已创建。');
  console.log('种子数据初始化完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
