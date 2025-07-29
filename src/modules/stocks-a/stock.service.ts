import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { formatDate, formatDateISO } from 'src/common/utils/date';
import { AStock } from './entities/stock.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';

@Injectable()
export class StockService {
  private readonly BATCH_SIZE = 1000;

  private readonly logger = new Logger(StockService.name);

  constructor(
    private readonly eastMoneyStockService: EastMoneyStockService,

    @InjectRepository(AStock)
    private readonly stockRepository: Repository<AStock>,
  ) {}

  private async batchSaveStocks(stocks: any[]) {
    const cloneStocks = [...stocks];

    while (cloneStocks.length > 0) {
      const batch = cloneStocks.splice(0, this.BATCH_SIZE);

      await this.stockRepository.upsert(batch, {
        conflictPaths: ['code', 'marketId'],
      });
    }

    this.logger.log(`已批量更新 ${stocks.length} 只股票数据`);
  }

  private transformStocks(stocks: any[]) {
    return stocks.map(item => {
      delete item.id;
      return {
        ...item,
        createdAt: formatDateISO(item.createdAt),
        updatedAt: formatDateISO(item.updatedAt),
        listingDate: item.listingDate ? formatDate(item.listingDate) : null,
      };
    });
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
      list: this.transformStocks(stocks),
      total,
    };
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
      list: this.transformStocks(stocks),
      total,
    };
  }

  async getStocks(page: number = 1, pageSize: number = 100) {
    const [list, total] = await this.stockRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { code: 'ASC' },
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

  async getAllStocks() {
    const [list, total] = await this.stockRepository.findAndCount({
      order: { code: 'ASC' },
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
