import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    const cloneStockQuotes = [...stockQuotes];

    const tradeDate = await this.stockTradeService.getTradeDate(false);

    if (!tradeDate) {
      throw new Error('没有找到交易日');
    }

    cloneStockQuotes.forEach(item => {
      item.date = tradeDate;
    });

    while (cloneStockQuotes.length > 0) {
      const batch = cloneStockQuotes.splice(0, 1000);

      await this.stockQuotesRepository.upsert(batch, {
        conflictPaths: ['code', 'date'],
      });
    }

    this.logger.log(`已批量更新 ${stockQuotes.length} 条股票行情数据`);
  }

  async getLatestStockQuotes(page: number = 1, pageSize: number = 100) {
    const { list, total } = await this.eastMoneyStockService.getStockQuotes(
      page,
      pageSize,
    );

    await this.batchSaveStockQuotes(list);

    return {
      list,
      total,
    };
  }

  async getLatestAllStockQuotes() {
    const { list, total } =
      await this.eastMoneyStockService.getAllStockQuotes();

    await this.batchSaveStockQuotes(list);

    return {
      list,
      total,
    };
  }
}
