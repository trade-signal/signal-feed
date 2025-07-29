import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType({ description: '股票基本信息' })
export class Stock {
  @Field({ description: '股票名称' })
  name: string;

  @Field({ description: '股票代码' })
  code: string;

  @Field({ description: '所属行业' })
  industry: string;

  @Field(() => Date, { nullable: true, description: '上市日期' })
  listingDate?: Date;

  @Field({ description: '是否活跃' })
  isActive: boolean;

  @Field({ description: '是否停牌' })
  isSuspended: boolean;
}

@ObjectType({ description: '股票行情数据' })
export class StockQuotes {
  @Field(() => Date, { description: '交易日期' })
  date: Date;

  @Field({ description: '股票代码' })
  code: string;

  @Field({ description: '股票名称' })
  name: string;

  @Field(() => Float, { description: '最新价' })
  newPrice: number;

  @Field(() => Float, { description: '涨跌幅(%)' })
  changeRate: number;

  @Field(() => Float, { description: '涨跌额' })
  upsDowns: number;

  @Field(() => Float, { description: '成交量' })
  volume: number;

  @Field(() => Float, { description: '成交额' })
  dealAmount: number;

  @Field(() => Float, { description: '振幅(%)' })
  amplitude: number;

  @Field(() => Float, { description: '换手率(%)' })
  turnoverRate: number;

  @Field(() => Float, { description: '量比' })
  volumeRatio: number;

  @Field(() => Float, { description: '开盘价' })
  openPrice: number;

  @Field(() => Float, { description: '最高价' })
  highPrice: number;

  @Field(() => Float, { description: '最低价' })
  lowPrice: number;

  @Field(() => Float, { description: '昨收价' })
  preClosePrice: number;

  @Field(() => Float, { description: '涨速' })
  speedIncrease: number;

  @Field(() => Float, { description: '5分钟涨跌' })
  speedIncrease5: number;

  @Field(() => Float, { description: '60日涨跌幅(%)' })
  speedIncrease60: number;

  @Field(() => Float, { description: '年初至今涨跌幅(%)' })
  speedIncreaseAll: number;

  @Field(() => Float, { description: '动态市盈率' })
  dtsyl: number;

  @Field(() => Float, { description: '市盈率TTM' })
  pe: number;

  @Field(() => Float, { description: '每股收益' })
  basicEps: number;

  @Field(() => Float, { description: '每股净资产' })
  bvps: number;

  @Field(() => Float, { description: '每股公积金' })
  perCapitalReserve: number;

  @Field(() => Float, { description: '每股未分配利润' })
  perUnassignProfit: number;

  @Field(() => Float, { description: '加权净资产收益率(%)' })
  roeWeight: number;

  @Field(() => Float, { description: '毛利率(%)' })
  debtAssetRatio: number;

  @Field(() => Float, { description: '营业总收入' })
  totalOperateIncome: number;

  @Field(() => Float, { description: '营业收入同比增长(%)' })
  toiYoyRatio: number;

  @Field(() => Float, { description: '归属净利润' })
  parentNetprofit: number;

  @Field(() => Float, { description: '归属净利润同比增长(%)' })
  netprofitYoyRatio: number;

  @Field(() => Float, { description: '总股本' })
  totalShares: number;

  @Field(() => Float, { description: '已流通股份' })
  freeShares: number;

  @Field(() => Float, { description: '总市值' })
  totalMarketCap: number;

  @Field(() => Float, { nullable: true, description: '流通市值' })
  freeMarketCap?: number;
}

@ObjectType()
export class StockScreener {
  @Field(() => Date)
  date: Date;

  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  secucode: string;

  @Field(() => Float)
  newPrice: number;

  @Field(() => Float)
  changeRate: number;

  @Field(() => Float)
  volumeRatio: number;

  @Field(() => Float)
  highPrice: number;

  @Field(() => Float)
  lowPrice: number;

  @Field(() => Float)
  preClosePrice: number;

  @Field(() => Float)
  volume: number;

  @Field(() => Float)
  dealAmount: number;

  @Field(() => Float)
  turnoverRate: number;

  @Field(() => Float)
  amplitude: number;

  @Field(() => Date)
  listingDate: Date;

  @Field()
  industry: string;

  @Field()
  area: string;

  @Field()
  concept: string;

  @Field()
  style: string;

  @Field()
  isHs300: boolean;

  @Field()
  isSz50: boolean;

  @Field()
  isZz500: boolean;

  @Field()
  isZz1000: boolean;

  @Field()
  isCy50: boolean;

  @Field(() => Float)
  pe9: number;

  @Field(() => Float)
  pbnewmrq: number;

  @Field(() => Float)
  pettmdeducted: number;

  @Field(() => Float)
  pcfjyxjl9: number;

  @Field(() => Float)
  ps9: number;

  @Field(() => Float)
  predictPeSyear: number;

  @Field(() => Float)
  predictPeNyear: number;

  @Field(() => Float)
  totalMarketCap: number;

  @Field(() => Float)
  freeCap: number;

  @Field(() => Float)
  dtsyl: number;

  @Field(() => Float)
  ycpeg: number;

  @Field(() => Float)
  enterpriseValueMultiple: number;

  @Field(() => Float)
  basicEps: number;

  @Field(() => Float)
  bvps: number;

  @Field(() => Float)
  perNetcashOperate: number;

  @Field(() => Float)
  perFcfe: number;

  @Field(() => Float)
  perCapitalReserve: number;

  @Field(() => Float)
  perUnassignProfit: number;

  @Field(() => Float)
  perSurplusReserve: number;

  @Field(() => Float)
  perRetainedEarning: number;

  @Field(() => Float)
  parentNetprofit: number;

  @Field(() => Float)
  deductNetprofit: number;

  @Field(() => Float)
  totalOperateIncome: number;

  @Field(() => Float)
  roeWeight: number;

  @Field(() => Float)
  jroa: number;

  @Field(() => Float)
  roic: number;

  @Field(() => Float)
  zxgxl: number;

  @Field(() => Float)
  saleGpr: number;

  @Field(() => Float)
  saleNpr: number;

  @Field(() => Float)
  netprofitYoyRatio: number;

  @Field(() => Float)
  deductNetprofitGrowthrate: number;

  @Field(() => Float)
  toiYoyRatio: number;

  @Field(() => Float)
  netprofitGrowthrate3y: number;

  @Field(() => Float)
  incomeGrowthrate3y: number;

  @Field(() => Float)
  predictNetprofitRatio: number;

  @Field(() => Float)
  predictIncomeRatio: number;

  @Field(() => Float)
  basicepsYoyRatio: number;

  @Field(() => Float)
  totalProfitGrowthrate: number;

  @Field(() => Float)
  operateProfitGrowthrate: number;

  @Field(() => Float)
  debtAssetRatio: number;

  @Field(() => Float)
  equityRatio: number;

  @Field(() => Float)
  equityMultiplier: number;

  @Field(() => Float)
  currentRatio: number;

  @Field(() => Float)
  speedRatio: number;

  @Field(() => Float)
  totalShares: number;

  @Field(() => Float)
  freeShares: number;

  @Field(() => Float)
  avgHoldNum: number;

  @Field(() => Int)
  holderNewest: number;

  @Field(() => Float)
  holderRatio: number;

  @Field(() => Float)
  holdAmount: number;

  @Field(() => Float)
  holdnumGrowthrate3q: number;

  @Field(() => Float)
  holdnumGrowthrateHy: number;

  @Field(() => Float)
  holdRatioCount: number;

  @Field(() => Float)
  freeHoldRatio: number;

  @Field()
  macdGoldenFork: boolean;

  @Field()
  macdGoldenForkz: boolean;

  @Field()
  macdGoldenForky: boolean;

  @Field()
  kdjGoldenFork: boolean;

  @Field()
  kdjGoldenForkz: boolean;

  @Field()
  kdjGoldenForky: boolean;

  @Field()
  breakThrough: boolean;

  @Field()
  lowFundsInflow: boolean;

  @Field()
  highFundsOutflow: boolean;

  @Field()
  breakupMa5days: boolean;

  @Field()
  breakupMa10days: boolean;

  @Field()
  breakupMa20days: boolean;

  @Field()
  breakupMa30days: boolean;

  @Field()
  breakupMa60days: boolean;

  @Field()
  longAvgArray: boolean;

  @Field()
  shortAvgArray: boolean;

  @Field()
  upperLargeVolume: boolean;

  @Field()
  downNarrowVolume: boolean;

  @Field()
  oneDayangLine: boolean;

  @Field()
  twoDayangLines: boolean;

  @Field()
  riseSun: boolean;

  @Field()
  powerFulgun: boolean;

  @Field()
  restoreJustice: boolean;

  @Field()
  down7days: boolean;

  @Field()
  upper8days: boolean;

  @Field()
  upper9days: boolean;

  @Field()
  upper4days: boolean;

  @Field()
  heavenRule: boolean;

  @Field()
  upsideVolume: boolean;

  @Field(() => Int)
  allcorpNum: number;

  @Field(() => Int)
  allcorpFundNum: number;

  @Field(() => Int)
  allcorpQsNum: number;

  @Field(() => Int)
  allcorpQfiiNum: number;

  @Field(() => Int)
  allcorpBxNum: number;

  @Field(() => Int)
  allcorpSbNum: number;

  @Field(() => Int)
  allcorpXtNum: number;

  @Field(() => Float)
  allcorpRatio: number;

  @Field(() => Float)
  allcorpFundRatio: number;

  @Field(() => Float)
  allcorpQsRatio: number;

  @Field(() => Float)
  allcorpQfiiRatio: number;

  @Field(() => Float)
  allcorpBxRatio: number;

  @Field(() => Float)
  allcorpSbRatio: number;

  @Field(() => Float)
  allcorpXtRatio: number;

  @Field(() => Float)
  netInflow: number;

  @Field(() => Float)
  netinflow3days: number;

  @Field(() => Float)
  netinflow5days: number;

  @Field(() => Float)
  nowinterstRatio: number;

  @Field(() => Float)
  nowinterstRatio3d: number;

  @Field(() => Float)
  nowinterstRatio5d: number;

  @Field(() => Float)
  ddx: number;

  @Field(() => Float)
  ddx3d: number;

  @Field(() => Float)
  ddx5d: number;

  @Field(() => Int)
  ddxRed10d: number;

  @Field(() => Float)
  changerate3days: number;

  @Field(() => Float)
  changerate5days: number;

  @Field(() => Float)
  changerate10days: number;

  @Field(() => Float)
  changerateTy: number;

  @Field(() => Int)
  upnday: number;

  @Field(() => Int)
  downnday: number;

  @Field(() => Float)
  mutualNetbuyAmt: number;

  @Field(() => Float)
  holdRatio: number;
}

@ObjectType({ description: '分页股票数据' })
export class PaginatedStocks {
  @Field(() => [Stock], { description: '股票列表' })
  list: Stock[];

  @Field(() => Int, { description: '总数量' })
  total: number;

  @Field(() => Int, { description: '当前页码' })
  page: number;

  @Field(() => Int, { description: '每页数量' })
  pageSize: number;
}

@ObjectType({ description: '分页股票行情数据' })
export class PaginatedStockQuotes {
  @Field(() => [StockQuotes], { description: '行情数据列表' })
  list: StockQuotes[];

  @Field(() => Int, { description: '总数量' })
  total: number;

  @Field({ description: '交易日期' })
  date: string;

  @Field(() => Int, { description: '当前页码' })
  page: number;

  @Field(() => Int, { description: '每页数量' })
  pageSize: number;
}

@ObjectType({ description: '分页股票筛选数据' })
export class PaginatedStockScreener {
  @Field(() => [StockScreener], { description: '筛选数据列表' })
  list: StockScreener[];

  @Field(() => Int, { description: '总数量' })
  total: number;

  @Field({ description: '交易日期' })
  date: string;

  @Field(() => Int, { description: '当前页码' })
  page: number;

  @Field(() => Int, { description: '每页数量' })
  pageSize: number;
}
