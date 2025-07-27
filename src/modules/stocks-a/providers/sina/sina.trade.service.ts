import { Injectable, Logger } from '@nestjs/common';

import { SinaApi } from './sina.api';

@Injectable()
export class SinaTradeService extends SinaApi {
  private readonly logger = new Logger(SinaTradeService.name);

  async getTradeData() {
    const tradeDates = await this.getTradeDates();

    this.logger.log(`已获取 ${tradeDates.length} 条交易日数据`);

    return tradeDates;
  }
}
