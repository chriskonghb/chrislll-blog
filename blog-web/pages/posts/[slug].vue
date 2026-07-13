<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="pending" class="animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-3/4 mb-4" />
      <div class="h-4 bg-gray-200 rounded w-1/2 mb-8" />
      <div class="h-64 bg-gray-200 rounded-xl mb-8" />
      <div class="space-y-3">
        <div class="h-4 bg-gray-200 rounded w-full" />
        <div class="h-4 bg-gray-200 rounded w-full" />
        <div class="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>

    <article v-else-if="post" class="animate-fade-in-up">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <NuxtLink to="/" class="hover:text-blue-600 transition flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          首页
        </NuxtLink>
        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        <NuxtLink to="/posts" class="hover:text-blue-600 transition">文章</NuxtLink>
        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        <span class="text-gray-700 font-medium truncate max-w-[200px]">{{ post.title }}</span>
      </nav>

      <!-- Header -->
      <header class="mb-8">
        <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-5">
          <NuxtLink
            v-if="post.category"
            :to="`/category/${post.category.slug}`"
            class="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg font-medium hover:shadow-sm hover:shadow-blue-100/50 transition border border-blue-100/60"
          >
            {{ post.category.name }}
          </NuxtLink>
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {{ formatDate(post.publishedAt) }}
          </span>
          <span class="w-1 h-1 rounded-full bg-gray-300" />
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            {{ post.viewCount }} 次阅读
          </span>
        </div>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{{ post.title }}</h1>
        <div class="flex items-center gap-3 p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
          <div class="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
            {{ post.author?.nickname?.[0] || post.author?.username?.[0] || 'C' }}
          </div>
          <div>
            <p class="font-semibold text-gray-900">{{ post.author?.nickname || post.author?.username }}</p>
            <p class="text-xs text-gray-500">作者</p>
          </div>
        </div>
      </header>

      <!-- Cover Image -->
      <div v-if="post.coverImage" class="mb-10 rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50">
        <img :src="post.coverImage" :alt="post.title" class="w-full object-cover">
      </div>

      <!-- Content -->
      <div class="prose-blog mb-10" v-html="post.content"></div>

      <!-- Tags -->
      <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mb-10">
        <NuxtLink
          v-for="tag in post.tags"
          :key="tag.id"
          :to="`/tag/${tag.slug}`"
          class="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100/80 text-gray-700 rounded-xl text-sm hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 hover:shadow-sm transition-all border border-gray-100 hover:border-blue-200/60"
        >
          # {{ tag.name }}
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <div class="border-t border-gray-100 pt-8 flex flex-col sm:flex-row justify-between gap-4">
        <div class="flex-1">
          <span class="text-xs text-gray-400 uppercase tracking-wider font-medium">上一篇</span>
        </div>
        <NuxtLink to="/posts" class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          返回文章列表
        </NuxtLink>
        <div class="flex-1 text-right">
          <span class="text-xs text-gray-400 uppercase tracking-wider font-medium">下一篇</span>
        </div>
      </div>
    </article>

    <div v-else class="text-center py-20 animate-fade-in">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-900 mb-3">文章未找到</h1>
      <p class="text-gray-500 mb-6">抱歉，你访问的文章不存在或已被移除。</p>
      <NuxtLink to="/posts" class="btn-primary">
        浏览全部文章
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { $api } = useApi();
const route = useRoute();

const { data: post, pending } = await useAsyncData(
  `post-${route.params.slug}`,
  () => $api(`/posts/${route.params.slug}`),
  { server: true }
);

useHead(() => ({
  title: post.value ? `${post.value.title} - Chris 博客` : '文章未找到',
  meta: [
    { name: 'description', content: post.value?.excerpt || '' },
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.excerpt },
    { property: 'og:type', content: 'article' },
  ],
}));

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>
