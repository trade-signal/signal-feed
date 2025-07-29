import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { toDate, formatDate } from 'src/common/utils/date';
import { AStockScreener } from './entities/stock.screener.entity';
import { EastMoneyStockScreenerService } from './providers/eastmoney/stock.screener.service';

@Injectable()
export class StockScreenerService {
  private readonly BATCH_SIZE = 200;

  private readonly logger = new Logger(StockScreenerService.name);

  constructor(
    private readonly eastMoneyStockScreenerService: EastMoneyStockScreenerService,

    @InjectRepository(AStockScreener)
    private readonly stockScreenerRepository: Repository<AStockScreener>,
  ) {}

  private async batchSaveStockScreener(stocks: any[]) {
    stocks.forEach(item => {
      item.date = toDate(item.date);
      item.listingDate = item.listingDate ? toDate(item.listingDate) : null;
    });

    const cloneStockScreener = [...stocks];

    while (cloneStockScreener.length > 0) {
      const batch = cloneStockScreener.splice(0, this.BATCH_SIZE);

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

  private transformStockScreener(stocks: any[]) {
    stocks.forEach(item => {
      delete item.id;
      delete item.createdAt;
      delete item.updatedAt;
      item.date = formatDate(item.date);
      item.listingDate = item.listingDate ? formatDate(item.listingDate) : null;
    });
    return stocks;
  }

  async getLatestStockScreener(page: number = 1, pageSize: number = 100) {
    const { list, total } =
      await this.eastMoneyStockScreenerService.getScreenerStocks(
        page,
        pageSize,
      );

    const { date, stocks } = await this.batchSaveStockScreener(list);

    return {
      date,
      list: this.transformStockScreener(stocks),
      total,
      page,
      pageSize,
    };
  }

  async getLatestAllStockScreener() {
    const { list, total } =
      await this.eastMoneyStockScreenerService.getAllScreenerStocks();

    const { date, stocks } = await this.batchSaveStockScreener(list);

    return {
      date,
      list: this.transformStockScreener(stocks),
      total,
    };
  }

  async getStockScreener(page: number = 1, pageSize: number = 100) {
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
      list: this.transformStockScreener(list),
      total,
      page,
      pageSize,
    };
  }

  async getAllStockScreener() {
    const dateRaw = await this.stockScreenerRepository
      .createQueryBuilder('stockScreener')
      .select('MAX(date)', 'maxDate')
      .getRawOne();

    const [list, total] = await this.stockScreenerRepository.findAndCount({
      order: { code: 'ASC' },
      where: {
        date: dateRaw.maxDate,
      },
    });

    return {
      date: formatDate(dateRaw.maxDate),
      list: this.transformStockScreener(list),
      total,
    };
  }
}
