import { Global, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { isDev } from 'src/common/constants/env.constants';
import { getRunDate } from 'src/common/utils/date';

import { SinaTradeService } from './providers/sina/sina.trade.service';

@Injectable()
@Global()
export class StockTradeService implements OnModuleInit {
  private readonly logger = new Logger(StockTradeService.name);

  constructor(private readonly sinaTradeService: SinaTradeService) {}

  private tradeDates: string[] = [];

  private async initTradeDates() {
    const tradeDates = await this.sinaTradeService.getTradeData();
    this.tradeDates = tradeDates;
  }

  async refreshTradeDates() {
    this.tradeDates = [];
    await this.initTradeDates();
  }

  async getTradeDates() {
    if (this.tradeDates.length === 0) {
      await this.initTradeDates();
    }
    return this.tradeDates;
  }

  async getTradeDate(isBeforeClose: boolean = true) {
    if (this.tradeDates.length === 0) {
      await this.initTradeDates();
    }
    const runDate = getRunDate({ isBeforeClose });
    return this.tradeDates.find(date => date === runDate) || null;
  }

  async onModuleInit() {
    if (isDev) {
      this.logger.log('开发环境，跳过初始化交易日');
      return;
    }
    await this.initTradeDates();
  }
}
