<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="mb-10">
          <form @submit.prevent="handleSearch" class="flex gap-3">
            <div class="relative flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索文章..."
                class="input pl-10"
              >
              <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button type="submit" class="btn-primary">搜索</button>
          </form>

          <div class="flex items-center gap-3 mt-8">
            <div class="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
            <h1 class="text-2xl font-bold text-gray-900">
              <span v-if="q">"{{ q }}" 的搜索结果</span>
              <span v-else>搜索文章</span>
            </h1>
          </div>
          <p v-if="q && !pending" class="text-gray-500 ml-5 mt-1">共 {{ total }} 条结果</p>
        </div>

        <div v-if="pending" class="space-y-6">
          <div v-for="i in 3" :key="i" class="card p-6 animate-pulse">
            <div class="h-6 bg-gray-200 rounded w-3/4 mb-2" />
            <div class="h-4 bg-gray-200 rounded w-full" />
          </div>
        </div>

        <div v-else-if="posts.length" class="space-y-6">
          <PostCard v-for="(post, idx) in posts" :key="post.id" :post="post" :style="{ animationDelay: `${idx * 80}ms` }" class="animate-fade-in-up" />
          <Pagination v-model:page="page" :total-pages="totalPages" />
        </div>

        <div v-else-if="q" class="card p-12 text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p class="text-gray-500 text-lg mb-3">未找到与 "{{ q }}" 相关的文章</p>
          <NuxtLink to="/posts" class="btn-primary">浏览全部文章</NuxtLink>
        </div>
      </div>
      <div class="lg:col-span-1">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script setup>
const { $api } = useApi();
const route = useRoute();
const router = useRouter();

const q = ref(route.query.q || '');
const searchQuery = ref(q.value);
const page = ref(1);
const limit = 10;

useHead({
  title: () => q.value ? `搜索：${q.value} - Chris 博客` : '搜索 - Chris 博客',
});

const { data: response, pending } = await useAsyncData(
  () => `search-${q.value}-${page.value}`,
  () => {
    if (!q.value) return { data: [], pagination: { total: 0, totalPages: 1 } };
    return $api(`/search?q=${encodeURIComponent(q.value)}&page=${page.value}&limit=${limit}&_t=${Date.now()}`);
  },
  { watch: [q, page] }
);

const posts = computed(() => response.value?.data || []);
const total = computed(() => response.value?.pagination?.total || 0);
const totalPages = computed(() => response.value?.pagination?.totalPages || 1);

const handleSearch = () => {
  q.value = searchQuery.value;
  page.value = 1;
  router.push({ query: { q: searchQuery.value } });
};
</script>
