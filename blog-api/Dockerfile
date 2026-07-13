# ============================================================
# chrislll-blog 后端 API Dockerfile
# 构建：docker build -t chrislll-api .
# 运行：docker run -d --name blog-api \
#        -e DATABASE_URL="mysql://user:pass@host:3306/db" \
#        -e JWT_SECRET="your-secret" \
#        -v ./uploads:/app/uploads \
#        -p 3000:3000 \
#        chrislll-api
# ============================================================

FROM node:20-alpine AS base
RUN apk add --no-cache openssl

# 依赖安装阶段
FROM base AS deps
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src/
RUN npm ci
RUN npx prisma generate
RUN npm run build

# 生产运行阶段
FROM base AS runner
WORKDIR /app

# 创建非 root 用户
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 复制构建产物
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

# 创建上传目录并赋权
RUN mkdir -p /app/uploads && chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

ENV NODE_ENV=production
ENV UPLOAD_DIR=./uploads
ENV PORT=3000

CMD ["node", "dist/app.js"]
