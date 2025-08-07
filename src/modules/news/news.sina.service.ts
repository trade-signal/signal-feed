import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { News } from './entities/news.entity';
import { NewsProvider } from './interfaces/news.interface';
import { NewsQuery } from './types/news.query';
import { SinaNews, SinaNewsExt } from './providers/sina/sina.types';
import { SinaService } from './providers/sina/sina.service';

@Injectable()
export class NewsSinaService implements NewsProvider {
  private readonly BATCH_SIZE = 1000;

  constructor(
    private readonly sinaService: SinaService,

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

  transformData(data: SinaNews[]): any[] {
    return data.map(item => {
      const { id, rich_text, create_time, tag, ext } = item;
      const { stocks: stockList, docurl } = JSON.parse(
        ext || '{}',
      ) as SinaNewsExt;

      const tags = tag?.map(t => t.name) || [];

      return {
        source: 'sina',
        sourceId: String(id),
        sourceUrl: docurl || '',
        title: rich_text?.slice(0, 100) || '',
        summary: rich_text?.slice(0, 200) || '',
        content: rich_text || '',
        date: new Date(create_time),
        tags,
        categories: tags,
        stocks:
          stockList?.map(s => ({
            market: s.market,
            code: s.symbol,
            name: s.key,
          })) || [],
      };
    });
  }

  async checkExist(): Promise<boolean> {
    const total = await this.newsRepository.count({
      where: { source: 'sina' },
    });

    return total > 0;
  }

  async fetchAll(): Promise<News[]> {
    const list = await this.sinaService.getNews();

    const results = this.transformData(list);

    await this.saveData(results);

    return results;
  }

  async getNews(query: NewsQuery): Promise<{ list: News[]; total: number }> {
    const { page, pageSize } = query;

    const where: FindManyOptions<News> = {
      where: { source: 'sina' },
    };

    if (page && pageSize) {
      where.skip = (page - 1) * pageSize;
      where.take = pageSize;
    }

    const [list, total] = await this.newsRepository.findAndCount(where);

    return {
      list,
      total,
    };
  }
}
