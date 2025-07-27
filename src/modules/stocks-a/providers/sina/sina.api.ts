import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { decodeData, transformData } from './sina.decode';

@Injectable()
export class SinaApi {
  constructor(private readonly httpService: HttpService) {}

  protected async getTradeDates() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://finance.sina.com.cn/realstock/company/klc_td_sh.txt',
        ),
      );

      if (!response.data) return [];

      const data = response.data.split('=')[1].split(';')[0].replace('"', '');
      const decode = decodeData(data);

      return transformData(decode);
    } catch (error) {
      return [];
    }
  }
}
