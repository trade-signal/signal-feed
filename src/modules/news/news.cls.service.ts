import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { formatDateE } from 'src/common/utils/date';

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

  uniqueData(data: News[]): News[] {
    const seen = new Set<string>();
    const uniqueData: News[] = [];
    for (const item of data) {
      const key = `${item.source}:${item.sourceId}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueData.push(item);
      }
    }
    return uniqueData;
  }

  async saveData(data: News[]): Promise<News[]> {
    const cloneData = this.uniqueData(data);

    while (cloneData.length > 0) {
      const batch = cloneData.splice(0, this.BATCH_SIZE);

      await this.newsRepository.upsert(batch, {
        conflictPaths: ['source', 'sourceId'],
      });
    }

    return cloneData;
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
        publishDate: new Date(ctime * 1e3),
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

    const uniqueResults = await this.saveData(results);

    return uniqueResults;
  }

  async getNews(query: NewsQuery): Promise<{
    list: any[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const { page = 1, pageSize = 20 } = query;

    const where: FindManyOptions<News> = {
      where: { source: 'cls' },
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
      page,
      pageSize,
    };
  }
}
