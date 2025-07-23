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
    const { list, total } = await this.eastMoneyStockService.getAllStocks();

    const stocks = list.map(item => {
      return {
        ...item,
        isActive: true,
        isSuspended: item.newPrice === 0,
      };
    });

    // 保存到数据库
    await this.stockRepository.upsert(stocks, {
      conflictPaths: ['code', 'marketId'],
    });

    return {
      list: stocks,
      total,
    };
  }

  async getLatestStocks(page: number = 1, pageSize: number = 100) {
    const { list, total } = await this.eastMoneyStockService.getStocks(
      page,
      pageSize,
    );

    const stocks = list.map(item => {
      return {
        ...item,
        isActive: true,
        isSuspended: item.newPrice === 0,
      };
    });

    // 保存到数据库
    await this.stockRepository.upsert(stocks, {
      conflictPaths: ['code', 'marketId'],
    });

    return {
      list: stocks,
      total,
    };
  }

  async getAllStocks() {
    const [list, total] = await this.stockRepository.findAndCount();

    return {
      list,
      total,
    };
  }

  async getStocks(page: number = 1, pageSize: number = 100) {
    const [list, total] = await this.stockRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      list,
      total,
    };
  }
}
