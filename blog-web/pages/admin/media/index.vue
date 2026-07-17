<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-900">媒体库</h1>
      <div class="relative">
        <input type="file" @change="handleUpload" accept="image/*" multiple class="hidden" id="media-upload">
        <label for="media-upload" class="btn-primary cursor-pointer">
          <span v-if="uploading">上传中...</span>
          <span v-else>+ 上传图片</span>
        </label>
      </div>
    </div>

    <div v-if="media.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="item in media" :key="item.id" class="card group relative">
        <div class="aspect-square overflow-hidden bg-gray-100">
          <img :src="item.url" :alt="item.originalName" class="w-full h-full object-cover">
        </div>
        <div class="p-3">
          <p class="text-sm font-medium text-gray-900 truncate">{{ item.originalName }}</p>
          <p class="text-xs text-gray-500">{{ formatSize(item.size) }}</p>
        </div>
        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
          <button @click="copyUrl(item.url)" class="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-600" title="复制链接">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </button>
          <button @click="deleteMedia(item.id)" class="p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 text-red-600 ml-1" title="删除">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-16 text-gray-500">
      暂无媒体文件，上传你的第一张图片吧！
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

const { $api } = useApi();

const { data: mediaData, refresh } = await useAsyncData('admin-media', () =>
  $api('/upload').then(r => r.data), { server: false }
);

const media = computed(() => mediaData.value || []);
const uploading = ref(false);

const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const copyUrl = (url) => {
  navigator.clipboard.writeText(url);
  alert('链接已复制到剪贴板！');
};

const handleUpload = async (e) => {
  const files = e.target.files;
  if (!files.length) return;

  uploading.value = true;
  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      await $api('/upload', { method: 'POST', body: formData });
    }
    refresh();
  } catch (err) {
    alert(err?.data?.message || '上传失败');
  } finally {
    uploading.value = false;
  }
};

const deleteMedia = async (id) => {
  if (!confirm('确定删除此文件？')) return;
  try {
    await $api(`/upload/${id}`, { method: 'DELETE' });
    refresh();
  } catch (err) {
    alert(err?.data?.message || '删除失败');
  }
};
</script>
