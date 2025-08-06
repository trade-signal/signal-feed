import { News } from '../entities/news.entity';
import { NewsQuery } from '../types/news.query';

export interface NewsProvider {
  saveData(data: any, ...args: any[]): Promise<News[]>;
  transformData(data: any, ...args: any[]): News[];
  checkExist(): Promise<boolean>;
  fetchAll(): Promise<News[]>;
  getNews(query: NewsQuery): Promise<{ list: News[]; total: number }>;
}
