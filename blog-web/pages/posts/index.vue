<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Page Header -->
    <div class="mb-10">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
        <h1 class="text-3xl font-bold text-gray-900">全部文章</h1>
      </div>
      <p class="text-gray-500 ml-5">探索所有 published 的内容，发现感兴趣的话题。</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <div v-if="pending" class="space-y-6">
          <div v-for="i in 3" :key="i" class="card p-6 animate-pulse">
            <div class="h-48 bg-gray-200 rounded-xl mb-4" />
            <div class="h-4 bg-gray-200 rounded w-1/4 mb-2" />
            <div class="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          </div>
        </div>

        <div v-else-if="posts.length" class="space-y-6">
          <PostCard v-for="(post, idx) in posts" :key="post.id" :post="post" :style="{ animationDelay: `${idx * 80}ms` }" class="animate-fade-in-up" />
          <Pagination v-model:page="page" :total-pages="totalPages" />
        </div>

        <div v-else class="card p-12 text-center text-gray-500">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          暂无文章。
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script setup>
const { $api } = useApi();
const route = useRoute();

const page = ref(parseInt(route.query.page) || 1);
const limit = 10;

useHead({
  title: '全部文章 - Chris 博客',
});

const { data: response, pending } = await useAsyncData(
  () => `posts-page-${page.value}`,
  () => $api(`/posts?page=${page.value}&limit=${limit}&_t=${Date.now()}`).catch(() => ({ data: [], pagination: { total: 0, totalPages: 1 } })),
  { watch: [page] }
);

const posts = computed(() => response.value?.data || []);
const totalPages = computed(() => response.value?.pagination?.totalPages || 1);

watch(page, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>
