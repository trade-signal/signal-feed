export type SortOrder = 'asc' | 'desc';

export interface BaseQuery {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  fields?: string[];
}

export interface StockQuery extends BaseQuery {}

export interface StockQuotesQuery extends BaseQuery {
  date?: string;
  industry?: string;
}

export interface StockScreenerQuery extends BaseQuery {
  date?: string;
  industry?: string;
}
