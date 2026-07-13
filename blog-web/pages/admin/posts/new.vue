<template>
  <div>
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink to="/admin/posts" class="text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      </NuxtLink>
      <h1 class="text-2xl font-bold text-gray-900">新建文章</h1>
    </div>
    
    <PostEditor @save="handleSave" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

const { $api } = useApi();
const router = useRouter();

const handleSave = async (data) => {
  try {
    await $api('/posts', {
      method: 'POST',
      body: data,
    });
    router.push('/admin/posts');
  } catch (err) {
    alert(err?.data?.message || '创建文章失败');
  }
};
</script>
