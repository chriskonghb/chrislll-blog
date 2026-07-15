// ============================================================
// chrislll-blog PM2 进程管理配置
// 用法：pm2 start ecosystem.config.js
// 说明：管理 blog-api（后端）和 blog-web（前端）两个 Node 进程
// ============================================================

module.exports = {
  apps: [
    {
      name: 'blog-api',
      script: 'dist/app.js',
      cwd: '/www/wwwroot/chrislll-blog/blog-api',
      instances: 1,
      autorestart: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        UPLOAD_DIR: '/www/wwwroot/chrislll-blog/blog-api/uploads',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/www/wwwroot/chrislll-blog/blog-api/logs/error.log',
      out_file: '/www/wwwroot/chrislll-blog/blog-api/logs/out.log',
      merge_logs: true,
    },
    {
      name: 'blog-web',
      script: '.output/server/index.mjs',
      cwd: '/www/wwwroot/chrislll-blog/blog-web',
      instances: 1,
      autorestart: true,
      max_memory_restart: '1024M',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 3001,
        NUXT_PUBLIC_API_BASE: '/api',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/www/wwwroot/chrislll-blog/blog-web/logs/error.log',
      out_file: '/www/wwwroot/chrislll-blog/blog-web/logs/out.log',
      merge_logs: true,
    },
  ],
};
