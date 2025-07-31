import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { toDate, formatDate, formatDateISO } from 'src/common/utils/date';
import { AStockQuotes } from './entities/stock.quotes.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';
import { StockTradeService } from './stock.trade.service';
import type { StockQuotesQuery } from './interfaces/stock.query';

@Injectable()
export class StockQuotesService {
  private readonly BATCH_SIZE = 1000;

  private readonly logger = new Logger(StockQuotesService.name);

  constructor(
    private readonly eastMoneyStockService: EastMoneyStockService,
    private readonly stockTradeService: StockTradeService,

    @InjectRepository(AStockQuotes)
    private readonly stockQuotesRepository: Repository<AStockQuotes>,
  ) {}

  private async batchSaveStockQuotes(stockQuotes: any[]) {
    const tradeDate = await this.stockTradeService.getLatestTradeDate();

    if (!tradeDate) {
      throw new Error('没有找到交易日');
    }

    stockQuotes.forEach(item => {
      item.date = toDate(tradeDate);
    });

    const cloneStockQuotes = [...stockQuotes];

    while (cloneStockQuotes.length > 0) {
      const batch = cloneStockQuotes.splice(0, this.BATCH_SIZE);

      await this.stockQuotesRepository.upsert(batch, {
        conflictPaths: ['code', 'date'],
      });
    }

    this.logger.log(`已批量更新 ${stockQuotes.length} 条股票行情数据`);

    return {
      date: tradeDate,
      stocks: stockQuotes,
    };
  }

  private transformStocks(stockQuotes: any[]) {
    return stockQuotes.map(item => {
      delete item.id;
      return {
        ...item,
        createdAt: formatDateISO(item.createdAt),
        updatedAt: formatDateISO(item.updatedAt),
        date: formatDate(item.date),
      };
    });
  }

  async getLatestStockQuotes(page: number = 1, pageSize: number = 100) {
    const { list, total } = await this.eastMoneyStockService.getStockQuotes(
      page,
      pageSize,
    );

    const { date, stocks } = await this.batchSaveStockQuotes(list);

    return {
      date,
      list: this.transformStocks(stocks),
      total,
    };
  }

  async getLatestAllStockQuotes() {
    const { list, total } =
      await this.eastMoneyStockService.getAllStockQuotes();

    const { date, stocks } = await this.batchSaveStockQuotes(list);

    return {
      date,
      list: this.transformStocks(stocks),
      total,
    };
  }

  async getStockQuotes(query: StockQuotesQuery) {
    const { page, pageSize } = query;

    const dateRaw = await this.stockQuotesRepository
      .createQueryBuilder('stockQuotes')
      .select('MAX(date)', 'maxDate')
      .getRawOne();

    const [list, total] = await this.stockQuotesRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { code: 'ASC' },
      where: {
        date: dateRaw.maxDate,
      },
    });

    return {
      date: formatDate(dateRaw.maxDate),
      list: this.transformStocks(list),
      total,
    };
  }
}
