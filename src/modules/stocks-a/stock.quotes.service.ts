import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AStock } from './entities/stock.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';

@Injectable()
export class StockQuotesService {
  private readonly logger = new Logger(StockQuotesService.name);

  constructor(
    private readonly eastMoneyStockService: EastMoneyStockService,

    @InjectRepository(AStock)
    private readonly stockRepository: Repository<AStock>,
  ) {}

  private async batchSaveStockQuotes(stockQuotes: any[]) {
    const cloneStockQuotes = [...stockQuotes];

    while (cloneStockQuotes.length > 0) {
      const batch = cloneStockQuotes.splice(0, 1000);

      await this.stockRepository.upsert(batch, {
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

    return {
      list,
      total,
    };
  }

  async getLatestAllStockQuotes() {
    const { list, total } =
      await this.eastMoneyStockService.getAllStockQuotes();

    return {
      list,
      total,
    };
  }
}
