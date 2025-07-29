import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { toDate, formatDate } from 'src/common/utils/date';
import { AStockQuotes } from './entities/stock.quotes.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';
import { StockTradeService } from './stock.trade.service';

@Injectable()
export class StockQuotesService {
  private readonly logger = new Logger(StockQuotesService.name);

  constructor(
    private readonly eastMoneyStockService: EastMoneyStockService,
    private readonly stockTradeService: StockTradeService,

    @InjectRepository(AStockQuotes)
    private readonly stockQuotesRepository: Repository<AStockQuotes>,
  ) {}

  private async batchSaveStockQuotes(stockQuotes: any[]) {
    const tradeDate = await this.stockTradeService.getTradeDate();

    if (!tradeDate) {
      throw new Error('没有找到交易日');
    }

    stockQuotes.forEach(item => {
      item.date = toDate(tradeDate);
    });

    const cloneStockQuotes = [...stockQuotes];

    while (cloneStockQuotes.length > 0) {
      const batch = cloneStockQuotes.splice(0, 1000);

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

  private transformStockQuotes(stockQuotes: any[]) {
    stockQuotes.forEach(item => {
      delete item.id;
      delete item.createdAt;
      delete item.updatedAt;
      item.date = formatDate(item.date);
    });
    return stockQuotes;
  }

  async getLatestStockQuotes(page: number = 1, pageSize: number = 100) {
    const { list, total } = await this.eastMoneyStockService.getStockQuotes(
      page,
      pageSize,
    );

    const { date, stocks } = await this.batchSaveStockQuotes(list);

    return {
      date,
      list: this.transformStockQuotes(stocks),
      total,
    };
  }

  async getLatestAllStockQuotes() {
    const { list, total } =
      await this.eastMoneyStockService.getAllStockQuotes();

    const { date, stocks } = await this.batchSaveStockQuotes(list);

    return {
      date,
      list: this.transformStockQuotes(stocks),
      total,
    };
  }

  async getStockQuotes(page: number = 1, pageSize: number = 100) {
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
      list: this.transformStockQuotes(list),
      total,
    };
  }

  async getAllStockQuotes() {
    const dateRaw = await this.stockQuotesRepository
      .createQueryBuilder('stockQuotes')
      .select('MAX(date)', 'maxDate')
      .getRawOne();

    const [list, total] = await this.stockQuotesRepository.findAndCount({
      order: { code: 'ASC' },
      where: {
        date: dateRaw.maxDate,
      },
    });

    return {
      date: formatDate(dateRaw.maxDate),
      list: this.transformStockQuotes(list),
      total,
    };
  }
}
