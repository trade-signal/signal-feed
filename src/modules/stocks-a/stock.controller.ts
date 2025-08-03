import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptors';
import { ApiAuthGuard } from 'src/common/guards/api.auth.guard';

import { StockTradeService } from './stock.trade.service';
import { StockService } from './stock.service';
import { StockQuotesService } from './stock.quotes.service';
import { StockScreenerService } from './stock.screener.service';
import type {
  StockQuery,
  StockQuotesQuery,
  StockScreenerQuery,
} from './types/stock.query';

@Controller('stocks-a')
@UseInterceptors(TransformInterceptor)
@UseGuards(ApiAuthGuard)
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

  @Get('stocks/list')
  async getStocks(@Query() query: StockQuery) {
    return this.stockService.getStocks(query);
  }

  @Get('stocks/:code/detail')
  async getStock(@Param('code') code: string) {
    return this.stockService.getStockByCode(code);
  }

  @Get('quotes/list')
  async getStockQuotes(@Query() query: StockQuotesQuery) {
    return this.stockQuotesService.getStockQuotes(query);
  }

  @Get('quotes/:code/detail')
  async getStockQuotesByCode(@Param('code') code: string) {
    return this.stockQuotesService.getStockQuotesByCode(code);
  }

  @Get('screener/list')
  async getStockScreener(@Query() query: StockScreenerQuery) {
    return this.stockScreenerService.getStockScreener(query);
  }

  @Get('screener/:code/detail')
  async getStockScreenerByCode(@Param('code') code: string) {
    return this.stockScreenerService.getStockScreenerByCode(code);
  }
}
