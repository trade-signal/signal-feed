import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import dayjs from 'dayjs';

import { IndicatorMapping, IndicatorType } from './stock.indicators';
import { arrayToObject } from 'src/common/utils/tools';

@Injectable()
export class StockApi {
  constructor(
    private readonly httpService: HttpService,
    private readonly baseUrl: string,
  ) {}

  protected async get(params: Record<string, any>): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(this.baseUrl, { params }),
    );

    if (response.data && response.data.diff) {
      return response.data.diff;
    }

    throw new Error('Failed to get quote data');
  }

  protected getIndicatorFields(indicatorMapping: IndicatorMapping) {
    return Object.values(indicatorMapping).map((item: any) => item.map);
  }

  protected normalizeValue(type: IndicatorType, value: string) {
    if (type === IndicatorType.DATE) {
      return value ? dayjs(value).format('YYYY-MM-DD') : '';
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
