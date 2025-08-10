import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiAuthGuard } from 'src/common/guards/api.auth.guard';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptors';

import { NewsSinaService } from './news.sina.service';
import { NewsFutunnService } from './news.futunn.service';
import { NewsClsService } from './news.cls.service';
import { NewsBaiduService } from './news.baidu.service';
import { NewsQuery, NewsSource, NewsListQuery } from './types/news.query';

@Controller('news')
@UseInterceptors(TransformInterceptor)
@UseGuards(ApiAuthGuard)
export class NewsController {
  constructor(
    private readonly newsSinaService: NewsSinaService,
    private readonly newsFutunnService: NewsFutunnService,
    private readonly newsClsService: NewsClsService,
    private readonly newsBaiduService: NewsBaiduService,
  ) {}

  @Get('list')
  async getNews(@Query() query: NewsListQuery) {
    if (!query.source) {
      query.source = NewsSource.Sina;
    }

    switch (query.source) {
      case NewsSource.Sina:
        return this.newsSinaService.getNews(query);
      case NewsSource.Futunn:
        return this.newsFutunnService.getNews(query);
      case NewsSource.Cls:
        return this.newsClsService.getNews(query);
      case NewsSource.Baidu:
        return this.newsBaiduService.getNews(query);
      default:
        throw new BadRequestException('不支持该来源');
    }
  }

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
