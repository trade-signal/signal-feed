import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsSelect, Repository } from 'typeorm';

import { formatDate, formatDateISO } from 'src/common/utils/date';
import { AStock } from './entities/stock.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';
import type { StockQuery } from './types/stock.query';

@Injectable()
export class StockService {
  private readonly BATCH_SIZE = 1000;

  private readonly logger = new Logger(StockService.name);

  constructor(
    private readonly eastMoneyStockService: EastMoneyStockService,

    @InjectRepository(AStock)
    private readonly stockRepository: Repository<AStock>,
  ) {}

  private async saveData(stocks: any[]) {
    const cloneStocks = [...stocks];

    while (cloneStocks.length > 0) {
      const batch = cloneStocks.splice(0, this.BATCH_SIZE);

      await this.stockRepository.upsert(batch, {
        conflictPaths: ['code', 'marketId'],
      });
    }

    this.logger.log(`已批量更新 ${stocks.length} 只股票数据`);
  }

  private transformData(list: AStock[] | AStock) {
    const stocks = Array.isArray(list) ? list : [list];
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

    await this.saveData(stocks);

    return {
      list: this.transformData(stocks),
      total,
    };
  }

  async getStocks(query: StockQuery) {
    const { page, pageSize } = query;

    const where: FindManyOptions<AStock> = {
      select: [
        'name',
        'code',
        'industry',
        'listingDate',
        'isActive',
        'isSuspended',
      ],
      order: { code: 'ASC' },
    };

    if (query.page && query.pageSize) {
      where.skip = (page - 1) * pageSize;
      where.take = pageSize;
    }
    if (query.sortBy && query.sortOrder) {
      where.order = { [query.sortBy]: query.sortOrder };
    }
    if (query.fields) {
      where.select = query.fields as FindOptionsSelect<AStock>;
    }

    const [list, total] = await this.stockRepository.findAndCount(where);

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

    return this.transformData(stock);
  }
}
