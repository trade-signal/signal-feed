import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { md5Hash } from 'src/common/utils/encrypt';
import { formatDateE } from 'src/common/utils/date';

import { News } from './entities/news.entity';
import { NewsProvider } from './interfaces/news.interface';
import { NewsQuery } from './types/news.query';
import { BaiduNews } from './providers/baidu/baidu.types';
import { BaiduService } from './providers/baidu/baidu.service';

@Injectable()
export class NewsBaiduService implements NewsProvider {
  private readonly BATCH_SIZE = 1000;

  constructor(
    private readonly baiduService: BaiduService,

    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async saveData(data: News[]): Promise<News[]> {
    const cloneData = [...data];

    while (cloneData.length > 0) {
      const batch = cloneData.splice(0, this.BATCH_SIZE);

      await this.newsRepository.upsert(batch, {
        conflictPaths: ['source', 'sourceId'],
      });
    }

    return data;
  }

  transformData(data: BaiduNews[]): any[] {
    return data.map(item => {
      const {
        title,
        content,
        publish_time,
        third_url,
        tag = '',
        entity = [],
      } = item;

      const tags = tag.split('$').map(item => item.trim());
      const contentText = content.items[0].data;

      return {
        source: 'baidu',
        sourceId: publish_time + '|' + md5Hash(contentText),
        sourceUrl: third_url,
        title: title || '',
        summary: '',
        content: contentText,
        publishDate: new Date(Number(publish_time) * 1e3),
        tags,
        categories: tags,
        stocks: entity?.map(item => {
          const { code, market, name, exchange } = item;
          const isCn = market === 'ab';
          const lowerExchange = exchange.toLowerCase();

          return {
            market: isCn ? 'cn' : market,
            code: `${lowerExchange}${isCn ? '' : '_'}${code}`,
            name,
          };
        }),
      };
    });
  }

  async checkExist(): Promise<boolean> {
    const total = await this.newsRepository.count({
      where: { source: 'baidu' },
    });
    return total > 0;
  }

  async fetchAll(): Promise<News[]> {
    const list = await this.baiduService.getNews();

    const results = this.transformData(list);

    await this.saveData(results);

    return results;
  }

  async getNews(query: NewsQuery): Promise<{ list: any[]; total: number }> {
    const { page, pageSize } = query;

    const where: FindManyOptions<News> = {
      where: { source: 'baidu' },
      order: { publishDate: 'DESC', sourceId: 'DESC' },
    };

    if (page && pageSize) {
      where.skip = (page - 1) * pageSize;
      where.take = pageSize;
    }

    const [list, total] = await this.newsRepository.findAndCount(where);

    return {
      list: list.map(item => ({
        ...item,
        publishDate: formatDateE(item.publishDate),
      })),
      total,
    };
  }
}
