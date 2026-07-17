<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-8">仪表盘</h1>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">文章总数</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats?.totalPosts || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
        </div>
        <div class="mt-4 flex items-center text-sm">
          <span class="text-green-600 font-medium">{{ stats?.publishedPosts || 0 }}</span>
          <span class="text-gray-500 ml-2">已发布</span>
          <span class="text-gray-300 mx-2">|</span>
          <span class="text-orange-600 font-medium">{{ stats?.draftPosts || 0 }}</span>
          <span class="text-gray-500 ml-2">草稿</span>
        </div>
      </div>
      
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">总浏览量</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats?.totalViews || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          </div>
        </div>
        <div class="mt-4 text-sm text-gray-500">
          <span class="text-green-600 font-medium">+{{ stats?.viewsLast7Days || 0 }}</span> 近7天浏览
        </div>
      </div>
      
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">分类数</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats?.totalCategories || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
          </div>
        </div>
        <div class="mt-4 text-sm text-gray-500">
          <span class="text-purple-600 font-medium">{{ stats?.totalTags || 0 }}</span> 个标签
        </div>
      </div>
      
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">评论数</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats?.totalComments || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          </div>
        </div>
        <div class="mt-4 text-sm text-gray-500">
          待审核
        </div>
      </div>
    </div>

    <!-- Recent Posts -->
    <div class="card mb-8">
      <div class="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 class="text-lg font-bold text-gray-900">最近文章</h2>
        <NuxtLink to="/admin/posts" class="text-blue-600 hover:text-blue-800 text-sm font-medium">查看全部</NuxtLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">浏览量</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日期</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="post in recentPosts" :key="post.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <NuxtLink :to="`/posts/${post.slug}`" target="_blank" class="font-medium text-gray-900 hover:text-blue-600">{{ post.title }}</NuxtLink>
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 rounded-full text-xs font-medium" :class="post.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : post.status === 'DRAFT' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'">{{ post.status }}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ post.viewCount }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(post.publishedAt || post.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

const { $api } = useApi();

// 后台页面跳过 SSR 数据获取，token 仅在客户端 localStorage 中存在
const { data: stats } = await useAsyncData('stats', () => $api('/stats/overview'), { server: false });
const { data: recentPostsData } = await useAsyncData('recent-posts', () => $api('/posts/admin/list?limit=5'), { server: false });

const recentPosts = computed(() => recentPostsData.value?.data || []);

const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>
