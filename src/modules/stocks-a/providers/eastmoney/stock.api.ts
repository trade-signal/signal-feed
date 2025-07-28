import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StockApi {
  constructor(private readonly httpService: HttpService) {}

  protected async request(
    url: string,
    params: Record<string, any>,
  ): Promise<any> {
    const { data: response } = await firstValueFrom(
      this.httpService.get(url, {
        params,
      }),
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
    return this.request('http://push2.eastmoney.com/api/qt/clist/get', {
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

  /**
   * 获取股票行情-实时行情
   *
   * 东方财富网-沪深京个股-实时行情
   * https://quote.eastmoney.com/center/gridlist.html#hs_a_board
   *
   * @param params
   */
  protected async getStockQuotesList({
    fields,
    page,
    pageSize,
  }: {
    fields: string[];
    page: number;
    pageSize: number;
  }) {
    return this.request('http://push2.eastmoney.com/api/qt/clist/get', {
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

  /**
   * 获取股票列表
   *
   * 东方财富网-选股指标-股票列表
   * https://data.eastmoney.com/xuangu/
   *
   * @param params
   */
  protected async getScreenerStockList({
    fields,
    page,
    pageSize,
  }: {
    fields: string[];
    page: number;
    pageSize: number;
  }) {
    const url = `https://data.eastmoney.com/dataapi/xuangu/list`;

    // 过滤条件
    // const filter = `(MARKET+in+("上交所主板","深交所主板","深交所创业板","上交所科创板","上交所风险警示板","深交所风险警示板","北京证券交易所"))(NEW_PRICE>0)`;
    const filter = `(MARKET+in+("上交所主板","深交所主板","深交所创业板","上交所科创板"))(NEW_PRICE>0)`;

    return this.request(url, {
      sty: fields.join(','),
      filter,
      p: page,
      ps: pageSize,
      source: 'SELECT_SECURITIES',
      client: 'WEB',
    });
  }
}
