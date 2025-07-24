import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import dayjs from 'dayjs';

import { IndicatorMapping, IndicatorType } from './stock.indicators';
import { arrayToObject } from 'src/common/utils/tools';

@Injectable()
export class StockApi {
  private readonly baseUrl = 'http://push2.eastmoney.com/api/qt/clist/get';

  constructor(private readonly httpService: HttpService) {}

  protected async get(params: Record<string, any>): Promise<any> {
    const { data: response } = await firstValueFrom(
      this.httpService.get(this.baseUrl, { params }),
    );

    if (response.data) return response.data;

    throw new Error(response.errmsg || 'Failed to get data from eastmoney');
  }

  protected getIndicatorFields(indicatorMapping: IndicatorMapping) {
    return Object.values(indicatorMapping).map((item: any) => item.map);
  }

  protected formatDate(value: string) {
    if (!value || !/^\d{8}$/.test(value)) return null;

    const rawValue = (value + '').replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    const date = dayjs(rawValue);

    if (date.isValid()) return date.toDate();

    return null;
  }

  protected normalizeValue(type: IndicatorType, value: string) {
    if (type === IndicatorType.DATE) {
      return this.formatDate(value);
    }
    if (type === IndicatorType.NUMBER) {
      return Number(value) || 0;
    }
    if (type === IndicatorType.BOOLEAN) {
      return value === '1';
    }
    if (type === IndicatorType.ARRAY) {
      return Array.isArray(value) ? value.join(',') : value;
    }
    return value || '';
  }

  protected transformStockData(
    data: any[],
    indicatorMapping: IndicatorMapping,
  ) {
    const keys = Object.keys(indicatorMapping);

    return data.map((item: any) =>
      arrayToObject(
        keys.map(key => {
          const { type, map } = indicatorMapping[key];

          return {
            [key]: this.normalizeValue(type, item[map as string]),
          };
        }),
      ),
    );
  }

  /**
   * 沪深京个股-基础信息
   *
   * 东方财富网-沪深京个股-基础信息
   * https://quote.eastmoney.com/center/gridlist.html#hs_a_board
   */
  protected async getStockList({
    fields,
    page,
    pageSize,
  }: {
    fields: string[];
    page: number;
    pageSize: number;
  }) {
    return this.get({
      pn: page,
      pz: pageSize,
      po: '1',
      np: '1',
      ut: 'bd1d9ddb04089700cf9c27f6f7426281',
      fltt: '2',
      invt: '2',
      fid: 'f3',
      fs: 'm:0 t:6,m:0 t:80,m:1 t:2,m:1 t:23,m:0 t:81 s:2048',
      fields: fields.join(','),
    });
  }
}
