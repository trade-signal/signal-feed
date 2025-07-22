import { Controller, Get, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks-a')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get('stocks/latest')
  async getLatestStocks() {
    return this.stocksService.getLatestStocks();
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
