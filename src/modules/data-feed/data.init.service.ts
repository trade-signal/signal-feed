import { Global, Injectable, Logger } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';

import { StockService } from 'src/modules/stocks-a/stock.service';
import { StockQuotesService } from 'src/modules/stocks-a/stock.quotes.service';
import { StockScreenerService } from 'src/modules/stocks-a/stock.screener.service';

@Injectable()
@Global()
export class DataInitService implements OnModuleInit {
  private readonly logger = new Logger(DataInitService.name);

  constructor(
    private readonly stockService: StockService,
    private readonly stockQuotesService: StockQuotesService,
    private readonly stockScreenerService: StockScreenerService,
  ) {}

  async onModuleInit() {
    await this.initialize();
  }

  private async initialize() {
    // 股票数据初始化
    await this.stockInitialization();
    // 股票行情数据初始化
    await this.stockQuotesInitialization();
    // 股票筛选器数据初始化
    await this.stockScreenerInitialization();
  }

  private async stockInitialization() {
    const dataExist = await this.stockService.checkExist();
    if (dataExist) {
      this.logger.log('股票数据已存在，跳过初始化');
      return;
    }

    try {
      await this.stockService.fetchAll();
    } catch (error) {
      this.logger.error(`股票数据初始化失败: ${error.message}`);
    }
  }

  private async stockQuotesInitialization() {
    const dataExist = await this.stockQuotesService.checkExist();
    if (dataExist) {
      this.logger.log('股票行情数据已存在，跳过初始化');
      return;
    }

    try {
      await this.stockQuotesService.fetchAll();
    } catch (error) {
      this.logger.error(`股票行情数据初始化失败: ${error.message}`);
    }
  }

  private async stockScreenerInitialization() {
    const dataExist = await this.stockScreenerService.checkExist();
    if (dataExist) {
      this.logger.log('股票筛选器数据已存在，跳过初始化');
      return;
    }

    try {
      await this.stockScreenerService.fetchAll();
    } catch (error) {
      this.logger.error(`股票筛选器数据初始化失败: ${error.message}`);
    }
  }
}
