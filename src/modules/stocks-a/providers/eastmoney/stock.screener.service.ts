import { Injectable, Logger } from '@nestjs/common';

import { StockApi } from './stock.api';
import { selectionIndicatorMapping } from './stock.screener.indicators';
import { getIndicatorFields, transformStockData } from './stock.utils';
import { delayMilliseconds } from 'src/common/utils/tools';

@Injectable()
export class EastMoneyStockScreenerService extends StockApi {
  private readonly logger = new Logger(EastMoneyStockScreenerService.name);

  // 获取选股指标股票列表
  async getScreenerStocks(page: number = 1, pageSize: number = 100) {
    const { diff, total } = await this.getScreenerStockList({
      page,
      pageSize,
      fields: getIndicatorFields(selectionIndicatorMapping),
    });

    if (!diff || !diff.length) {
      return {
        stocks: [],
        total: 0,
      };
    }

    const stocks = transformStockData(diff, selectionIndicatorMapping);

    this.logger.log(`获取股票列表成功，共${stocks.length}条`);

    return {
      list: stocks,
      total,
    };
  }

  // 获取所有选股指标股票
  async getAllScreenerStocks() {
    let page = 1;
    const pageSize = 100;

    const stocks: any[] = [];

    while (true) {
      const { list, total } = await this.getScreenerStocks(page, pageSize);

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
