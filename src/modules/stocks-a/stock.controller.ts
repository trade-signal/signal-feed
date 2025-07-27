import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptors';

import { StockService } from './stock.service';
import { StockQuotesService } from './stock.quotes.service';
import { StockTradeService } from './stock.trade.service';

@Controller('stocks-a')
@UseInterceptors(TransformInterceptor)
export class StocksController {
  constructor(
    private readonly stockService: StockService,
    private readonly stockQuotesService: StockQuotesService,
    private readonly stockTradeService: StockTradeService,
  ) {}

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

  @Get('trade-dates')
  async getTradeDates() {
    return this.stockTradeService.getTradeDates();
  }

  @Get('trade-date/latest')
  async getTradeDate() {
    return this.stockTradeService.getTradeDate();
  }
}
