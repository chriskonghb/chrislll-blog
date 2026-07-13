<template>
  <article class="card-hover group">
    <NuxtLink :to="`/posts/${post.slug}`" class="block">
      <div v-if="post.coverImage" class="aspect-video overflow-hidden relative">
        <img
          :src="post.coverImage"
          :alt="post.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        >
        <!-- 图片悬浮遮罩 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div class="p-6">
        <div class="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span
            v-if="post.category"
            class="px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg font-medium text-xs border border-blue-100/60"
          >
            {{ post.category.name }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {{ formatDate(post.publishedAt) }}
          </span>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {{ post.title }}
        </h2>
        <p v-if="post.excerpt" class="text-gray-600 line-clamp-3 mb-4 leading-relaxed">{{ post.excerpt }}</p>
        <div class="flex items-center justify-between pt-2 border-t border-gray-50">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-sm ring-2 ring-white shadow-sm">
              {{ post.author?.nickname?.[0] || post.author?.username?.[0] || 'C' }}
            </div>
            <span class="text-sm text-gray-600 font-medium">{{ post.author?.nickname || post.author?.username }}</span>
          </div>
          <div class="flex items-center gap-1 text-sm text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            <span>{{ post.viewCount }}</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup>
const props = defineProps({
  post: { type: Object, required: true }
});

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>
