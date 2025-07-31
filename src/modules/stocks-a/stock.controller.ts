import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptors';

import { StockTradeService } from './stock.trade.service';
import { StockService } from './stock.service';
import { StockQuotesService } from './stock.quotes.service';
import { StockScreenerService } from './stock.screener.service';
import type {
  StockQuery,
  StockQuotesQuery,
  StockScreenerQuery,
} from './interfaces/stock.query';

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

  @Get('stocks')
  async getStocks(@Query() query: StockQuery) {
    return this.stockService.getStocks(query);
  }

  @Get('stocks/:code')
  async getStock(@Param('code') code: string) {
    return this.stockService.getStockByCode(code);
  }

  @Get('quotes')
  async getStockQuotes(@Query() query: StockQuotesQuery) {
    return this.stockQuotesService.getStockQuotes(query);
  }

  @Get('quotes/:code')
  async getStockQuotesByCode(@Param('code') code: string) {
    return this.stockQuotesService.getStockQuotesByCode(code);
  }

  @Get('screener')
  async getStockScreener(@Query() query: StockScreenerQuery) {
    return this.stockScreenerService.getStockScreener(query);
  }
}
