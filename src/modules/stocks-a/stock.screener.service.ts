import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { formatDate, formatDateISO } from 'src/common/utils/date';
import { AStockScreener } from './entities/stock.screener.entity';
import { EastMoneyStockScreenerService } from './providers/eastmoney/stock.screener.service';
import type { StockScreenerQuery } from './interfaces/stock.query';

@Injectable()
export class StockScreenerService {
  private readonly BATCH_SIZE = 200;

  private readonly logger = new Logger(StockScreenerService.name);

  constructor(
    private readonly eastMoneyStockScreenerService: EastMoneyStockScreenerService,

    @InjectRepository(AStockScreener)
    private readonly stockScreenerRepository: Repository<AStockScreener>,
  ) {}

  private async batchSaveData(stocks: any[]) {
    const cloneStocks = [...stocks];

    while (cloneStocks.length > 0) {
      const batch = cloneStocks.splice(0, this.BATCH_SIZE);

      await this.stockScreenerRepository.upsert(batch, {
        conflictPaths: ['code', 'date'],
      });
    }

    this.logger.log(`已批量更新 ${stocks.length} 条股票行情数据`);

    return {
      date: formatDate(stocks[0].date),
      stocks,
    };
  }

  private transformData(stocks: any[]) {
    return stocks.map(item => {
      delete item.id;
      return {
        ...item,
        createdAt: formatDateISO(item.createdAt),
        updatedAt: formatDateISO(item.updatedAt),
        date: formatDate(item.date),
        listingDate: item.listingDate ? formatDate(item.listingDate) : null,
      };
    });
  }

  async checkExist() {
    const total = await this.stockScreenerRepository.count();
    return total > 0;
  }

  async fetchAll() {
    const { list, total } =
      await this.eastMoneyStockScreenerService.getAllScreenerStocks();

    const { date, stocks } = await this.batchSaveData(list);

    return {
      date,
      list: this.transformData(stocks),
      total,
    };
  }

  async getStockScreener(query: StockScreenerQuery) {
    const { page, pageSize } = query;

    const dateRaw = await this.stockScreenerRepository
      .createQueryBuilder('stockScreener')
      .select('MAX(date)', 'maxDate')
      .getRawOne();

    const [list, total] = await this.stockScreenerRepository.findAndCount({
      order: { code: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        date: dateRaw.maxDate,
      },
    });

    return {
      date: formatDate(dateRaw.maxDate),
      list: this.transformData(list),
      total,
    };
  }

  async getStockScreenerByCode(code: string) {
    const dateRaw = await this.stockScreenerRepository
      .createQueryBuilder('stockScreener')
      .select('MAX(date)', 'maxDate')
      .getRawOne();

    const stockScreener = await this.stockScreenerRepository.findOne({
      where: { code, date: dateRaw.maxDate },
    });

    if (!stockScreener) {
      throw new Error(`股票筛选器 ${code} 不存在`);
    }

    return {
      date: formatDate(dateRaw.maxDate),
      data: this.transformData([stockScreener])[0],
    };
  }
}
