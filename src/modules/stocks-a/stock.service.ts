import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { formatDate, formatDateISO } from 'src/common/utils/date';
import { AStock } from './entities/stock.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';
import type { StockQuery } from './interfaces/stock.query';

@Injectable()
export class StockService {
  private readonly BATCH_SIZE = 1000;

  private readonly logger = new Logger(StockService.name);

  constructor(
    private readonly eastMoneyStockService: EastMoneyStockService,

    @InjectRepository(AStock)
    private readonly stockRepository: Repository<AStock>,
  ) {}

  private async batchSaveData(stocks: any[]) {
    const cloneStocks = [...stocks];

    while (cloneStocks.length > 0) {
      const batch = cloneStocks.splice(0, this.BATCH_SIZE);

      await this.stockRepository.upsert(batch, {
        conflictPaths: ['code', 'marketId'],
      });
    }

    this.logger.log(`已批量更新 ${stocks.length} 只股票数据`);
  }

  private transformData(stocks: any[]) {
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

  async checkExist() {
    const total = await this.stockRepository.count();
    return total > 0;
  }

  async fetchAll() {
    const { list, total } = await this.eastMoneyStockService.getAllStocks();

    const stocks = list.map(item => {
      return {
        ...item,
        isActive: true,
        isSuspended: item.newPrice === 0,
      };
    });

    await this.batchSaveData(stocks);

    return {
      list: this.transformData(stocks),
      total,
    };
  }

  async getStocks(query: StockQuery) {
    const { page, pageSize } = query;

    const [list, total] = await this.stockRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize || 100,
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
      list: this.transformData(list),
      total,
    };
  }

  async getStockByCode(code: string) {
    const stock = await this.stockRepository.findOne({
      where: { code },
    });

    if (!stock) {
      throw new Error(`股票 ${code} 不存在`);
    }

    return this.transformData([stock]);
  }
}
