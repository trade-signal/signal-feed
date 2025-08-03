import { News } from '../entities/news.entity';
import { NewsQuery } from '../types/news.query';

export interface NewsProvider {
  getNews(query: NewsQuery): Promise<News[]>;
  transformNews(data: any, ...args: any[]): News[];
}
