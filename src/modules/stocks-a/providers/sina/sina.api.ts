import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { get } from 'src/common/utils/request';

import { decodeData, transformData } from './sina.decode';

@Injectable()
export class SinaApi {
  constructor(private readonly httpService: HttpService) {}

  protected async getTradeDates() {
    try {
      const response = await get(this.httpService)(
        'https://finance.sina.com.cn/realstock/company/klc_td_sh.txt',
        {},
      );

      const data = response.split('=')[1].split(';')[0].replace('"', '');
      const decode = decodeData(data);

      return transformData(decode);
    } catch (error) {
      return [];
    }
  }
}
