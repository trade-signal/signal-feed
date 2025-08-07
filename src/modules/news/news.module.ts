import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TypeOrmModule } from '@nestjs/typeorm';

import { News } from './entities/news.entity';
import { BaiduService } from './providers/baidu/baidu.service';
import { SinaService } from './providers/sina/sina.service';
import { FutunnService } from './providers/futunn/futunn.service';
import { ClsService } from './providers/cls/cls.service';

import { NewsController } from './news.controller';
import { NewsBaiduService } from './news.baidu.service';
import { NewsClsService } from './news.cls.service';
import { NewsFutunnService } from './news.futunn.service';
import { NewsSinaService } from './news.sina.service';

@Module({
  imports: [TypeOrmModule.forFeature([News]), HttpModule],
  controllers: [NewsController],
  providers: [
    BaiduService,
    SinaService,
    FutunnService,
    ClsService,
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
