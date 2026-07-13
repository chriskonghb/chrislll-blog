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
            <div class="w-1.5 h-8 bg-gradient-to-b from-indigo-600 to-violet-600 rounded-full" />
            <h1 class="text-3xl font-bold text-gray-900">
              标签：#{{ tag?.name || slug }}
            </h1>
          </div>
        </div>

        <div v-if="posts.length" class="space-y-6">
          <PostCard v-for="(post, idx) in posts" :key="post.id" :post="post" :style="{ animationDelay: `${idx * 80}ms` }" class="animate-fade-in-up" />
          <Pagination v-model:page="page" :total-pages="totalPages" />
        </div>
        <div v-else class="card p-12 text-center text-gray-500">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
          </div>
          该标签下暂无文章。
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

const { data: tag } = await useAsyncData(`tag-${slug}`, () =>
  $api(`/tags/${slug}`)
);

const { data: response } = await useAsyncData(
  () => `tag-posts-${slug}-${page.value}`,
  () => $api(`/posts?tag=${slug}&page=${page.value}&limit=${limit}`),
  { watch: [page] }
);

const posts = computed(() => response.value?.data || []);
const totalPages = computed(() => response.value?.pagination?.totalPages || 1);

useHead({
  title: `#${tag.value?.name || slug} - Chris 博客`,
});
</script>
