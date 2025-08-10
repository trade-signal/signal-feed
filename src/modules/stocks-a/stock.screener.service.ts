import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsSelect, Repository } from 'typeorm';

import { formatDate, formatDateISO, toDate } from 'src/common/utils/date';
import { AStockScreener } from './entities/stock.screener.entity';
import { EastMoneyStockScreenerService } from './providers/eastmoney/stock.screener.service';
import type { StockScreenerQuery } from './types/stock.query';

@Injectable()
export class StockScreenerService {
  private readonly BATCH_SIZE = 200;

  private readonly logger = new Logger(StockScreenerService.name);

  constructor(
    private readonly eastMoneyStockScreenerService: EastMoneyStockScreenerService,

    @InjectRepository(AStockScreener)
    private readonly stockScreenerRepository: Repository<AStockScreener>,
  ) {}

  private async saveData(stocks: any[]) {
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

  private transformData(list: AStockScreener[] | AStockScreener) {
    const stocks = Array.isArray(list) ? list : [list];
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

    const { date, stocks } = await this.saveData(list);

    return {
      date,
      list: this.transformData(stocks),
      total,
    };
  }

  async getStockScreener(query: StockScreenerQuery) {
    const { page = 1, pageSize = 20 } = query;

    let date: Date | undefined;

    if (query.date) {
      date = toDate(query.date);
    } else {
      const dateRaw = await this.stockScreenerRepository
        .createQueryBuilder('stockScreener')
        .select('MAX(date)', 'maxDate')
        .getRawOne();
      date = dateRaw.maxDate;
    }

    const where: FindManyOptions<AStockScreener> = {
      where: { date },
      order: { code: 'ASC' },
    };

    if (query.page && query.pageSize) {
      where.skip = (Number(page) - 1) * Number(pageSize);
      where.take = Number(pageSize);
    }
    if (query.sortBy && query.sortOrder) {
      where.order = { [query.sortBy]: query.sortOrder };
    }
    if (query.fields) {
      where.select = query.fields as FindOptionsSelect<AStockScreener>;
    }
    if (query.industry) {
      where.where = {
        ...where.where,
        industry: query.industry,
      };
    }

    const [list, total] =
      await this.stockScreenerRepository.findAndCount(where);

    return {
      date: formatDate(date),
      list: this.transformData(list),
      total,
      page: Number(page),
      pageSize: Number(pageSize),
    };
  }

  async getStockScreenerByCode(code: string) {
    const dateRaw = await this.stockScreenerRepository
      .createQueryBuilder('stockScreener')
      .select('MAX(date)', 'maxDate')
      .getRawOne();

    const stock = await this.stockScreenerRepository.findOne({
      where: { code, date: dateRaw.maxDate },
    });

    if (!stock) {
      throw new Error(`股票筛选器 ${code} 不存在`);
    }

    return this.transformData(stock);
  }
}
