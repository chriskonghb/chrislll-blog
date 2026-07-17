<template>
  <div>
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink to="/admin/posts" class="text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      </NuxtLink>
      <h1 class="text-2xl font-bold text-gray-900">编辑文章</h1>
    </div>
    
    <PostEditor v-if="post" :post="post" @save="handleSave" />
    <div v-else class="text-center py-16 text-gray-500">加载中...</div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

const { $api } = useApi();
const route = useRoute();
const router = useRouter();

const { data: post } = await useAsyncData(`post-edit-${route.params.id}`, () =>
  $api(`/posts/admin/list`).then(r => {
    const found = r.data.find(p => p.id === parseInt(route.params.id));
    if (!found) throw new Error('文章不存在');
    return found;
  }), { server: false }
);

const handleSave = async (data) => {
  try {
    await $api(`/posts/${route.params.id}`, {
      method: 'PUT',
      body: data,
    });
    router.push('/admin/posts');
  } catch (err) {
    // 显示具体的验证错误信息
    const errors = err?.data?.errors;
    if (errors && errors.length > 0) {
      const msg = errors.map(e => `${e.path?.join('.')}: ${e.message}`).join('\n');
      alert('数据验证失败：\n' + msg);
    } else {
      alert(err?.data?.message || '更新文章失败');
    }
  }
};
</script>
