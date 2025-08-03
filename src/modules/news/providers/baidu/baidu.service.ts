import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BaiduService {
  constructor(private readonly httpService: HttpService) {}

  getNews() {}
}
