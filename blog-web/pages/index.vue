<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden text-white py-24 md:py-32">
      <!-- 多层渐变背景 -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950" />
      <div class="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-indigo-900/30" />

      <!-- 装饰性 SVG 网格 -->
      <svg class="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <!-- 浮动装饰光晕 -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-float-slow" />
      <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] animate-float-medium" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px]" />

      <!-- 几何装饰形状 -->
      <div class="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-2xl rotate-12 opacity-40 animate-float-slow" />
      <div class="absolute bottom-20 left-16 w-24 h-24 border border-white/10 rounded-full opacity-30 animate-float-medium" />
      <div class="absolute top-1/3 right-1/4 w-16 h-16 bg-white/5 rounded-xl rotate-45 opacity-50" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- 标签徽章 -->
        <div class="animate-fade-in-up mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          探索技术与生活的交汇点
        </div>

        <h1 class="animate-fade-in-up animation-delay-100 text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          欢迎来到 <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-300">Chris</span> 博客
        </h1>

        <p class="animate-fade-in-up animation-delay-200 text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed mb-10">
          分享技术探索、学习心得与生活感悟，记录成长路上的每一次思考与发现。
        </p>

        <div class="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink to="/posts" class="group px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 hover:shadow-xl hover:shadow-white/20 transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2">
            浏览文章
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </NuxtLink>
          <NuxtLink to="/about" class="btn-glass">
            关于我
          </NuxtLink>
        </div>

        <!-- 底部数据展示 -->
        <div class="animate-fade-in-up animation-delay-500 mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-white">{{ stats.posts || 0 }}</div>
            <div class="text-sm text-blue-200/60 mt-1">篇文章</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-white">{{ stats.categories || 0 }}</div>
            <div class="text-sm text-blue-200/60 mt-1">个分类</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-white">{{ stats.tags || 0 }}</div>
            <div class="text-sm text-blue-200/60 mt-1">个标签</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-white">{{ formatNumber(stats.views || 0) }}</div>
            <div class="text-sm text-blue-200/60 mt-1">次阅读</div>
          </div>
        </div>
      </div>

      <!-- 底部波浪过渡 -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 80V40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z" fill="#F9FAFB" />
        </svg>
      </div>
    </section>

    <!-- Latest Posts -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">最新文章</h2>
              <div class="mt-1 h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
            </div>
            <NuxtLink to="/posts" class="group text-blue-600 hover:text-indigo-600 font-medium inline-flex items-center gap-1 transition">
              查看全部
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </NuxtLink>
          </div>

          <div v-if="pending" class="space-y-6">
            <div v-for="i in 3" :key="i" class="card p-6 animate-pulse">
              <div class="h-48 bg-gray-200 rounded-xl mb-4" />
              <div class="h-4 bg-gray-200 rounded w-1/4 mb-2" />
              <div class="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div class="h-4 bg-gray-200 rounded w-full" />
            </div>
          </div>

          <div v-else-if="posts && posts.length" class="space-y-6">
            <PostCard v-for="(post, idx) in posts" :key="post.id" :post="post" :style="{ animationDelay: `${idx * 100}ms` }" class="animate-fade-in-up" />
          </div>

          <div v-else class="card p-12 text-center text-gray-500">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            暂无文章，敬请期待！
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { $api } = useApi();

useHead({
  title: 'Chris 博客 - 技术、学习与生活',
  meta: [
    { name: 'description', content: '分享技术探索、学习心得与生活感悟的个人博客。' },
  ],
});

const { data: posts, pending } = await useAsyncData('home-posts', () =>
  $api('/posts?limit=6&_t=' + Date.now()).then(r => r.data).catch(() => [])
);

// 获取统计数据
const { data: statsData } = await useAsyncData('home-stats', async () => {
  try {
    const t = Date.now();
    const [postsRes, catsRes, tagsRes, statsRes] = await Promise.all([
      $api('/posts?limit=1&_t=' + t).then(r => r.pagination?.total || 0),
      $api('/categories?_t=' + t).then(r => r.data?.length || 0),
      $api('/tags?_t=' + t).then(r => r.data?.length || 0),
      $api('/stats?_t=' + t).then(r => r.data?.totalViews || 0).catch(() => 0),
    ]);
    return { posts: postsRes, categories: catsRes, tags: tagsRes, views: statsRes };
  } catch {
    return { posts: 0, categories: 0, tags: 0, views: 0 };
  }
});

const stats = computed(() => statsData.value || { posts: 0, categories: 0, tags: 0, views: 0 });

const formatNumber = (n) => {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n;
};
</script>

<style scoped>
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}
@keyframes float-medium {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-15px, 15px); }
}
.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}
.animate-float-medium {
  animation: float-medium 10s ease-in-out infinite;
}
</style>
