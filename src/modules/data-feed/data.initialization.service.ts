import { Global, Injectable, Logger } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';

import { StockService } from 'src/modules/stocks-a/stock.service';
import { StockQuotesService } from 'src/modules/stocks-a/stock.quotes.service';
import { StockScreenerService } from 'src/modules/stocks-a/stock.screener.service';

@Injectable()
@Global()
export class DataInitializationService implements OnModuleInit {
  private readonly logger = new Logger(DataInitializationService.name);

  constructor(
    private readonly stockService: StockService,
    private readonly stockQuotesService: StockQuotesService,
    private readonly stockScreenerService: StockScreenerService,
  ) {}

  async onModuleInit() {
    const dataExist = await this.stockService.checkExist();
    if (dataExist) {
      this.logger.log('股票数据已存在，跳过初始化');
      return;
    }

    await this.initialize();
  }

  private async initialize() {
    try {
      // 获取所有股票
      await this.stockService.fetchAll();
      // 获取所有股票的行情
      // await this.stockQuotesService.fetchAll();
      // 获取所有股票的筛选器
      // await this.stockScreenerService.fetchAll();
    } catch (error) {
      this.logger.error(`数据初始化失败: ${error.message}`);
    }
  }
}
