<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-8">网站设置</h1>

    <form @submit.prevent="saveSettings" class="max-w-2xl space-y-6">
      <div class="card p-6 space-y-4">
        <h2 class="text-lg font-bold text-gray-900 mb-4">常规设置</h2>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">网站标题</label>
          <input v-model="form.siteTitle" type="text" class="input">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">网站描述</label>
          <textarea v-model="form.siteDescription" rows="3" class="textarea"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">关键词（逗号分隔）</label>
          <input v-model="form.siteKeywords" type="text" class="input">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">页脚文字</label>
          <input v-model="form.footerText" type="text" class="input">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">每页文章数</label>
          <input v-model="form.postsPerPage" type="number" min="1" max="50" class="input w-32">
        </div>
      </div>

      <div class="flex gap-3">
        <button type="submit" :disabled="saving" class="btn-primary">
          <span v-if="saving">保存中...</span>
          <span v-else>保存设置</span>
        </button>
      </div>

      <p v-if="message" class="text-green-600 text-sm">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

const { $api } = useApi();

const { data: settings } = await useAsyncData('settings', () => $api('/settings'), { server: false });

const form = ref({
  siteTitle: settings.value?.siteTitle || 'Chris Blog',
  siteDescription: settings.value?.siteDescription || '',
  siteKeywords: settings.value?.siteKeywords || '',
  footerText: settings.value?.footerText || '',
  postsPerPage: settings.value?.postsPerPage || '10',
});

const saving = ref(false);
const message = ref('');

const saveSettings = async () => {
  saving.value = true;
  message.value = '';
  try {
    await $api('/settings', { method: 'PUT', body: form.value });
    message.value = '设置保存成功！';
    setTimeout(() => message.value = '', 3000);
  } catch (err) {
    alert(err?.data?.message || '保存失败');
  } finally {
    saving.value = false;
  }
};
</script>
