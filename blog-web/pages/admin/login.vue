<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-bold text-gray-900">Chris 博客</NuxtLink>
        <p class="text-gray-600 mt-2">后台登录</p>
      </div>
      
      <div class="card p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">用户名</label>
            <input v-model="form.username" type="text" required class="input" placeholder="请输入用户名">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
            <input v-model="form.password" type="password" required class="input" placeholder="请输入密码">
          </div>
          <button type="submit" :disabled="loading" class="btn-primary w-full">
            <span v-if="loading">登录中...</span>
            <span v-else>登录</span>
          </button>
        </form>
        
        <p v-if="error" class="mt-4 text-red-600 text-sm text-center">{{ error }}</p>
      </div>
      
      <p class="text-center mt-6 text-sm text-gray-500">
        <NuxtLink to="/" class="text-blue-600 hover:text-blue-800">&larr; 返回博客首页</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
});

const { $api } = useApi();
const { setToken, fetchUser } = useAuth();
const router = useRouter();

const form = ref({ username: '', password: '' });
const loading = ref(false);
const error = ref('');

onMounted(() => {
  const { getToken } = useAuth();
  if (getToken()) {
    router.push('/admin/dashboard');
  }
});

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const data = await $api('/auth/login', {
      method: 'POST',
      body: form.value,
    });
    
    setToken(data.token);
    await fetchUser();
    router.push('/admin/dashboard');
  } catch (err) {
    error.value = err?.data?.message || '登录失败';
  } finally {
    loading.value = false;
  }
};
</script>
