import { Injectable, Logger } from '@nestjs/common';
import { delayMilliseconds } from 'src/common/utils/tools';

import { StockApi } from './stock.api';
import {
  basicIndicators,
  financialIndicators,
  otherIndicators,
  priceIndicators,
  sharesAndCapIndicators,
  speedIndicators,
  tradingIndicators,
  valuationIndicators,
} from './stock.indicators';

import { getIndicatorFields, transformStockData } from './stock.utils';

@Injectable()
export class EastMoneyStockService extends StockApi {
  private readonly logger = new Logger(EastMoneyStockService.name);

  // 获取股票列表
  async getStocks(page: number = 1, pageSize: number = 100) {
    const { industry, listingDate, marketId } = otherIndicators;

    // 基础指标
    const indicator = {
      ...basicIndicators,
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

  // 获取所有股票
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

  // 获取股票行情
  async getStockQuotes(page: number = 1, pageSize: number = 100) {
    // 行情指标
    const indicator = {
      ...basicIndicators,
      ...priceIndicators,
      ...tradingIndicators,
      ...speedIndicators,
      ...valuationIndicators,
      ...financialIndicators,
      ...sharesAndCapIndicators,
    };

    const { diff, total } = await this.getStockQuotesList({
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

  // 获取所有股票行情
  async getAllStockQuotes() {
    let page = 1;
    const pageSize = 100;

    const stocks: any[] = [];

    while (true) {
      const { list, total } = await this.getStockQuotes(page, pageSize);

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
