export const useAuth = () => {
  const user = useState('user', () => null);
  const isLoggedIn = computed(() => !!user.value);

  const setToken = (token: string) => {
    if (process.client) {
      localStorage.setItem('token', token);
    }
  };

  const getToken = () => {
    if (process.client) {
      return localStorage.getItem('token');
    }
    return null;
  };

  const removeToken = () => {
    if (process.client) {
      localStorage.removeItem('token');
    }
  };

  const fetchUser = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const { $api } = useApi();
      const data = await $api('/auth/me');
      user.value = data.user;
    } catch {
      removeToken();
      user.value = null;
    }
  };

  const logout = () => {
    removeToken();
    user.value = null;
    navigateTo('/admin/login');
  };

  return {
    user,
    isLoggedIn,
    setToken,
    getToken,
    removeToken,
    fetchUser,
    logout,
  };
};
