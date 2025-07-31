export type SortOrder = 'asc' | 'desc';

export interface BaseQuery {
  page?: number;
  pageSize?: number;
  getAll?: boolean;
  industry?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  fields?: string[];
}

export interface StockQuery extends BaseQuery {}

export interface StockQuotesQuery extends BaseQuery {}

export interface StockScreenerQuery extends BaseQuery {}
