import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export const get =
  (httpService: HttpService) =>
  async (url: string, params: Record<string, any>) => {
    const { data: response } = await firstValueFrom(
      httpService.get(url, { params }),
    );
    return response;
  };

export const post =
  (httpService: HttpService) =>
  async (url: string, data: Record<string, any>) => {
    const { data: response } = await firstValueFrom(
      httpService.post(url, data),
    );
    return response;
  };
