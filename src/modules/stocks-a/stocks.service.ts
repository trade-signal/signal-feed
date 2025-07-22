import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Stock } from './entities/stock.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';

@Injectable()
export class StocksService {
  constructor(
    private readonly eastMoneyStockService: EastMoneyStockService,
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async getLatestAllStocks() {
    const stocks = await this.eastMoneyStockService.getAllStocks();

    // 过滤掉停牌的股票
    const list = stocks.filter(item => item.newPrice > 0);

    // 保存到数据库
    await this.stockRepository.upsert(list, {
      conflictPaths: ['code', 'market'],
    });

    return list;
  }

  async getLatestStocks() {
    const stocks = await this.eastMoneyStockService.getStocks(1, 100);

    // 过滤掉停牌的股票
    const list = stocks.filter(item => item.newPrice > 0);

    // 保存到数据库
    await this.stockRepository.upsert(list, {
      conflictPaths: ['code', 'market'],
    });

    return list;
  }

  async getAllStocks() {
    return this.stockRepository.findAndCount();
  }

  async getStocks(page: number = 1, pageSize: number = 100) {
    return this.stockRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
}
