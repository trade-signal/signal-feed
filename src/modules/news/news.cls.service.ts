import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { News } from './entities/news.entity';
import { NewsProvider } from './interfaces/news.interface';
import { NewsQuery } from './types/news.query';
import { ClsNews } from './providers/cls/cls.types';
import { ClsService } from './providers/cls/cls.service';

@Injectable()
export class NewsClsService implements NewsProvider {
  private readonly BATCH_SIZE = 1000;

  constructor(
    private readonly clsService: ClsService,

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

  transformData(data: ClsNews[], category: string): any[] {
    return data.map(item => {
      const {
        id,
        content,
        shareurl,
        title,
        brief,
        ctime,
        subjects,
        stock_list,
      } = item;

      return {
        source: 'cls',
        sourceId: String(id),
        sourceUrl: shareurl,
        title: title,
        summary: brief,
        content: content,
        date: new Date(ctime * 1e3),
        // hack: use subject_name as tags
        tags: subjects?.map(item => item.subject_name) || [],
        categories: [category],
        stocks:
          stock_list?.map(item => ({
            market: '',
            code: item.StockID,
            name: item.name,
          })) || [],
      };
    });
  }

  async checkExist(): Promise<boolean> {
    const total = await this.newsRepository.count({
      where: { source: 'cls' },
    });

    return total > 0;
  }

  async fetchAll(): Promise<News[]> {
    const list = await this.clsService.getNews();

    const results = this.transformData(list, 'cls');

    await this.saveData(results);

    return results;
  }

  async getNews(query: NewsQuery): Promise<{ list: News[]; total: number }> {
    const { page, pageSize } = query;

    const where: FindManyOptions<News> = {
      where: { source: 'cls' },
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
