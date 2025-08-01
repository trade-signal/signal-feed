import { Global, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { StockQuotesService } from 'src/modules/stocks-a/stock.quotes.service';
import { StockScreenerService } from 'src/modules/stocks-a/stock.screener.service';
import { StockService } from 'src/modules/stocks-a/stock.service';

@Injectable()
@Global()
export class DataStockCronService {
  private readonly logger = new Logger(DataStockCronService.name);

  constructor(
    private readonly stockService: StockService,
    private readonly stockQuotesService: StockQuotesService,
    private readonly stockScreenerService: StockScreenerService,
  ) {}

  // 每10分钟检查一次
  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    this.logger.log('数据更新服务运行状态: 正常');
  }

  // 每天4点更新数据(周一到周五)
  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_4PM)
  async handleStockUpdate() {
    try {
      this.logger.log('开始更新股票行情数据');
      await this.stockQuotesService.fetchAll();
      this.logger.log('股票行情数据更新完成');

      this.logger.log('开始更新股票筛选器数据');
      await this.stockScreenerService.fetchAll();
      this.logger.log('股票筛选器数据更新完成');
    } catch (error) {
      this.logger.error(`股票数据更新失败: ${error.message}`);
    }
  }

  // 每月1号0点更新数据
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async handleStockUpdateMonthly() {
    try {
      this.logger.log('开始更新股票数据');
      await this.stockService.fetchAll();
      this.logger.log('股票数据更新完成');
    } catch (error) {
      this.logger.error(`股票数据更新失败: ${error.message}`);
    }
  }
}
