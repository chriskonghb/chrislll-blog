<template>
  <aside class="space-y-8">
    <!-- About -->
    <div class="card-hover p-6 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-full" />
      <h3 class="text-lg font-bold text-gray-900 mb-4 relative">关于我</h3>
      <div class="flex items-center gap-4 mb-4 relative">
        <div class="w-16 h-16 rounded-full overflow-hidden shadow-lg shadow-blue-500/20 ring-4 ring-blue-50">
          <img src="/chris-avatar.jpg" alt="Chris" class="w-full h-full object-cover" />
        </div>
        <div>
          <p class="font-bold text-gray-900">Chris</p>
          <p class="text-sm text-gray-500">终身学习者 & 开发者</p>
        </div>
      </div>
      <p class="text-gray-600 text-sm leading-relaxed relative">欢迎来到我的博客！这里记录技术探索、学习心得与生活感悟。</p>
      <NuxtLink to="/about" class="inline-flex items-center gap-1 mt-4 text-blue-600 hover:text-indigo-600 font-medium text-sm group transition">
        了解更多
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
      </NuxtLink>
    </div>

    <!-- Popular Posts -->
    <div v-if="popularPosts.length" class="card p-6">
      <div class="flex items-center gap-2 mb-4">
        <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path></svg>
        <h3 class="text-lg font-bold text-gray-900">热门文章</h3>
      </div>
      <div class="space-y-4">
        <NuxtLink
          v-for="(post, idx) in popularPosts"
          :key="post.id"
          :to="`/posts/${post.slug}`"
          class="block group"
        >
          <div class="flex gap-3">
            <span class="text-xs font-bold text-gray-300 mt-0.5 w-4">{{ idx + 1 }}</span>
            <div>
              <h4 class="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition line-clamp-2 leading-snug">{{ post.title }}</h4>
              <div class="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <span>{{ formatDate(post.publishedAt) }}</span>
                <span class="w-1 h-1 rounded-full bg-gray-300" />
                <span class="flex items-center gap-0.5">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  {{ post.viewCount }}
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Categories -->
    <div v-if="categories.length" class="card p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">分类</h3>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.id"
          :to="`/category/${cat.slug}`"
          class="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100/80 text-gray-700 rounded-xl text-sm hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 hover:shadow-sm hover:shadow-blue-100/50 transition-all border border-gray-100 hover:border-blue-200/60"
        >
          {{ cat.name }}
          <span class="text-gray-400 ml-1 text-xs">{{ cat._count?.posts || 0 }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Tags -->
    <div v-if="tags.length" class="card p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">标签</h3>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.id"
          :to="`/tag/${tag.slug}`"
          class="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-xl text-sm hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm transition-all border border-transparent hover:border-blue-100"
        >
          {{ tag.name }}
        </NuxtLink>
      </div>
    </div>
  </aside>
</template>

<script setup>
const { $api } = useApi();

const { data: categories } = await useAsyncData('categories', () => $api('/categories').then(r => r.data));
const { data: tags } = await useAsyncData('tags', () => $api('/tags').then(r => r.data));
const { data: popularPosts } = await useAsyncData('popular', () => $api('/posts?limit=5').then(r => r.data));

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
};
</script>
