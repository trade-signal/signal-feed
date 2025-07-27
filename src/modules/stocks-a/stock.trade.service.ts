import { Global, Injectable, OnModuleInit } from '@nestjs/common';

import { SinaTradeService } from './providers/sina/sina.trade.service';

@Injectable()
@Global()
export class StockTradeService implements OnModuleInit {
  constructor(private readonly sinaTradeService: SinaTradeService) {}

  private tradeDates: string[] = [];

  private async initTradeDates() {
    const tradeDates = await this.sinaTradeService.getTradeData();
    this.tradeDates = tradeDates;
  }

  async getTradeDates() {
    return this.tradeDates;
  }

  async refreshTradeDates() {
    this.tradeDates = [];
    await this.initTradeDates();
  }

  async getTradeDate() {
    return this.tradeDates.at(-1);
  }

  async onModuleInit() {
    await this.initTradeDates();
  }
}
