import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { formatDateE } from 'src/common/utils/date';

import { News } from './entities/news.entity';
import { NewsProvider } from './interfaces/news.interface';
import { NewsQuery } from './types/news.query';
import { FutunnNews } from './providers/futunn/futunn.types';
import { FutunnService } from './providers/futunn/futunn.service';

@Injectable()
export class NewsFutunnService implements NewsProvider {
  private readonly BATCH_SIZE = 1000;

  private readonly cnCodes = ['sz', 'sh', 'bj'];

  constructor(
    private readonly futunnService: FutunnService,

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

  private isCn(code: string) {
    return this.cnCodes.some(key => code.endsWith(key));
  }

  private formatCode(code: string) {
    const isCn = this.isCn(code.toLocaleLowerCase());

    return {
      code: code
        .split('.')
        .reverse()
        .join(isCn ? '' : '_')
        .toLocaleLowerCase(),
      isCn,
    };
  }

  transformData(data: FutunnNews[]): any[] {
    return data.map(item => {
      const { id, title, content, time, detailUrl, quote } = item;

      return {
        source: 'futunn',
        sourceId: id,
        sourceUrl: detailUrl,
        title,
        summary: '',
        content,
        publishDate: new Date(Number(time) * 1e3),
        tags: [],
        categories: [],
        stocks: quote.map(item => {
          const { code, isCn } = this.formatCode(item.code);
          const market = isCn ? 'cn' : item.stockMarket;

          return {
            market,
            code,
            name: item.name,
          };
        }),
      };
    });
  }

  async checkExist(): Promise<boolean> {
    const total = await this.newsRepository.count({
      where: { source: 'futunn' },
    });

    return total > 0;
  }

  async fetchAll(): Promise<News[]> {
    const list = await this.futunnService.getNews();

    const results = this.transformData(list);

    await this.saveData(results);

    return results;
  }

  async getNews(query: NewsQuery): Promise<{ list: any[]; total: number }> {
    const { page, pageSize } = query;

    const where: FindManyOptions<News> = {
      where: { source: 'futunn' },
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
