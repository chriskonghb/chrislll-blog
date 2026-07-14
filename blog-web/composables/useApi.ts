export const useApi = () => {
  const config = useRuntimeConfig();
  // SSR 时需要完整的 URL 才能访问后端 API
  // 如果 NUXT_PUBLIC_API_BASE 未设置，SSR 默认使用 127.0.0.1:3000
  const baseURL = process.server
    ? (config.public.apiBase.startsWith('http') ? config.public.apiBase : 'http://127.0.0.1:3000/api')
    : config.public.apiBase;

  const getToken = () => {
    if (process.client) {
      return localStorage.getItem('token');
    }
    return null;
  };

  const headers = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const $api = $fetch.create({
    baseURL,
    headers: headers(),
    onResponseError({ response }) {
      if (response.status === 401) {
        if (process.client) {
          localStorage.removeItem('token');
          navigateTo('/admin/login');
        }
      }
    },
  });

  return { $api, baseURL };
};
