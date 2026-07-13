<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">标题</label>
            <input v-model="form.title" type="text" required class="input" placeholder="请输入文章标题">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">链接别名</label>
            <input v-model="form.slug" type="text" class="input" placeholder="根据标题自动生成">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">摘要</label>
            <textarea v-model="form.excerpt" rows="3" class="textarea" placeholder="文章的简短描述"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">正文内容（HTML）</label>
            <textarea v-model="form.content" rows="15" required class="textarea font-mono text-sm" placeholder="<p>在此输入文章内容...</p>"></textarea>
          </div>
        </div>
      </div>

      <!-- Sidebar Settings -->
      <div class="space-y-6">
        <div class="card p-6 space-y-4">
          <h3 class="font-bold text-gray-900">发布设置</h3>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">状态</label>
            <select v-model="form.status" class="select">
              <option value="DRAFT">草稿</option>
              <option value="PUBLISHED">已发布</option>
              <option value="ARCHIVED">已归档</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">分类</label>
            <select v-model="form.categoryId" class="select">
              <option value="">无</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">标签</label>
            <div class="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              <label v-for="tag in tags" :key="tag.id" class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100 transition">
                <input type="checkbox" :value="tag.id" v-model="form.tagIds" class="rounded">
                <span class="text-sm">{{ tag.name }}</span>
              </label>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">发布时间</label>
            <input v-model="form.publishedAt" type="datetime-local" class="input">
          </div>
        </div>

        <div class="card p-6 space-y-4">
          <h3 class="font-bold text-gray-900">封面图</h3>
          <div v-if="form.coverImage" class="relative">
            <img :src="form.coverImage" class="w-full h-40 object-cover rounded-lg">
            <button type="button" @click="form.coverImage = ''" class="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div>
            <input v-model="form.coverImage" type="text" class="input text-sm" placeholder="图片 URL">
          </div>
          <div class="relative">
            <input type="file" @change="handleUpload" accept="image/*" class="hidden" id="cover-upload">
            <label for="cover-upload" class="btn-secondary w-full cursor-pointer">
              <span v-if="uploading">上传中...</span>
              <span v-else>上传图片</span>
            </label>
          </div>
        </div>

        <div class="flex gap-3">
          <button type="submit" class="btn-primary flex-1">保存文章</button>
          <NuxtLink to="/admin/posts" class="btn-secondary">取消</NuxtLink>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  post: { type: Object, default: null },
});

const emit = defineEmits(['save']);
const { $api } = useApi();

const { data: categories } = await useAsyncData('editor-categories', () => $api('/categories').then(r => r.data));
const { data: tags } = await useAsyncData('editor-tags', () => $api('/tags').then(r => r.data));

const form = ref({
  title: props.post?.title || '',
  slug: props.post?.slug || '',
  excerpt: props.post?.excerpt || '',
  content: props.post?.content || '',
  coverImage: props.post?.coverImage || '',
  status: props.post?.status || 'DRAFT',
  categoryId: props.post?.categoryId || '',
  tagIds: props.post?.tags?.map(t => t.id) || [],
  publishedAt: props.post?.publishedAt ? new Date(props.post.publishedAt).toISOString().slice(0, 16) : '',
});

const uploading = ref(false);

const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  uploading.value = true;
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const data = await $api('/upload', {
      method: 'POST',
      body: formData,
    });
    
    form.value.coverImage = data.url;
  } catch (err) {
    alert(err?.data?.message || '上传失败');
  } finally {
    uploading.value = false;
  }
};

const handleSubmit = () => {
  const data = { ...form.value };
  if (!data.slug) {
    data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  if (data.categoryId === '') data.categoryId = null;
  if (data.publishedAt === '') data.publishedAt = null;
  
  emit('save', data);
};
</script>
