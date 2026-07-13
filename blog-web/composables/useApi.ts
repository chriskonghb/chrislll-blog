export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase;

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
