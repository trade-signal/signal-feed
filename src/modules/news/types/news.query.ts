export enum NewsSource {
  Sina = 'sina',
  Futunn = 'futunn',
  Cls = 'cls',
  Baidu = 'baidu',
}

export interface NewsQuery {
  page?: number;
  pageSize?: number;
}

export interface NewsListQuery extends NewsQuery {
  source: NewsSource;
}
