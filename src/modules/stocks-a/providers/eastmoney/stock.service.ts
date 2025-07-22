import { Injectable, Logger } from '@nestjs/common';

import { StockApi } from './stock.base';
import { baseIndicators, otherIndicators } from './stock.indicators';

@Injectable()
export class EastMoneyStockService extends StockApi {
  private readonly logger = new Logger(EastMoneyStockService.name);

  async getStocks(page: number = 1, pageSize: number = 100) {
    const { industry, listingDate, marketId } = otherIndicators;

    const indicator = {
      ...baseIndicators,
      industry,
      listingDate,
      marketId,
    };

    const data = await this.getStockList({
      page,
      pageSize,
      fields: this.getIndicatorFields(indicator),
    });

    if (!data || !data.length) {
      this.logger.error('获取股票列表失败');
      return [];
    }

    const list = this.transformStockData(data, indicator);

    this.logger.log(`获取股票列表成功，共${list.length}条`);

    return list;
  }

  async getAllStocks() {
    let page = 1;
    const pageSize = 100;

    const list: any[] = [];

    while (true) {
      const stocks = await this.getStocks(page, pageSize);

      if (!stocks || !stocks.length || stocks.length < pageSize) break;

      list.push(...stocks);

      page++;
    }

    return list;
  }
}
