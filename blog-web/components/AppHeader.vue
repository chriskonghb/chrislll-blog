<template>
  <header class="sticky top-0 z-50">
    <!-- 毛玻璃背景层 -->
    <div class="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold gradient-text hover:opacity-80 transition">
          Chris Blog
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            to="/"
            class="px-4 py-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 font-medium transition-all"
            :class="{ 'text-blue-600 bg-blue-50/80': $route.path === '/' }"
          >
            首页
          </NuxtLink>
          <NuxtLink
            to="/posts"
            class="px-4 py-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 font-medium transition-all"
            :class="{ 'text-blue-600 bg-blue-50/80': $route.path.startsWith('/posts') }"
          >
            文章
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="px-4 py-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 font-medium transition-all"
            :class="{ 'text-blue-600 bg-blue-50/80': $route.path === '/about' }"
          >
            关于
          </NuxtLink>

          <!-- Search -->
          <form @submit.prevent="handleSearch" class="relative ml-3">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章..."
              class="w-52 pl-10 pr-4 py-2 rounded-xl bg-gray-100/80 border-0 focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all text-sm"
            >
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </form>
        </nav>

        <!-- Mobile menu button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden relative p-2 rounded-xl hover:bg-gray-100 transition">
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden pb-4 space-y-1"
      >
        <NuxtLink to="/" class="block px-4 py-2.5 rounded-xl hover:bg-blue-50/80 transition" :class="{ 'bg-blue-50/80 text-blue-600 font-medium': $route.path === '/' }" @click="mobileMenuOpen = false">
          首页
        </NuxtLink>
        <NuxtLink to="/posts" class="block px-4 py-2.5 rounded-xl hover:bg-blue-50/80 transition" :class="{ 'bg-blue-50/80 text-blue-600 font-medium': $route.path.startsWith('/posts') }" @click="mobileMenuOpen = false">
          文章
        </NuxtLink>
        <NuxtLink to="/about" class="block px-4 py-2.5 rounded-xl hover:bg-blue-50/80 transition" :class="{ 'bg-blue-50/80 text-blue-600 font-medium': $route.path === '/about' }" @click="mobileMenuOpen = false">
          关于
        </NuxtLink>
        <form @submit.prevent="handleSearch" class="px-4 pt-2">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 border-0 focus:ring-2 focus:ring-blue-500/30"
            >
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </form>
      </div>
    </div>
  </header>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const mobileMenuOpen = ref(false);

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
    searchQuery.value = '';
    mobileMenuOpen.value = false;
  }
};

watch(() => route.path, () => {
  mobileMenuOpen.value = false;
});
</script>
