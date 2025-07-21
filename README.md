# Signal Feed

> Open source financial data interface library
> 开源的金融数据接口库

Signal Feed 是一个面向个人用户的金融数据流与 API 服务，支持 A 股、美股、基金等市场的数据获取，适用于量化研究、投资分析等场景。

## 功能特性

- 📊 实时与历史市场数据获取（适合个人研究）
- 🔄 数据流处理与聚合
- 📈 多市场支持（A股、美股、基金）
- 🚀 高性能、易集成的 API
- 🛠️ 模块化、可扩展架构

## 快速开始

### 1. 环境准备

- 复制 `.env.example` 为 `.env`，并根据实际情况填写数据库等配置信息。

### 2. 启动依赖服务（PostgreSQL、Redis）

```bash
docker-compose -p signal-feed -f docker/docker-compose.dev.yml up -d
```

### 3. 安装依赖并启动开发服务

```bash
pnpm install
pnpm start:dev
```

## 生产环境部署

#### 方式一：本地构建并启动

```bash
pnpm build
pnpm start
```

#### 方式二：Docker Compose 部署

```bash
docker-compose \
  -p signal-feed \
  --env-file .env.production \
  -f docker/docker-compose.prod.yml \
  up -d
```
