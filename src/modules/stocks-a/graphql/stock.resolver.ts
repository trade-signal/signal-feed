import { Resolver, Query, Args } from '@nestjs/graphql';
import { StockService } from '../stock.service';
import { StockQuotesService } from '../stock.quotes.service';
import { StockScreenerService } from '../stock.screener.service';
import { StockTradeService } from '../stock.trade.service';
import {
  Stock,
  StockQuotes,
  StockScreener,
  PaginatedStocks,
  PaginatedStockQuotes,
  PaginatedStockScreener,
} from './stock.graphql';
import { PaginationInput } from './stock.input';

@Resolver()
export class StockResolver {
  constructor(
    private readonly stockService: StockService,
    private readonly stockQuotesService: StockQuotesService,
    private readonly stockScreenerService: StockScreenerService,
    private readonly stockTradeService: StockTradeService,
  ) {}

  // 交易日相关查询
  @Query(() => [String], { description: '获取所有交易日' })
  async tradeDates() {
    return this.stockTradeService.getTradeDates();
  }

  @Query(() => String, { nullable: true, description: '获取最新交易日' })
  async latestTradeDate() {
    return this.stockTradeService.getTradeDate();
  }

  // 股票基本信息查询
  @Query(() => PaginatedStocks, { description: '获取股票列表（分页）' })
  async stocks(
    @Args('pagination', {
      type: () => PaginationInput,
      defaultValue: { page: 1, pageSize: 100 },
    })
    pagination: PaginationInput,
  ) {
    return this.stockService.getStocks(pagination.page, pagination.pageSize);
  }

  @Query(() => [Stock], { description: '获取所有股票' })
  async allStocks() {
    const result = await this.stockService.getAllStocks();
    return result.list;
  }

  @Query(() => PaginatedStocks, { description: '获取最新股票数据（分页）' })
  async latestStocks(
    @Args('pagination', {
      type: () => PaginationInput,
      defaultValue: { page: 1, pageSize: 100 },
    })
    pagination: PaginationInput,
  ) {
    return this.stockService.getLatestStocks(
      pagination.page,
      pagination.pageSize,
    );
  }

  @Query(() => [Stock], { description: '获取所有最新股票数据' })
  async latestAllStocks() {
    const result = await this.stockService.getLatestAllStocks();
    return result.list;
  }

  // 股票行情数据查询
  @Query(() => PaginatedStockQuotes, {
    description: '获取股票行情数据（分页）',
  })
  async stockQuotes(
    @Args('pagination', {
      type: () => PaginationInput,
      defaultValue: { page: 1, pageSize: 100 },
    })
    pagination: PaginationInput,
  ) {
    return this.stockQuotesService.getStockQuotes(
      pagination.page,
      pagination.pageSize,
    );
  }

  @Query(() => [StockQuotes], { description: '获取所有股票行情数据' })
  async allStockQuotes() {
    const result = await this.stockQuotesService.getAllStockQuotes();
    return result.list;
  }

  @Query(() => PaginatedStockQuotes, {
    description: '获取最新股票行情数据（分页）',
  })
  async latestStockQuotes(
    @Args('pagination', {
      type: () => PaginationInput,
      defaultValue: { page: 1, pageSize: 100 },
    })
    pagination: PaginationInput,
  ) {
    return this.stockQuotesService.getLatestStockQuotes(
      pagination.page,
      pagination.pageSize,
    );
  }

  @Query(() => [StockQuotes], { description: '获取所有最新股票行情数据' })
  async latestAllStockQuotes() {
    const result = await this.stockQuotesService.getLatestAllStockQuotes();
    return result.list;
  }

  // 股票筛选数据查询
  @Query(() => PaginatedStockScreener, {
    description: '获取股票筛选数据（分页）',
  })
  async stockScreener(
    @Args('pagination', {
      type: () => PaginationInput,
      defaultValue: { page: 1, pageSize: 100 },
    })
    pagination: PaginationInput,
  ) {
    return this.stockScreenerService.getStockScreener(
      pagination.page,
      pagination.pageSize,
    );
  }

  @Query(() => [StockScreener], { description: '获取所有股票筛选数据' })
  async allStockScreener() {
    const result = await this.stockScreenerService.getAllStockScreener();
    return result.list;
  }

  @Query(() => PaginatedStockScreener, {
    description: '获取最新股票筛选数据（分页）',
  })
  async latestStockScreener(
    @Args('pagination', {
      type: () => PaginationInput,
      defaultValue: { page: 1, pageSize: 100 },
    })
    pagination: PaginationInput,
  ) {
    return this.stockScreenerService.getLatestStockScreener(
      pagination.page,
      pagination.pageSize,
    );
  }

  @Query(() => [StockScreener], { description: '获取所有最新股票筛选数据' })
  async latestAllStockScreener() {
    const result = await this.stockScreenerService.getLatestAllStockScreener();
    return result.list;
  }
}
