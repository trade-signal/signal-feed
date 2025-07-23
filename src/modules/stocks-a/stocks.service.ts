import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AStock } from './entities/stock.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';

@Injectable()
export class StocksService {
  constructor(
    private readonly eastMoneyStockService: EastMoneyStockService,

    @InjectRepository(AStock)
    private readonly stockRepository: Repository<AStock>,
  ) {}

  async getLatestAllStocks() {
    const stocks = await this.eastMoneyStockService.getAllStocks();

    const list = stocks.map(item => {
      return {
        ...item,
        isActive: true,
        isSuspended: item.newPrice === 0,
      };
    });

    // 保存到数据库
    await this.stockRepository.upsert(list, {
      conflictPaths: ['code', 'marketId'],
    });

    return list;
  }

  async getLatestStocks(page: number = 1, pageSize: number = 100) {
    const stocks = await this.eastMoneyStockService.getStocks(page, pageSize);

    const list = stocks.map(item => {
      return {
        ...item,
        isActive: true,
        isSuspended: item.newPrice === 0,
      };
    });

    // 保存到数据库
    await this.stockRepository.upsert(list, {
      conflictPaths: ['code', 'marketId'],
    });

    return stocks;
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
