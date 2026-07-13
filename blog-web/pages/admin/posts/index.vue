<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-900">文章管理</h1>
      <NuxtLink to="/admin/posts/new" class="btn-primary">+ 新建文章</NuxtLink>
    </div>

    <!-- Filters -->
    <div class="card p-4 mb-6 flex flex-wrap items-center gap-4">
      <select v-model="statusFilter" class="select w-40">
        <option value="">全部状态</option>
        <option value="PUBLISHED">已发布</option>
        <option value="DRAFT">草稿</option>
        <option value="ARCHIVED">已归档</option>
      </select>
      <input v-model="searchQuery" type="text" placeholder="搜索文章..." class="input w-64">
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分类</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">浏览量</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日期</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="post in filteredPosts" :key="post.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img v-if="post.coverImage" :src="post.coverImage" class="w-10 h-10 rounded-lg object-cover">
                  <div v-else class="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">无图</div>
                  <div>
                    <p class="font-medium text-gray-900">{{ post.title }}</p>
                    <p class="text-xs text-gray-500">/{{ post.slug }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ post.category?.name || '-' }}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 rounded-full text-xs font-medium" :class="statusClass(post.status)">{{ statusText(post.status) }}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ post.viewCount }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(post.publishedAt || post.createdAt) }}</td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink :to="`/posts/${post.slug}`" target="_blank" class="p-2 text-gray-400 hover:text-blue-600 transition" title="查看">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  </NuxtLink>
                  <NuxtLink :to="`/admin/posts/edit/${post.id}`" class="p-2 text-gray-400 hover:text-blue-600 transition" title="编辑">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </NuxtLink>
                  <button @click="deletePost(post.id)" class="p-2 text-gray-400 hover:text-red-600 transition" title="删除">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination v-if="totalPages > 1" v-model:page="page" :total-pages="totalPages" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

const { $api } = useApi();

const page = ref(1);
const statusFilter = ref('');
const searchQuery = ref('');

const { data: response, refresh } = await useAsyncData(
  () => `admin-posts-${page.value}-${statusFilter.value}`,
  () => $api(`/posts/admin/list?page=${page.value}&status=${statusFilter.value}`),
  { watch: [page, statusFilter] }
);

const posts = computed(() => response.value?.data || []);
const totalPages = computed(() => response.value?.pagination?.totalPages || 1);

const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value;
  const q = searchQuery.value.toLowerCase();
  return posts.value.filter(p => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q));
});

const statusClass = (status) => ({
  'PUBLISHED': 'bg-green-100 text-green-700',
  'DRAFT': 'bg-orange-100 text-orange-700',
  'ARCHIVED': 'bg-gray-100 text-gray-700',
}[status] || 'bg-gray-100 text-gray-700');

const statusText = (status) => ({
  'PUBLISHED': '已发布',
  'DRAFT': '草稿',
  'ARCHIVED': '已归档',
}[status] || status);

const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
};

const deletePost = async (id) => {
  if (!confirm('确定要删除这篇文章吗？')) return;
  try {
    await $api(`/posts/${id}`, { method: 'DELETE' });
    refresh();
  } catch (err) {
    alert(err?.data?.message || '删除失败');
  }
};
</script>
