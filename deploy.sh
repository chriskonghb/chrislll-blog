#!/bin/bash
# ============================================================
# chrislll-blog 一键部署脚本
# 适用环境：阿里云 ECS（Alibaba Cloud Linux 3）+ 阿里云 MySQL 8.0 + PM2 + Nginx
# 用法：chmod +x deploy.sh && ./deploy.sh
# ============================================================

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info()  { echo -e "${BLUE}[信息]${NC} $1"; }
log_ok()    { echo -e "${GREEN}[完成]${NC} $1"; }
log_warn()  { echo -e "${YELLOW}[警告]${NC} $1"; }
log_error() { echo -e "${RED}[错误]${NC} $1"; exit 1; }

# ============================================================
# 配置区（请根据实际情况修改）
# ============================================================
PROJECT_DIR="/www/wwwroot/chrislll-blog"
API_DIR="${PROJECT_DIR}/blog-api"
WEB_DIR="${PROJECT_DIR}/blog-web"
DOMAIN="chrislll.cn"
WWW_DOMAIN="www.chrislll.cn"

# 数据库配置（本地 MySQL 时默认值即可，RDS 时替换为实际值）
DB_HOST="127.0.0.1"  # 本地 MySQL 填 127.0.0.1，RDS 填内网地址如 rm-xxx.mysql.rds.aliyuncs.com
DB_PORT="3306"
DB_NAME="chrislll_blog"
DB_USER="chrislll_user"  # 数据库用户名
DB_PASS="841109"         # 数据库密码

# ============================================================
# 前置检查
# ============================================================
if [[ $EUID -ne 0 ]]; then
  log_error "请使用 root 用户运行此脚本"
fi

if [[ -z "$DB_HOST" || -z "$DB_USER" || -z "$DB_PASS" ]]; then
  log_error "请先编辑脚本，填写 DB_HOST、DB_USER、DB_PASS"
fi

log_info "开始部署 chrislll-blog..."
echo "  域名：${DOMAIN}, ${WWW_DOMAIN}"
echo "  数据库：${DB_HOST}:${DB_PORT}/${DB_NAME}"
echo "  项目目录：${PROJECT_DIR}"
echo ""

# ============================================================
# 阶段一：系统环境安装
# ============================================================
log_info "===== 阶段一：安装系统环境 ====="

# 更新系统
log_info "更新系统软件包..."
dnf update -y

# 检查并安装 Node.js 20
if command -v node &>/dev/null; then
  log_ok "Node.js 已安装：$(node -v)"
else
  log_info "安装 Node.js 20 LTS..."
  curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
  dnf install -y nodejs
  log_ok "Node.js 安装完成：$(node -v), npm $(npm -v)"
fi

# 检查并安装 PM2
if command -v pm2 &>/dev/null; then
  log_ok "PM2 已安装"
else
  log_info "安装 PM2..."
  npm install -g pm2
  log_ok "PM2 安装完成"
fi

# 检查并安装 Nginx
if command -v nginx &>/dev/null; then
  log_ok "Nginx 已安装：$(nginx -v 2>&1)"
else
  log_info "安装 Nginx..."
  dnf install -y nginx
  systemctl enable nginx
  log_ok "Nginx 安装完成"
fi

# 检查并安装 Git
if ! command -v git &>/dev/null; then
  log_info "安装 Git..."
  dnf install -y git
fi

echo ""

# ============================================================
# 阶段二：拉取/更新代码
# ============================================================
log_info "===== 阶段二：拉取代码 ====="

if [[ -d "${PROJECT_DIR}" ]]; then
  log_info "项目目录已存在，执行 git pull..."
  cd "${PROJECT_DIR}"
  git pull origin main || git pull origin master || log_warn "git pull 失败，请手动检查"
else
  log_info "创建项目目录..."
  mkdir -p "$(dirname "${PROJECT_DIR}")"
  log_warn "请手动将代码上传到 ${PROJECT_DIR}，然后重新运行此脚本"
  log_warn "或取消注释下方 git clone 命令并填写正确的仓库地址"
  # git clone https://github.com/你的用户名/chrislll-blog.git /www/wwwroot/chrislll-blog
  exit 1
fi

echo ""

# ============================================================
# 阶段三：部署后端 API
# ============================================================
log_info "===== 阶段三：部署后端 API ====="

cd "${API_DIR}"

log_info "安装后端依赖..."
npm install --production=false

log_info "编译 TypeScript..."
npm run build

# 创建/更新 .env 文件
log_info "生成环境变量文件..."
JWT_SECRET=$(openssl rand -base64 64)
cat > .env << EOF
DATABASE_URL="mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
JWT_SECRET="${JWT_SECRET}"
UPLOAD_DIR="./uploads"
PORT=3000
EOF
chmod 600 .env
log_ok ".env 文件已创建（权限 600）"

# 确保 uploads 和 logs 目录存在
mkdir -p uploads logs

# Prisma 部署
log_info "生成 Prisma 客户端..."
npx prisma generate

log_info "部署数据库迁移..."
npx prisma migrate deploy

# 检查是否需要导入种子数据
log_info "检查数据库种子数据..."
SEED_CHECK=$(node -e "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.user.count().then(c => { console.log(c); p.\$disconnect(); }).catch(() => { console.log(0); p.\$disconnect(); });
" 2>/dev/null || echo "0")

if [[ "$SEED_CHECK" -eq 0 ]]; then
  log_info "数据库为空，导入种子数据..."
  npx prisma db seed
  log_ok "默认管理员账号已创建（admin / admin123），请上线后立即修改密码"
else
  log_ok "数据库已有数据，跳过种子导入"
fi

echo ""

# ============================================================
# 阶段四：部署前端
# ============================================================
log_info "===== 阶段四：部署前端 ====="

cd "${WEB_DIR}"

log_info "安装前端依赖..."
npm install

log_info "构建前端..."
npm run build

# 确保 logs 目录存在
mkdir -p logs

echo ""

# ============================================================
# 阶段五：PM2 进程管理
# ============================================================
log_info "===== 阶段五：PM2 进程管理 ====="

cd "${PROJECT_DIR}"

if pm2 describe blog-api &>/dev/null || pm2 describe blog-web &>/dev/null; then
  log_info "重启已有进程..."
  pm2 restart ecosystem.config.js
else
  log_info "启动应用..."
  pm2 start ecosystem.config.js
fi

pm2 save
log_ok "PM2 进程已保存"

echo ""

# ============================================================
# 阶段六：配置 Nginx
# ============================================================
log_info "===== 阶段六：配置 Nginx ====="

# 检查 SSL 证书
SSL_DIR="/etc/nginx/ssl"
if [[ -f "${SSL_DIR}/${DOMAIN}.pem" && -f "${SSL_DIR}/${DOMAIN}.key" ]]; then
  log_ok "SSL 证书已存在"
else
  log_warn "未检测到 SSL 证书文件"
  log_warn "请按以下步骤申请阿里云免费 SSL 证书："
  log_warn "  1. 登录阿里云控制台 -> 搜索「数字证书管理服务」"
  log_warn "  2. SSL证书管理 -> 免费证书 -> 创建证书 -> 绑定 ${DOMAIN}"
  log_warn "  3. 等待签发后，下载 Nginx 格式证书文件（.pem + .key）"
  log_warn "  4. 上传到服务器 ${SSL_DIR}/ 目录"
  log_warn "  5. 重新运行此脚本，或手动执行 nginx -t && systemctl reload nginx"
  echo ""
  read -p "SSL 证书已准备好并上传到 ${SSL_DIR}/？(y/n): " ssl_ready
  if [[ "$ssl_ready" != "y" && "$ssl_ready" != "Y" ]]; then
    log_warn "跳过 Nginx 配置。请在准备好 SSL 证书后手动配置。"
    log_info "手动配置命令："
    log_info "  cp ${PROJECT_DIR}/nginx.conf /etc/nginx/conf.d/chrislll-blog.conf"
    log_info "  nginx -t && systemctl enable --now nginx"
    exit 0
  fi
fi

# 创建 SSL 目录（如果不存在）
mkdir -p "${SSL_DIR}"

# 复制 Nginx 配置
log_info "部署 Nginx 配置..."
cp "${PROJECT_DIR}/nginx.conf" /etc/nginx/conf.d/chrislll-blog.conf

# 移除 Nginx 默认站点（避免冲突）
if [[ -f /etc/nginx/conf.d/default.conf ]]; then
  log_info "移除 Nginx 默认站点配置..."
  rm -f /etc/nginx/conf.d/default.conf
fi

# 验证并重载
log_info "验证 Nginx 配置..."
nginx -t 2>&1 || log_error "Nginx 配置验证失败，请检查 nginx.conf"

systemctl enable nginx
systemctl reload nginx
log_ok "Nginx 已重载"

echo ""

# ============================================================
# 阶段七：PM2 开机自启
# ============================================================
log_info "===== 阶段七：PM2 开机自启 ====="

pm2 startup systemd 2>/dev/null || true
log_ok "PM2 开机自启已配置"

echo ""

# ============================================================
# 阶段八：防火墙配置
# ============================================================
log_info "===== 阶段八：防火墙配置 ====="

if command -v firewall-cmd &>/dev/null; then
  log_info "配置 firewalld..."
  firewall-cmd --permanent --add-service=http 2>/dev/null || true
  firewall-cmd --permanent --add-service=https 2>/dev/null || true
  firewall-cmd --reload 2>/dev/null || true
  log_ok "防火墙 HTTP/HTTPS 端口已开放"
else
  log_warn "未检测到 firewalld，跳过防火墙配置"
fi

echo ""

# ============================================================
# 完成
# ============================================================
echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  chrislll-blog 部署完成！${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo "  访问地址：https://${DOMAIN}"
echo "  后台地址：https://${DOMAIN}/admin/login"
echo "  默认账号：admin / admin123"
echo ""
echo -e "${YELLOW}  请立即登录后台修改默认密码！${NC}"
echo ""
echo "  常用命令："
echo "    pm2 status                          # 查看服务状态"
echo "    pm2 logs blog-api                   # 后端日志"
echo "    pm2 logs blog-web                   # 前端日志"
echo "    pm2 restart all                     # 重启所有服务"
echo "    nginx -t                            # 检查 Nginx 配置"
echo "    systemctl reload nginx              # 重载 Nginx"
echo "    tail -f /var/log/nginx/chrislll-blog.error.log  # Nginx 错误日志"
echo ""
log_ok "部署脚本执行完毕"
