import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import dayjs from 'dayjs';

import { AStock } from './entities/stock.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';

@Injectable()
export class StocksService {
  private readonly logger = new Logger(StocksService.name);

  constructor(
    private readonly eastMoneyStockService: EastMoneyStockService,

    @InjectRepository(AStock)
    private readonly stockRepository: Repository<AStock>,
  ) {}

  private async batchSaveStocks(stocks: any[]) {
    const cloneStocks = [...stocks];

    while (cloneStocks.length > 0) {
      const batch = cloneStocks.splice(0, 1000);

      await this.stockRepository.upsert(batch, {
        conflictPaths: ['code', 'marketId'],
      });
    }

    this.logger.log(`批量更新 ${stocks.length} 只股票数据`);
  }

  async getLatestAllStocks() {
    const { list, total } = await this.eastMoneyStockService.getAllStocks();

    const stocks = list.map(item => {
      return {
        ...item,
        isActive: true,
        isSuspended: item.newPrice === 0,
      };
    });

    await this.batchSaveStocks(stocks);

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

    await this.batchSaveStocks(stocks);

    return {
      list: stocks,
      total,
    };
  }

  private transformStocks(stocks: any[]) {
    return stocks.map(item => {
      return {
        ...item,
        listingDate: item.listingDate
          ? dayjs(item.listingDate).format('YYYY-MM-DD')
          : null,
      };
    });
  }

  async getAllStocks() {
    const [list, total] = await this.stockRepository.findAndCount({
      select: {
        name: true,
        code: true,
        industry: true,
        listingDate: true,
        isActive: true,
        isSuspended: true,
      },
    });

    return {
      list: this.transformStocks(list),
      total,
    };
  }

  async getStocks(page: number = 1, pageSize: number = 100) {
    const [list, total] = await this.stockRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        name: true,
        code: true,
        industry: true,
        listingDate: true,
        isActive: true,
        isSuspended: true,
      },
    });

    return {
      list: this.transformStocks(list),
      total,
    };
  }
}
