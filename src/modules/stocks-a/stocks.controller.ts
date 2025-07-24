import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptors';

import { StocksService } from './stocks.service';

@Controller('stocks-a')
@UseInterceptors(TransformInterceptor)
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get('stocks/latest')
  async getLatestStocks(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 100,
  ) {
    return this.stocksService.getLatestStocks(page, pageSize);
  }

  @Get('stocks/latest/all')
  async getLatestAllStocks() {
    return this.stocksService.getLatestAllStocks();
  }

  @Get('stocks')
  async getStocks(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 100,
  ) {
    return this.stocksService.getStocks(page, pageSize);
  }

  @Get('stocks/all')
  async getAllStocks() {
    return this.stocksService.getAllStocks();
  }
}
