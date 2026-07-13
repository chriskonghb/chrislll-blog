<template>
  <div class="pointer-events-none fixed inset-0 overflow-hidden -z-10">
    <!-- 渐变光晕 Blob 1 -->
    <div
      class="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl animate-float-slow"
      style="background: radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%);"
    />
    <!-- 渐变光晕 Blob 2 -->
    <div
      class="absolute top-1/3 -left-60 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl animate-float-medium"
      style="background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%);"
    />
    <!-- 渐变光晕 Blob 3 -->
    <div
      class="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl animate-float-slow-reverse"
      style="background: radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%);"
    />

    <!-- 点阵图案 -->
    <svg class="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
    </svg>

    <!-- 细线网格 -->
    <svg class="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="fine-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" stroke-width="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fine-grid)" />
    </svg>
  </div>
</template>

<style scoped>
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -40px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}
@keyframes float-medium {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, 30px) scale(1.08); }
}
@keyframes float-slow-reverse {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-30px, 30px) scale(1.03); }
  66% { transform: translate(20px, -20px) scale(0.97); }
}
.animate-float-slow {
  animation: float-slow 20s ease-in-out infinite;
}
.animate-float-medium {
  animation: float-medium 15s ease-in-out infinite;
}
.animate-float-slow-reverse {
  animation: float-slow-reverse 25s ease-in-out infinite;
}
</style>
