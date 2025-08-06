import { Module } from '@nestjs/common';

import { NewsController } from './news.controller';
import { NewsBaiduService } from './news.baidu.service';
import { NewsClsService } from './news.cls.service';
import { NewsFutunnService } from './news.futunn.service';
import { NewsSinaService } from './news.sina.service';

@Module({
  imports: [],
  controllers: [NewsController],
  providers: [
    NewsBaiduService,
    NewsClsService,
    NewsFutunnService,
    NewsSinaService,
  ],
  exports: [
    NewsBaiduService,
    NewsClsService,
    NewsFutunnService,
    NewsSinaService,
  ],
})
export class NewsModule {}
