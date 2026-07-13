<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 md:py-28">
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950" />
      <div class="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-violet-900/20" />

      <!-- 装饰网格 -->
      <svg class="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-grid)" />
      </svg>

      <!-- 浮动光晕 -->
      <div class="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-[120px] animate-float-slow" />
      <div class="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-[100px] animate-float-medium" />

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-5xl md:text-6xl mx-auto mb-8 shadow-2xl shadow-indigo-500/30 ring-4 ring-white/10 animate-scale-in">
          C
        </div>
        <h1 class="animate-fade-in-up text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          关于我
        </h1>
        <p class="animate-fade-in-up animation-delay-100 text-lg md:text-xl text-blue-100/70 max-w-xl mx-auto">
          终身学习者、开发者、记录者
        </p>
      </div>

      <!-- 底部波浪 -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 80V40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z" fill="#F9FAFB" />
        </svg>
      </div>
    </section>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="prose-blog animate-fade-in-up">
        <p class="text-lg text-gray-600 leading-relaxed">你好！我是 Chris，这个博客的作者。欢迎来到我的互联网小角落，在这里我分享技术探索、学习心得与生活点滴。</p>

        <div class="my-10 p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl border border-blue-100/50">
          <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            为什么写博客？
          </h2>
          <p class="text-gray-600 leading-relaxed">创建这个博客的初衷是记录学习过程中的思考与收获。写作帮助我整理思路、深化理解，也让我有机会与更多志同道合的朋友交流。</p>
        </div>

        <h2 class="text-xl font-bold text-gray-900 mb-4">我写些什么</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-10">
          <div class="card-hover p-5 text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-1">技术</h3>
            <p class="text-sm text-gray-500">Web 开发、编程技巧、工具推荐</p>
          </div>
          <div class="card-hover p-5 text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-1">学习笔记</h3>
            <p class="text-sm text-gray-500">学习方法、资源分享、个人进步</p>
          </div>
          <div class="card-hover p-5 text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-1">生活感悟</h3>
            <p class="text-sm text-gray-500">反思感悟、习惯养成、生活心得</p>
          </div>
        </div>

        <div class="my-10 p-6 bg-gradient-to-r from-indigo-50/80 to-violet-50/80 rounded-2xl border border-indigo-100/50">
          <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            技术栈
          </h2>
          <p class="text-gray-600 leading-relaxed">这个博客使用 <strong>Vue 3</strong>、<strong>Nuxt 3</strong>、<strong>Express</strong> 和 <strong>MySQL</strong> 构建。选择这些技术是因为它们功能强大、文档完善，而且用起来很有趣。</p>
        </div>

        <h2 class="text-xl font-bold text-gray-900 mb-4">联系我</h2>
        <p class="text-gray-600 leading-relaxed">欢迎交流！如果你有任何问题、建议，或者只是想打个招呼，都可以通过下方的社交链接找到我。</p>
      </div>

      <div class="flex justify-center gap-4 mt-12">
        <a href="#" class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
        </a>
        <a href="#" class="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white hover:shadow-lg hover:shadow-gray-500/30 hover:-translate-y-1 transition-all">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
        </a>
        <a href="#" class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '关于我 - Chris 博客',
  meta: [
    { name: 'description', content: '了解 Chris，一个热爱技术和学习的博主。' },
  ],
});
</script>

<style scoped>
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}
@keyframes float-medium {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-15px, 15px); }
}
.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}
.animate-float-medium {
  animation: float-medium 12s ease-in-out infinite;
}
</style>
