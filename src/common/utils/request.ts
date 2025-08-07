import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export const get =
  (httpService: HttpService) =>
  async (
    url: string,
    params: Record<string, any>,
    headers?: Record<string, any>,
  ) => {
    const response = await firstValueFrom(
      httpService.get(url, {
        params,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Content-Type': 'application/json',
          cookie: 'locale=zh-cn',
          ...headers,
        },
      }),
    );
    return response.data;
  };

export const post =
  (httpService: HttpService) =>
  async (
    url: string,
    data: Record<string, any>,
    headers?: Record<string, any>,
  ) => {
    const { data: response } = await firstValueFrom(
      httpService.post(url, data, { headers: { ...headers } }),
    );
    return response;
  };
