<template>
  <footer class="bg-gray-900 text-gray-400 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <h3 class="text-white text-lg font-bold mb-4">Chris 博客</h3>
          <p class="text-sm leading-relaxed">分享技术、学习与生活的个人博客。用 Vue 3 和热情构建。</p>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-white text-lg font-bold mb-4">快速链接</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/" class="hover:text-white transition">首页</NuxtLink></li>
            <li><NuxtLink to="/posts" class="hover:text-white transition">全部文章</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white transition">关于</NuxtLink></li>
            <li><NuxtLink to="/admin/login" class="hover:text-white transition">后台管理</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Contact -->
        <div>
          <h3 class="text-white text-lg font-bold mb-4">联系方式</h3>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 7.009a.942.942 0 1 1 0-1.884.942.942 0 0 1 0 1.884zm5.812 0a.942.942 0 1 1 0-1.884.942.942 0 0 1 0 1.884zM13.53 12.539c-1.187 0-2.296.496-3.158 1.396-.86.9-1.323 2.094-1.323 3.369 0 1.276.463 2.47 1.323 3.37.862.9 1.97 1.396 3.159 1.396 1.188 0 2.296-.496 3.158-1.396.86-.9 1.323-2.094 1.323-3.37 0-1.275-.463-2.47-1.323-3.369-.862-.9-1.97-1.396-3.159-1.396zm-1.5 3.369a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm3 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"/></svg>
              <span>微信：nonojay</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 .168 3.122a13.98 13.98 0 0 0 10.15 5.147 4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.59a10.019 10.019 0 0 1-2.457 2.514z"/></svg>
              <span>视频号：chris来唠唠</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
        <p> Chris 博客。用心记录，分享成长。</p>
        <p class="mt-2"><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-300 transition">吉ICP备2025025523号-2</a></p>
      </div>
    </div>
  </footer>
</template>
