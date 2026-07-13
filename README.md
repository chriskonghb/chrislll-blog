# Chris 博客（chrislll.cn）

一个支持响应式设计、SSR 服务端渲染、功能完善的后台管理系统的全栈博客网站。苹果风格高级感视觉设计，全中文界面。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Vue 3 + Nuxt 3 + Tailwind CSS |
| 后端 | Node.js + Express + TypeScript |
| ORM | Prisma |
| 数据库 | MySQL 8.0（阿里云 RDS / 本地 MySQL） |
| 部署 | Nginx + PM2（自动进程守护 + 开机自启） |
| SSL | 阿里云免费 SSL 证书（有效期 3 个月） |
| 服务器 | 阿里云 ECS（Alibaba Cloud Linux 3） |

## 功能清单

### 前台（访客可见）

- 响应式设计，完美适配电脑端和手机端
- SSR 服务端渲染，SEO 友好
- 首页深色渐变 Hero 区 + 数据统计展示 + 最新文章列表
- 文章列表页（支持分页）
- 文章详情页（含浏览量统计）
- 按分类 / 标签筛选文章
- 全文搜索功能
- 关于博主页面
- 全局浮动渐变光晕装饰 + 毛玻璃导航栏 + 卡片悬浮动效

### 后台管理系统

- JWT 登录认证
- 仪表盘（文章数 / 浏览量 / 分类数 / 标签数统计）
- 文章管理：新建、编辑、删除、草稿箱、封面图上传
- 分类管理：增删改查
- 标签管理：增删查
- 媒体库：图片上传、预览、复制链接、删除
- 网站设置：标题 / 描述 / 关键词 / 页脚 / 每页文章数

---

## 项目目录结构

```
chrislll-blog/
├── blog-api/                    # 后端 API
│   ├── src/
│   │   ├── app.ts               # Express 入口
│   │   ├── routes/              # API 路由（8 个文件）
│   │   │   ├── auth.ts          # 登录认证
│   │   │   ├── posts.ts         # 文章 CRUD
│   │   │   ├── categories.ts    # 分类管理
│   │   │   ├── tags.ts          # 标签管理
│   │   │   ├── upload.ts        # 图片上传
│   │   │   ├── stats.ts         # 统计数据
│   │   │   ├── search.ts        # 搜索
│   │   │   └── settings.ts      # 网站设置
│   │   ├── middlewares/          # 中间件（JWT 鉴权、错误处理、文件上传）
│   │   └── utils/
│   │       └── prisma.ts        # Prisma 客户端单例
│   ├── prisma/
│   │   ├── schema.prisma        # 数据库模型（10 个模型）
│   │   └── seed.ts              # 种子数据
│   ├── .env.example             # 环境变量模板
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── blog-web/                    # 前端 Nuxt 3
│   ├── components/              # 组件（7 个）
│   │   ├── AppHeader.vue        # 毛玻璃导航栏
│   │   ├── AppFooter.vue        # 页脚
│   │   ├── PostCard.vue         # 文章卡片
│   │   ├── PostEditor.vue       # 文章编辑器
│   │   ├── Sidebar.vue          # 侧边栏
│   │   ├── Pagination.vue      # 分页
│   │   └── DecorativeBackground.vue  # 装饰背景
│   ├── composables/             # 组合式函数
│   ├── layouts/                 # 布局（前台 + 后台）
│   ├── middleware/              # 路由守卫
│   ├── pages/                   # 页面（16 个）
│   │   ├── index.vue            # 首页
│   │   ├── about.vue            # 关于页
│   │   ├── search.vue           # 搜索页
│   │   ├── posts/               # 文章列表 / 详情
│   │   ├── category/[slug].vue  # 分类页
│   │   ├── tag/[slug].vue       # 标签页
│   │   └── admin/               # 后台管理（8 个页面）
│   │       ├── login.vue        # 登录
│   │       ├── dashboard.vue    # 仪表盘
│   │       ├── posts/            # 文章管理
│   │       ├── categories/      # 分类管理
│   │       ├── tags/            # 标签管理
│   │       ├── media/           # 媒体库
│   │       └── settings.vue     # 网站设置
│   ├── assets/css/main.css      # 自定义样式（苹果风格主题）
│   ├── nuxt.config.ts
│   └── package.json
│
├── nginx.conf                    # Nginx 反代配置（阿里云 SSL）
├── ecosystem.config.js           # PM2 进程管理配置
├── deploy.sh                     # 一键部署脚本
├── docker-compose.yml            # Docker 部署（可选）
├── Caddyfile                     # Caddy 配置（旧方案，已弃用）
└── README.md                     # 本文件
```

---

## 部署方案 A：宝塔面板部署（推荐新手）

宝塔面板提供可视化 Web 界面，操作更直观，适合不熟悉纯命令行的用户。

### 前置条件

- 阿里云 ECS 实例（Alibaba Cloud Linux 3），已备案域名 `chrislll.cn`
- 阿里云 MySQL 8.0 实例（RDS）**或** 准备在 ECS 上本地安装 MySQL 8.0
- ECS 安全组已放行：22、80、443、8888（宝塔面板端口）
- 域名已解析 A 记录到 ECS 公网 IP（`@` 和 `www` 各一条）

### 步骤 1：安装宝塔面板

SSH 登录 ECS，执行：

```bash
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
```

安装完成后，终端会输出面板地址、用户名和密码，**请记录保存**。

> 如果外网无法访问面板（8888 端口），请在阿里云安全组中添加 8888 端口的入方向规则（建议仅限你自己的 IP）。

### 步骤 2：安装运行环境

登录宝塔面板，进入 **软件商店**，安装以下软件：

- **Nginx**（任意版本均可，推荐 1.24+）
- **MySQL 8.0**（如使用阿里云 RDS 可跳过，见下方说明）
- **Node.js 版本管理器** → 安装 Node.js v20
- **PM2 管理器**（可选，也可命令行 `npm install -g pm2`）

#### MySQL 数据库配置（二选一）

**方式一：使用阿里云 RDS MySQL（推荐）**

在阿里云控制台完成：

1. 进入 RDS 实例 → **数据库管理** → **创建数据库**，数据库名填 `chrislll_blog`
2. 进入 **账号管理** → **创建账号**，设置用户名和强密码
3. 进入 **白名单设置** → **添加白名单**，填入 ECS 的**内网 IP**（最安全）
4. 记录：**内网连接地址**、端口 `3306`、数据库名、用户名、密码

> RDS 白名单只允许 ECS 内网 IP 访问，3306 端口不对公网开放，安全性更高。RDS 还支持自动备份，建议在控制台开启，保留 7-30 天。

**方式二：在 ECS 上本地安装 MySQL 8.0**

如果未购买 RDS，可以在 ECS 上通过宝塔直接安装 MySQL：

1. 宝塔面板 → **软件商店** → 搜索 **MySQL 8.0** → 安装
2. 安装完成后，宝塔会提示设置 root 密码，**请记录保存**
3. 点击 **设置** → **性能调整**，根据 ECS 内存选择配置模板（2G 内存选 1G，4G 选 2G）
4. 点击 **安全** → 默认仅允许本地访问（127.0.0.1），保持不变

安装完成后，通过宝塔 **数据库** 模块或终端创建博客数据库：

```bash
# 在宝塔终端或 SSH 中执行
mysql -u root -p

# 进入 MySQL 后执行以下 SQL
CREATE DATABASE chrislll_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 创建专用数据库账号（不要直接用 root）
CREATE USER 'chrislll_user'@'localhost' IDENTIFIED BY '841109';
GRANT ALL PRIVILEGES ON chrislll_blog.* TO 'chrislll_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

> 记录用户名 `chrislll_user` 和密码 `841109`，后续步骤 6 配置 `.env` 时需要用到。

### 步骤 3：创建网站

1. 宝塔面板 → **网站** → **添加站点**
2. 域名填写：`chrislll.cn` 和 `www.chrislll.cn`
3. 根目录设为：`/www/wwwroot/chrislll-blog/blog-web`（后续会通过 Nginx 反代，实际根目录不重要）
4. PHP 版本选择 **纯静态**
5. 点击 **提交**

### 步骤 4：上传代码

将项目代码上传到服务器 `/www/wwwroot/chrislll-blog/` 目录。可以通过以下方式：

**方式一：Git 克隆（推荐）**
```bash
cd /www/wwwroot
git clone https://github.com/你的用户名/chrislll-blog.git
```

**方式二：宝塔文件管理器上传**
1. 本地打包项目为 zip（排除 `node_modules`、`.nuxt`、`dist`、`.output`）
2. 宝塔面板 → 文件 → 进入 `/www/wwwroot/` → 上传 → 解压

### 步骤 5：配置 SSL 证书

1. 宝塔面板 → **网站** → 点击 `chrislll.cn` → **设置** → **SSL**
2. 选择 **Let's Encrypt** → 勾选域名 → 申请（自动续期）
3. 或选择 **阿里云 SSL** → 粘贴已申请的证书内容
4. 开启 **强制 HTTPS**

> **阿里云免费 SSL 申请**：阿里云控制台 → 搜索「数字证书管理服务」→ 免费证书 → 创建证书 → 绑定 `chrislll.cn` → DNS 验证 → 下载 Nginx 格式

### 步骤 6：部署后端

SSH 终端执行：

```bash
cd /www/wwwroot/chrislll-blog/blog-api

# 安装依赖并编译
npm install
npm run build

# 创建环境变量文件
cat > .env << 'EOF'
DATABASE_URL="mysql://chrislll_user:841109@127.0.0.1:3306/chrislll_blog"
JWT_SECRET="$(openssl rand -base64 64)"
UPLOAD_DIR="./uploads"
PORT=3000
EOF
chmod 600 .env

# 创建必要目录
mkdir -p uploads logs

# 初始化数据库
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

### 步骤 7：部署前端

```bash
cd /www/wwwroot/chrislll-blog/blog-web

# 安装依赖并构建
npm install
npm run build

# 创建日志目录
mkdir -p logs
```

> 如果 ECS 内存较小（2G 以下），前端 build 可能会内存不足。可先在本地 MacBook 执行 `npm run build`，然后只将 `.output` 目录上传到服务器。

### 步骤 8：PM2 启动应用

```bash
cd /www/wwwroot/chrislll-blog

# 使用项目自带的 PM2 配置启动
pm2 start ecosystem.config.js

# 保存进程列表并配置开机自启
pm2 save
pm2 startup
# 按提示执行输出的 sudo 命令
```

也可以通过宝塔 **PM2 管理器** 可视化操作：
- 添加项目 `blog-api`：启动文件 `dist/app.js`，运行目录 `/www/wwwroot/chrislll-blog/blog-api`
- 添加项目 `blog-web`：启动文件 `.output/server/index.mjs`，运行目录 `/www/wwwroot/chrislll-blog/blog-web`

### 步骤 9：配置 Nginx 反代

1. 宝塔面板 → **网站** → `chrislll.cn` → **设置** → **配置文件**
2. 删除原有内容，粘贴以下配置：

```nginx
# 静态资源（长期缓存）
location /_nuxt/ {
    alias /www/wwwroot/chrislll-blog/blog-web/.output/public/_nuxt/;
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
    gzip_static on;
    try_files $uri =404;
}

# 上传图片
location /uploads/ {
    alias /www/wwwroot/chrislll-blog/blog-api/uploads/;
    expires 30d;
    add_header Cache-Control "public, max-age=2592000";
    try_files $uri =404;
}

# API 反代到后端
location /api/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 60s;
    client_max_body_size 10m;
}

# 其余请求反代到前端 SSR
location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 120s;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}

# Gzip 压缩
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript image/svg+xml;
gzip_min_length 1024;
gzip_vary on;
```

3. 保存后，宝塔会自动验证并重载 Nginx

### 步骤 10：验证上线

1. 浏览器访问 `https://chrislll.cn` → 看到博客首页
2. 访问 `https://chrislll.cn/admin/login` → 用 `admin` / `admin123` 登录
3. **立即修改默认密码**
4. 在后台发布第一篇文章

---

## 部署方案 B：纯命令行部署

适合熟悉 Linux 命令行的用户，不依赖宝塔面板，服务器更干净、资源占用更低。

### 前置条件

- 阿里云 ECS 实例（Alibaba Cloud Linux 3），可通过 SSH 登录
- 阿里云 MySQL 8.0 实例（RDS），已创建数据库 `chrislll_blog` 和数据库账号
- 域名 `chrislll.cn` 已备案并解析 A 记录到 ECS 公网 IP
- ECS 安全组已放行：22（SSH，建议限 IP）、80、443

### 步骤 1：服务器初始化

SSH 登录 ECS：

```bash
# 更新系统
sudo dnf update -y

# 安装 Node.js 20 LTS
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
node -v && npm -v

# 安装 PM2（进程守护）
sudo npm install -g pm2

# 安装 Nginx
sudo dnf install -y nginx
sudo systemctl enable nginx --now
nginx -v

# 安装 Git
sudo dnf install -y git
```

### 步骤 2：配置域名解析

在阿里云域名控制台添加两条 A 记录：

| 记录类型 | 主机记录 | 记录值 |
|---------|---------|--------|
| A | @ | ECS 公网 IP |
| A | www | ECS 公网 IP |

### 步骤 3：申请 SSL 证书

1. 阿里云控制台 → 搜索 **数字证书管理服务**
2. **SSL 证书管理** → **免费证书** → **创建证书**
3. 绑定域名 `chrislll.cn`，选择 DNS 验证
4. 按提示在域名解析中添加 CNAME 记录
5. 等待自动签发（通常几分钟）
6. 下载 **Nginx 格式** 证书文件（`.pem` + `.key`）
7. 上传到服务器：

```bash
# 在本地执行
scp chrislll.cn.pem chrislll.cn.key root@你的ECS IP:/tmp/

# 在服务器上执行
sudo mkdir -p /etc/nginx/ssl
sudo mv /tmp/chrislll.cn.pem /tmp/chrislll.cn.key /etc/nginx/ssl/
sudo chmod 644 /etc/nginx/ssl/chrislll.cn.pem
sudo chmod 600 /etc/nginx/ssl/chrislll.cn.key
```

> 阿里云免费 SSL 证书有效期 3 个月，到期前需重新申请并替换文件，然后执行 `sudo systemctl reload nginx`。

### 步骤 4：上传代码

```bash
# 方式一：Git 克隆（推荐）
sudo mkdir -p /www/wwwroot
cd /www/wwwroot
sudo git clone https://github.com/你的用户名/chrislll-blog.git
sudo chown -R $(whoami):$(whoami) chrislll-blog

# 方式二：本地打包上传
# 本地执行：tar czf chrislll-blog.tar.gz --exclude=node_modules --exclude=.nuxt --exclude=dist --exclude=.output chrislll-blog/
# 上传：scp chrislll-blog.tar.gz root@你的ECS IP:/www/wwwroot/
# 服务器上解压：cd /www/wwwroot && tar xzf chrislll-blog.tar.gz
```

### 步骤 5：部署后端

```bash
cd /www/wwwroot/chrislll-blog/blog-api

npm install
npm run build

# 创建生产环境变量（替换为实际值）
cat > .env << 'EOF'
DATABASE_URL="mysql://chrislll_user:841109@127.0.0.1:3306/chrislll_blog"
JWT_SECRET="$(openssl rand -base64 64)"
UPLOAD_DIR="./uploads"
PORT=3000
EOF
chmod 600 .env

mkdir -p uploads logs

npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

### 步骤 6：部署前端

```bash
cd /www/wwwroot/chrislll-blog/blog-web

npm install
npm run build

mkdir -p logs
```

> 内存不足时，在本地 `npm run build` 后只上传 `.output` 目录到服务器。

### 步骤 7：配置 Nginx

```bash
# 复制项目自带的 Nginx 配置
sudo cp /www/wwwroot/chrislll-blog/nginx.conf /etc/nginx/conf.d/chrislll-blog.conf

# 移除默认站点（避免冲突）
sudo rm -f /etc/nginx/conf.d/default.conf

# 验证配置语法
sudo nginx -t

# 启用并重载
sudo systemctl enable nginx
sudo systemctl reload nginx
```

### 步骤 8：PM2 进程管理

```bash
cd /www/wwwroot/chrislll-blog

# 启动应用（使用项目自带的 ecosystem.config.js）
pm2 start ecosystem.config.js

# 保存并配置开机自启
pm2 save
pm2 startup
# 按提示执行输出的 sudo 命令
```

### 步骤 9：防火墙配置

```bash
# Alibaba Cloud Linux 3 默认使用 firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# 验证
sudo firewall-cmd --list-all
```

### 步骤 10：验证上线

1. 浏览器访问 `https://chrislll.cn` → 博客首页
2. 访问 `https://chrislll.cn/admin/login` → `admin` / `admin123` 登录
3. **立即修改默认密码**
4. 发布第一篇文章

### 一键部署脚本

项目提供了 `deploy.sh` 一键部署脚本，自动完成上述所有步骤。

```bash
cd /www/wwwroot/chrislll-blog

# 1. 编辑脚本，填写数据库连接信息
vi deploy.sh
# 修改以下变量：
#   DB_HOST="你的MySQL内网地址"
#   DB_USER="你的数据库用户名"
#   DB_PASS="你的数据库密码"

# 2. 赋予执行权限并运行
chmod +x deploy.sh
./deploy.sh
```

脚本会自动安装 Node.js、PM2、Nginx，部署前后端，配置 Nginx 反代和防火墙。

---

## Docker 部署（可选）

项目提供了 `docker-compose.yml`，可通过 Docker 容器化部署。

```bash
# 在项目根目录执行
docker compose up -d

# 查看容器状态
docker compose ps

# 查看日志
docker compose logs -f
```

> Docker 方案内置了 Caddy 作为反代。如需使用 Nginx，可自行修改 `docker-compose.yml`。

---

## 本地开发指南

### 环境要求

- Node.js 18+
- MySQL 8.0

### 第一步：安装 MySQL（macOS）

```bash
# 通过 Homebrew 安装
brew install mysql
brew services start mysql

# 创建数据库和用户
mysql -u root
```

```sql
CREATE DATABASE chrislll_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER '你的用户名'@'localhost' IDENTIFIED BY '你的密码';
GRANT ALL PRIVILEGES ON chrislll_blog.* TO '你的用户名'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 第二步：启动后端

```bash
cd blog-api

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env，修改 DATABASE_URL 为本地数据库连接

# 初始化数据库
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

# 启动开发服务器
npm run dev
```

后端运行在 `http://localhost:3000`

### 第三步：启动前端

```bash
cd blog-web

# 安装依赖
npm install

# 启动开发服务器（指定 API 地址和端口）
NUXT_PUBLIC_API_BASE=http://localhost:3000/api PORT=3001 npm run dev
```

前端运行在 `http://localhost:3001`

### 默认管理员账号

- 用户名：`admin`
- 密码：`admin123`
- **上线后务必立即修改密码**

---

## API 接口一览

| 方法 | 路径 | 功能 | 需要登录 |
|------|------|------|---------|
| GET | `/api/health` | 健康检查 | 否 |
| POST | `/api/auth/login` | 管理员登录 | 否 |
| GET | `/api/auth/me` | 获取当前用户信息 | JWT |
| GET | `/api/posts` | 获取公开文章列表（分页） | 否 |
| GET | `/api/posts/:slug` | 获取文章详情 | 否 |
| POST | `/api/posts` | 创建文章 | JWT |
| PUT | `/api/posts/:id` | 更新文章 | JWT |
| DELETE | `/api/posts/:id` | 删除文章 | JWT |
| GET | `/api/posts/admin/list` | 后台文章列表（含草稿） | JWT |
| GET | `/api/categories` | 获取分类列表 | 否 |
| POST | `/api/categories` | 创建分类 | JWT |
| PUT | `/api/categories/:id` | 更新分类 | JWT |
| DELETE | `/api/categories/:id` | 删除分类 | JWT |
| GET | `/api/tags` | 获取标签列表 | 否 |
| POST | `/api/tags` | 创建标签 | JWT |
| DELETE | `/api/tags/:id` | 删除标签 | JWT |
| POST | `/api/upload` | 上传图片 | JWT |
| GET | `/api/upload` | 获取媒体列表 | JWT |
| DELETE | `/api/upload/:id` | 删除媒体 | JWT |
| GET | `/api/stats` | 统计概览 | JWT |
| GET | `/api/search` | 搜索文章 | 否 |
| GET | `/api/settings` | 获取网站设置 | 否 |
| PUT | `/api/settings` | 更新网站设置 | JWT |

---

## 常用维护命令

### PM2 进程管理

```bash
pm2 status                          # 查看所有进程状态
pm2 logs blog-api                   # 查看后端日志
pm2 logs blog-web                   # 查看前端日志
pm2 restart blog-api                # 重启后端
pm2 restart blog-web                # 重启前端
pm2 restart all                     # 重启所有
pm2 monit                           # 实时监控
```

### Nginx 管理

```bash
nginx -t                            # 检查配置语法
sudo systemctl reload nginx         # 重载配置（不中断服务）
sudo systemctl restart nginx        # 重启 Nginx
sudo systemctl status nginx         # 查看状态
tail -f /var/log/nginx/chrislll-blog.error.log  # 查看错误日志
```

### 数据库操作

```bash
# 备份（在服务器上执行，连接 RDS）
mysqldump -h RDS内网地址 -u 用户名 -p chrislll_blog > backup_$(date +%F).sql

# 恢复
mysql -h RDS内网地址 -u 用户名 -p chrislll_blog < backup_2026-07-10.sql

# 重新部署数据库迁移
cd /www/wwwroot/chrislll-blog/blog-api
npx prisma migrate deploy
```

> 阿里云 RDS 支持自动备份，建议在控制台开启，保留 7-30 天。

### 更新代码后重新部署

```bash
cd /www/wwwroot/chrislll-blog
git pull origin main

# 更新后端
cd blog-api && npm install && npm run build
pm2 restart blog-api

# 更新前端
cd ../blog-web && npm install && npm run build
pm2 restart blog-web
```

---

## 安全建议

1. **修改默认密码**：第一次登录后台后，立即修改管理员密码
2. **JWT 密钥**：生产环境的 `JWT_SECRET` 使用 `openssl rand -base64 64` 生成随机值
3. **数据库安全**：RDS 白名单只允许 ECS 内网 IP，3306 端口不对公网开放
4. **SSL 证书**：阿里云免费证书 3 个月到期，设置日历提醒及时续期
5. **SSH 安全**：安全组中 22 端口仅对管理员 IP 开放，或修改默认 SSH 端口
6. **文件权限**：`.env` 文件权限设为 600，SSL 私钥权限设为 600
7. **定期备份**：RDS 自动备份 + uploads 目录定期备份到 OSS
8. **依赖安全**：定期运行 `npm audit fix` 检查漏洞
9. **防火墙**：ECS 安全组只开放 22、80、443 端口

---

## 故障排查

### 后端启动失败

```bash
# 检查日志
pm2 logs blog-api --lines 50

# 常见原因：
# 1. 数据库连接失败 → 检查 .env 中的 DATABASE_URL
# 2. Prisma 客户端未生成 → 执行 npx prisma generate
# 3. 端口被占用 → lsof -i:3000 查看
```

### 前端白屏

```bash
# 检查日志
pm2 logs blog-web --lines 50

# 常见原因：
# 1. npm run build 失败 → 检查构建错误日志
# 2. 端口冲突 → 确认 3001 端口未被占用
# 3. 内存不足 → 增加swap或本地构建后上传 .output
```

### Nginx 502 Bad Gateway

```bash
# 检查 PM2 进程是否在运行
pm2 status

# 检查 Nginx 反代端口是否正确
curl http://127.0.0.1:3000/api/health
curl http://127.0.0.1:3001
```

### SSL 证书问题

```bash
# 检查证书文件是否存在
ls -la /etc/nginx/ssl/chrislll.cn.pem /etc/nginx/ssl/chrislll.cn.key

# 检查证书有效期
openssl x509 -in /etc/nginx/ssl/chrislll.cn.pem -noout -dates

# 验证 Nginx 配置
sudo nginx -t
```

### 文件上传失败

```bash
# 检查 uploads 目录权限
ls -la /www/wwwroot/chrislll-blog/blog-api/uploads/
chmod 755 /www/wwwroot/chrislll-blog/blog-api/uploads/

# 检查 Nginx 上传大小限制
# nginx.conf 中 client_max_body_size 应为 10m
```

### Prisma 迁移冲突

```bash
# 如果迁移文件与数据库状态不一致
cd /www/wwwroot/chrislll-blog/blog-api
npx prisma migrate resolve --applied <迁移名称>
# 或强制同步（谨慎使用，会重置数据库）
npx prisma migrate reset
npx prisma migrate deploy
npx prisma db seed
```
