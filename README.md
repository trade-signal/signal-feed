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
- 🎯 **GraphQL 支持** - 灵活的查询接口

## API 接口

### REST API
- 基础路径：`/api/stocks-a/*`
- 支持分页、筛选等传统 REST 接口

### GraphQL API
- 端点：`/graphql`
- 开发环境 Playground：`/graphql`
- 支持灵活查询、字段选择、批量获取

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

### 4. 访问接口

#### REST API 示例
```bash
# 获取最新股票数据
curl http://localhost:4000/api/stocks-a/stocks/latest

# 获取最新行情数据
curl http://localhost:4000/api/stocks-a/quotes/latest

# 获取筛选数据
curl http://localhost:4000/api/stocks-a/screener/latest
```

#### GraphQL 示例
```graphql
# 访问 GraphQL Playground
# http://localhost:4000/graphql

# 查询最新股票数据
query {
  latestStocks(page: 1, pageSize: 10) {
    list {
      code
      name
      industry
    }
    total
  }
}

# 查询最新行情数据
query {
  latestStockQuotes(page: 1, pageSize: 10) {
    list {
      code
      name
      newPrice
      changeRate
      volume
    }
    date
  }
}
```

## GraphQL 优势

### 1. 灵活查询
- 客户端可以精确指定需要的字段
- 避免过度获取数据，减少网络传输

### 2. 批量获取
- 一次请求获取多种相关数据
- 减少网络请求次数

### 3. 强类型系统
- 完整的类型定义
- 更好的开发体验和错误提示

### 4. 实时文档
- GraphQL Playground 提供交互式文档
- 自动生成的 Schema 文档

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

## 文档

- [GraphQL 查询示例](./docs/graphql-examples.md)
- [API 接口文档](./docs/api.md)
- [数据库设计](./docs/database.md)

## 技术栈

- **后端框架**: NestJS
- **数据库**: PostgreSQL
- **ORM**: TypeORM
- **API**: REST + GraphQL
- **缓存**: Redis
- **容器化**: Docker

## 开发指南

### 添加新的 GraphQL 查询

1. 在 `src/modules/stocks-a/graphql/stock.graphql.ts` 中定义类型
2. 在 `src/modules/stocks-a/graphql/stock.resolver.ts` 中添加查询方法
3. 在 `src/modules/stocks-a/stock.module.ts` 中注册 Resolver

### 添加新的 REST 接口

1. 在对应的 Service 中添加业务逻辑
2. 在 Controller 中添加路由
3. 更新模块配置

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
