<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-900">标签管理</h1>
      <button @click="showModal = true" class="btn-primary">+ 新建标签</button>
    </div>

    <div class="card overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">名称</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">别名</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">文章数</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="tag in tags" :key="tag.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 font-medium text-gray-900">{{ tag.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">/{{ tag.slug }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ tag._count?.posts || 0 }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="deleteTag(tag.id)" class="p-2 text-gray-400 hover:text-red-600 transition" title="删除">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h2 class="text-xl font-bold text-gray-900 mb-4">新建标签</h2>
        <form @submit.prevent="saveTag" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">名称</label>
            <input v-model="form.name" type="text" required class="input">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">别名</label>
            <input v-model="form.slug" type="text" class="input" placeholder="自动生成">
          </div>
          <div class="flex gap-3 pt-2">
            <button type="submit" class="btn-primary flex-1">保存</button>
            <button type="button" @click="showModal = false" class="btn-secondary">取消</button>
          </div>
        </form>
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

const { data: tags, refresh } = await useAsyncData('admin-tags', () =>
  $api('/tags').then(r => r.data), { server: false }
);

const showModal = ref(false);
const form = ref({ name: '', slug: '' });

const saveTag = async () => {
  try {
    await $api('/tags', { method: 'POST', body: form.value });
    showModal.value = false;
    form.value = { name: '', slug: '' };
    refresh();
  } catch (err) {
    alert(err?.data?.message || '保存失败');
  }
};

const deleteTag = async (id) => {
  if (!confirm('确定删除此标签？')) return;
  try {
    await $api(`/tags/${id}`, { method: 'DELETE' });
    refresh();
  } catch (err) {
    alert(err?.data?.message || '删除失败');
  }
};
</script>
