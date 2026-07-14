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
        <div class="w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto mb-8 shadow-2xl shadow-indigo-500/30 ring-4 ring-white/10 animate-scale-in overflow-hidden">
          <img src="/chris-avatar.jpg" alt="Chris" class="w-full h-full object-cover" />
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
        <p class="text-gray-600 leading-relaxed">欢迎交流！如果你有任何问题、建议，或者只是想打个招呼，都可以通过微信找到我。</p>
      </div>

      <div class="flex justify-center gap-6 mt-12">
        <div class="card-hover p-5 text-center">
          <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 7.009a.942.942 0 1 1 0-1.884.942.942 0 0 1 0 1.884zm5.812 0a.942.942 0 1 1 0-1.884.942.942 0 0 1 0 1.884zM13.53 12.539c-1.187 0-2.296.496-3.158 1.396-.86.9-1.323 2.094-1.323 3.369 0 1.276.463 2.47 1.323 3.37.862.9 1.97 1.396 3.159 1.396 1.188 0 2.296-.496 3.158-1.396.86-.9 1.323-2.094 1.323-3.37 0-1.275-.463-2.47-1.323-3.369-.862-.9-1.97-1.396-3.159-1.396zm-1.5 3.369a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm3 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"/></svg>
          </div>
          <h3 class="font-bold text-gray-900 mb-1">微信</h3>
          <p class="text-sm text-gray-500">nonojay</p>
        </div>
        <div class="card-hover p-5 text-center">
          <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z"></path></svg>
          </div>
          <h3 class="font-bold text-gray-900 mb-1">微信视频号</h3>
          <p class="text-sm text-gray-500">chris来唠唠</p>
        </div>
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
