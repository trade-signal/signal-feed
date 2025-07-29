# GraphQL 查询示例

## 基础查询

### 1. 获取交易日信息

```graphql
query {
  tradeDates
  latestTradeDate
}
```

### 2. 获取股票基本信息

```graphql
query {
  stocks(pagination: { page: 1, pageSize: 10 }) {
    list {
      code
      name
      industry
      isActive
    }
    total
    page
    pageSize
  }
}
```

### 3. 获取所有股票

```graphql
query {
  allStocks {
    code
    name
    industry
    listingDate
    isActive
    isSuspended
  }
}
```

### 4. 获取最新股票数据

```graphql
query {
  latestStocks(pagination: { page: 1, pageSize: 20 }) {
    list {
      code
      name
      industry
      isActive
      isSuspended
    }
    total
    page
    pageSize
  }
}
```

## 行情数据查询

### 1. 获取最新行情数据（分页）

```graphql
query {
  latestStockQuotes(pagination: { page: 1, pageSize: 20 }) {
    list {
      code
      name
      newPrice
      changeRate
      volume
      dealAmount
      turnoverRate
      pe
      totalMarketCap
    }
    total
    date
    page
    pageSize
  }
}
```

### 2. 获取所有最新行情数据

```graphql
query {
  latestAllStockQuotes {
    code
    name
    newPrice
    changeRate
    upsDowns
    volume
    dealAmount
    amplitude
    turnoverRate
    volumeRatio
    openPrice
    highPrice
    lowPrice
    preClosePrice
  }
}
```

### 3. 获取特定字段的行情数据

```graphql
query {
  latestAllStockQuotes {
    code
    name
    newPrice
    changeRate
  }
}
```

### 4. 获取历史行情数据

```graphql
query {
  stockQuotes(pagination: { page: 1, pageSize: 50 }) {
    list {
      code
      name
      newPrice
      changeRate
      volume
      dealAmount
      date
    }
    total
    date
    page
    pageSize
  }
}
```

## 筛选数据查询

### 1. 获取股票筛选数据

```graphql
query {
  latestStockScreener(pagination: { page: 1, pageSize: 50 }) {
    list {
      code
      name
      industry
      area
      newPrice
      changeRate
      pe9
      pbnewmrq
      totalMarketCap
      roeWeight
      netprofitYoyRatio
      # 技术指标
      macdGoldenFork
      kdjGoldenFork
      breakThrough
      # 资金流向
      netInflow
      ddx
    }
    total
    date
    page
    pageSize
  }
}
```

### 2. 获取指数成分股

```graphql
query {
  latestAllStockScreener {
    code
    name
    isHs300
    isSz50
    isZz500
    isZz1000
    isCy50
    newPrice
    changeRate
    totalMarketCap
  }
}
```

### 3. 获取历史筛选数据

```graphql
query {
  stockScreener(pagination: { page: 1, pageSize: 100 }) {
    list {
      code
      name
      industry
      newPrice
      changeRate
      pe9
      totalMarketCap
      roeWeight
    }
    total
    date
    page
    pageSize
  }
}
```

## 复杂查询示例

### 1. 同时获取多种数据

```graphql
query {
  # 获取交易日
  latestTradeDate
  
  # 获取股票基本信息
  stocks(pagination: { page: 1, pageSize: 5 }) {
    list {
      code
      name
      industry
    }
    total
    page
    pageSize
  }
  
  # 获取最新行情
  latestStockQuotes(pagination: { page: 1, pageSize: 5 }) {
    list {
      code
      name
      newPrice
      changeRate
    }
    date
    total
    page
    pageSize
  }
  
  # 获取筛选数据
  latestStockScreener(pagination: { page: 1, pageSize: 5 }) {
    list {
      code
      name
      pe9
      roeWeight
    }
    date
    total
    page
    pageSize
  }
}
```

### 2. 分页查询示例

```graphql
query GetStocksWithPagination($page: Int!, $pageSize: Int!) {
  stocks(pagination: { page: $page, pageSize: $pageSize }) {
    list {
      id
      code
      name
      industry
      isActive
    }
    total
    page
    pageSize
  }
}

# 变量
{
  "page": 1,
  "pageSize": 20
}
```

### 3. 行情数据分页查询

```graphql
query GetQuotesWithPagination($page: Int!, $pageSize: Int!) {
  latestStockQuotes(pagination: { page: $page, pageSize: $pageSize }) {
    list {
      code
      name
      newPrice
      changeRate
      volume
      dealAmount
    }
    total
    date
    page
    pageSize
  }
}

# 变量
{
  "page": 1,
  "pageSize": 50
}
```

## 使用建议

### 1. 字段选择
- 只查询需要的字段，减少网络传输
- 对于大量数据，使用分页查询

### 2. 分页最佳实践
```graphql
# 推荐：使用合理的分页大小
query {
  stocks(pagination: { page: 1, pageSize: 20 }) {
    list {
      code
      name
      industry
    }
    total
    page
    pageSize
  }
}

# 避免：一次性获取过多数据
query {
  stocks(pagination: { page: 1, pageSize: 10000 }) {
    list {
      code
      name
      industry
    }
    total
    page
    pageSize
  }
}
```

### 3. 缓存策略
- 利用 GraphQL 的缓存机制
- 对于不经常变化的数据，考虑客户端缓存

### 4. 性能优化
- 避免在单个查询中获取过多数据
- 使用分页和限制参数
- 合理使用字段选择

### 5. 错误处理
```graphql
query {
  latestStockQuotes(pagination: { page: 1, pageSize: 10 }) {
    list {
      code
      name
      newPrice
    }
    total
    date
    page
    pageSize
  }
}
```

## 与 REST API 对比

### REST API 方式
```bash
# 需要多个请求
GET /api/stocks-a/stocks/latest?page=1&pageSize=10
GET /api/stocks-a/quotes/latest?page=1&pageSize=10
GET /api/stocks-a/screener/latest?page=1&pageSize=10
```

### GraphQL 方式
```graphql
# 一个请求获取所有需要的数据
query {
  latestStocks(pagination: { page: 1, pageSize: 10 }) { 
    list { code name industry }
    total
    page
    pageSize
  }
  latestStockQuotes(pagination: { page: 1, pageSize: 10 }) { 
    list { code name newPrice changeRate }
    total
    date
    page
    pageSize
  }
  latestStockScreener(pagination: { page: 1, pageSize: 10 }) { 
    list { code name pe9 roeWeight }
    total
    date
    page
    pageSize
  }
}
```

## 访问地址

开发环境：
- GraphQL Playground: `http://localhost:4000/graphql`
- GraphQL Endpoint: `http://localhost:4000/graphql`

生产环境：
- GraphQL Endpoint: `https://your-domain.com/graphql`

## 字段说明

### 分页字段
- `page`: 当前页码
- `pageSize`: 每页数量
- `total`: 总记录数
- `list`: 数据列表

### 股票字段
- `id`: 股票ID
- `code`: 股票代码
- `name`: 股票名称
- `industry`: 所属行业
- `isActive`: 是否活跃
- `isSuspended`: 是否停牌

### 行情字段
- `newPrice`: 最新价
- `changeRate`: 涨跌幅(%)
- `volume`: 成交量
- `dealAmount`: 成交额
- `pe`: 市盈率TTM
- `totalMarketCap`: 总市值 