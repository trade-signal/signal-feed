import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsSelect, Repository } from 'typeorm';

import { toDate, formatDate, formatDateISO } from 'src/common/utils/date';
import { AStockQuotes } from './entities/stock.quotes.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';
import { StockTradeService } from './stock.trade.service';
import type { StockQuotesQuery } from './types/stock.query';

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

  protected async saveData(stockQuotes: any[]) {
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

  protected transformData(list: AStockQuotes[] | AStockQuotes) {
    const stocks = Array.isArray(list) ? list : [list];
    return stocks.map(item => {
      delete item.id;
      return {
        ...item,
        createdAt: formatDateISO(item.createdAt),
        updatedAt: formatDateISO(item.updatedAt),
        date: formatDate(item.date),
      };
    });
  }

  async checkExist() {
    const total = await this.stockQuotesRepository.count();
    return total > 0;
  }

  async fetchAll() {
    const { list, total } =
      await this.eastMoneyStockService.getAllStockQuotes();

    const { date, stocks } = await this.saveData(list);

    return {
      date,
      list: this.transformData(stocks),
      total,
    };
  }

  async getStockQuotes(query: StockQuotesQuery) {
    const { page = 1, pageSize = 20 } = query;

    let date: Date | undefined;

    if (query.date) {
      date = toDate(query.date);
    } else {
      const dateRaw = await this.stockQuotesRepository
        .createQueryBuilder('stockQuotes')
        .select('MAX(date)', 'maxDate')
        .getRawOne();
      date = dateRaw.maxDate;
    }

    const where: FindManyOptions<AStockQuotes> = {
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
      where.select = query.fields as FindOptionsSelect<AStockQuotes>;
    }

    const [list, total] = await this.stockQuotesRepository.findAndCount(where);

    return {
      date: formatDate(date),
      list: this.transformData(list),
      total,
      page: Number(page),
      pageSize: Number(pageSize),
    };
  }

  async getStockQuotesByCode(code: string) {
    const dateRaw = await this.stockQuotesRepository
      .createQueryBuilder('stockQuotes')
      .select('MAX(date)', 'maxDate')
      .getRawOne();

    const stock = await this.stockQuotesRepository.findOne({
      where: { code, date: dateRaw.maxDate },
    });

    if (!stock) {
      throw new Error(`股票行情 ${code} 不存在`);
    }

    return this.transformData(stock);
  }
}
