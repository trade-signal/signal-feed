import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

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
