<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="mb-10">
          <NuxtLink to="/posts" class="text-sm text-gray-500 hover:text-blue-600 inline-flex items-center gap-1 transition mb-3">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            返回文章列表
          </NuxtLink>
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
            <h1 class="text-3xl font-bold text-gray-900">
              分类：{{ category?.name || slug }}
            </h1>
          </div>
          <p v-if="category?.description" class="text-gray-500 ml-5 mt-2">{{ category.description }}</p>
        </div>

        <div v-if="posts.length" class="space-y-6">
          <PostCard v-for="(post, idx) in posts" :key="post.id" :post="post" :style="{ animationDelay: `${idx * 80}ms` }" class="animate-fade-in-up" />
          <Pagination v-model:page="page" :total-pages="totalPages" />
        </div>
        <div v-else class="card p-12 text-center text-gray-500">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          该分类下暂无文章。
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
const slug = route.params.slug;

const page = ref(1);
const limit = 10;

const { data: category } = await useAsyncData(`category-${slug}`, () =>
  $api(`/categories/${slug}`)
);

const { data: response } = await useAsyncData(
  () => `category-posts-${slug}-${page.value}`,
  () => $api(`/posts?category=${slug}&page=${page.value}&limit=${limit}`),
  { watch: [page] }
);

const posts = computed(() => response.value?.data || []);
const totalPages = computed(() => response.value?.pagination?.totalPages || 1);

useHead({
  title: `${category.value?.name || slug} - Chris 博客`,
});
</script>
