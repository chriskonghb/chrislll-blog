export const useApi = () => {
  const config = useRuntimeConfig();

  // 关键修复：
  // - 客户端（浏览器）使用相对路径 /api，由 Nginx 代理到后端
  // - SSR（服务端）使用完整 URL http://127.0.0.1:3000/api，直接访问后端
  const baseURL = process.server
    ? (config.public.apiBase.startsWith('http') ? config.public.apiBase : 'http://127.0.0.1:3000' + config.public.apiBase)
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
