# ============================================================
# chrislll-blog 前端 Nuxt 3 Dockerfile
# 构建：docker build -t chrislll-web .
# 运行：docker run -d --name blog-web \
#        -e API_BASE_URL="http://blog-api:3000" \
#        -p 3001:3000 \
#        chrislll-web
# ============================================================

FROM node:20-alpine AS base

# 依赖安装阶段
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

# 生产运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.output ./.output

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["node", ".output/server/index.mjs"]
