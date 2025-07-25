import { Injectable, Logger } from '@nestjs/common';
import { delayMilliseconds } from 'src/common/utils/tools';

import { StockApi } from './stock.base';
import {
  baseIndicators,
  otherIndicators,
  priceIndicators,
} from './stock.indicators';

import { getIndicatorFields, transformStockData } from './stock.utils';

@Injectable()
export class EastMoneyStockService extends StockApi {
  private readonly logger = new Logger(EastMoneyStockService.name);

  async getStocks(page: number = 1, pageSize: number = 100) {
    const { industry, listingDate, marketId } = otherIndicators;

    const indicator = {
      ...baseIndicators,
      newPrice: priceIndicators.newPrice,
      industry,
      listingDate,
      marketId,
    };

    const { diff, total } = await this.getStockList({
      page,
      pageSize,
      fields: getIndicatorFields(indicator),
    });

    if (!diff || !diff.length) {
      return {
        stocks: [],
        total: 0,
      };
    }

    const stocks = transformStockData(diff, indicator);

    this.logger.log(`获取股票列表成功，共${stocks.length}条`);

    return {
      list: stocks,
      total,
    };
  }

  async getAllStocks() {
    let page = 1;
    const pageSize = 100;

    const stocks: any[] = [];

    while (true) {
      const { list, total } = await this.getStocks(page, pageSize);

      if (!list || !list.length) break;

      stocks.push(...list);

      page++;

      this.logger.log(`第${page}页，共${total}条, 已获取${stocks.length}条`);

      if (stocks.length >= total) break;

      await delayMilliseconds(300);
    }

    return {
      list: stocks,
      total: stocks.length,
    };
  }
}
