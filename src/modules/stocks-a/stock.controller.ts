import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptors';

import { StockTradeService } from './stock.trade.service';
import { StockService } from './stock.service';
import { StockQuotesService } from './stock.quotes.service';
import { StockScreenerService } from './stock.screener.service';

@Controller('stocks-a')
@UseInterceptors(TransformInterceptor)
export class StocksController {
  constructor(
    private readonly stockTradeService: StockTradeService,
    private readonly stockService: StockService,
    private readonly stockQuotesService: StockQuotesService,
    private readonly stockScreenerService: StockScreenerService,
  ) {}

  @Get('trade-dates')
  async getTradeDates() {
    return this.stockTradeService.getTradeDates();
  }

  @Get('trade-date/latest')
  async getTradeDate() {
    return this.stockTradeService.getTradeDate();
  }

  @Get('stocks/latest')
  async getLatestStocks(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 100,
  ) {
    return this.stockService.getLatestStocks(page, pageSize);
  }

  @Get('stocks/latest/all')
  async getLatestAllStocks() {
    return this.stockService.getLatestAllStocks();
  }

  @Get('stocks')
  async getStocks(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 100,
  ) {
    return this.stockService.getStocks(page, pageSize);
  }

  @Get('stocks/all')
  async getAllStocks() {
    return this.stockService.getAllStocks();
  }

  @Get('quotes/latest')
  async getLatestStockQuotes(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 100,
  ) {
    return this.stockQuotesService.getLatestStockQuotes(page, pageSize);
  }

  @Get('quotes/latest/all')
  async getLatestAllStockQuotes() {
    return this.stockQuotesService.getLatestAllStockQuotes();
  }

  @Get('quotes')
  async getStockQuotes(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 100,
  ) {
    return this.stockQuotesService.getStockQuotes(page, pageSize);
  }

  @Get('quotes/all')
  async getAllStockQuotes() {
    return this.stockQuotesService.getAllStockQuotes();
  }

  @Get('screener/latest')
  async getLatestStockScreener(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 100,
  ) {
    return this.stockScreenerService.getLatestStockScreener(page, pageSize);
  }

  @Get('screener/latest/all')
  async getLatestAllStockScreener() {
    return this.stockScreenerService.getLatestAllStockScreener();
  }

  @Get('screener')
  async getStockScreener(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 100,
  ) {
    return this.stockScreenerService.getStockScreener(page, pageSize);
  }

  @Get('screener/all')
  async getAllStockScreener() {
    return this.stockScreenerService.getAllStockScreener();
  }
}
