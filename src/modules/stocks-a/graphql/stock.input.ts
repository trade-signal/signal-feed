import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType({ description: '分页参数' })
export class PaginationInput {
  @Field(() => Int, { description: '页码', defaultValue: 1 })
  page: number;

  @Field(() => Int, { description: '每页数量', defaultValue: 100 })
  pageSize: number;
}

@InputType({ description: '股票筛选参数' })
export class StockFilterInput {
  @Field({ description: '股票代码', nullable: true })
  code?: string;

  @Field({ description: '行业', nullable: true })
  industry?: string;

  @Field({ description: '是否活跃', nullable: true })
  isActive?: boolean;

  @Field({ description: '是否停牌', nullable: true })
  isSuspended?: boolean;
}

@InputType({ description: '行情数据筛选参数' })
export class StockQuotesFilterInput {
  @Field({ description: '股票代码', nullable: true })
  code?: string;

  @Field(() => Date, { description: '开始日期', nullable: true })
  startDate?: Date;

  @Field(() => Date, { description: '结束日期', nullable: true })
  endDate?: Date;

  @Field(() => Float, { description: '最小涨跌幅', nullable: true })
  minChangeRate?: number;

  @Field(() => Float, { description: '最大涨跌幅', nullable: true })
  maxChangeRate?: number;
}
