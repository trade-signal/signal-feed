import { Controller, Get, Query } from '@nestjs/common';

import { NewsSinaService } from './news.sina.service';
import { NewsFutunnService } from './news.futunn.service';
import { NewsClsService } from './news.cls.service';
import { NewsBaiduService } from './news.baidu.service';
import { NewsQuery } from './types/news.query';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsSinaService: NewsSinaService,
    private readonly newsFutunnService: NewsFutunnService,
    private readonly newsClsService: NewsClsService,
    private readonly newsBaiduService: NewsBaiduService,
  ) {}

  @Get('sina/list')
  async getSinaNews(@Query() query: NewsQuery) {
    return this.newsSinaService.getNews(query);
  }

  @Get('futunn/list')
  async getFutunnNews(@Query() query: NewsQuery) {
    return this.newsFutunnService.getNews(query);
  }

  @Get('cls/list')
  async getClsNews(@Query() query: NewsQuery) {
    return this.newsClsService.getNews(query);
  }

  @Get('baidu/list')
  async getBaiduNews(@Query() query: NewsQuery) {
    return this.newsBaiduService.getNews(query);
  }
}
