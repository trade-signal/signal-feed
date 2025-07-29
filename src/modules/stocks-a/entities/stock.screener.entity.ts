import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(['code', 'date'], { unique: true })
@Index(['date'])
@Index(['code'])
@Index(['industry'], { fulltext: true })
@Index(['area'], { fulltext: true })
@Index(['concept'], { fulltext: true })
@Index(['style'], { fulltext: true })
export class AStockScreener {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '主键ID',
  })
  id: number;

  // 基本信息
  @Column({
    type: 'date',
    comment: '交易日期',
  })
  date: Date;
  @Column({
    type: 'varchar',
    comment: '股票代码',
  })
  code: string;
  @Column({
    type: 'varchar',
    comment: '股票名称',
  })
  name: string;
  @Column({
    type: 'varchar',
    comment: '股票代码',
  })
  secucode: string;

  // 交易数据
  @Column({
    type: 'float',
    comment: '最新价',
  })
  newPrice: number;
  @Column({
    type: 'float',
    comment: '涨跌幅',
  })
  changeRate: number;
  @Column({
    type: 'float',
    comment: '量比',
  })
  volumeRatio: number;
  @Column({
    type: 'float',
    comment: '最高价',
  })
  highPrice: number;
  @Column({
    type: 'float',
    comment: '最低价',
  })
  lowPrice: number;
  @Column({
    type: 'float',
    comment: '昨收价',
  })
  preClosePrice: number;
  @Column({
    type: 'float',
    comment: '成交量',
  })
  volume: number;
  @Column({
    type: 'float',
    comment: '成交额',
  })
  dealAmount: number;
  @Column({
    type: 'float',
    comment: '换手率',
  })
  turnoverRate: number;
  @Column({
    type: 'float',
    comment: '振幅',
  })
  amplitude: number;

  // 公司信息
  @Column({
    type: 'date',
    comment: '上市日期',
  })
  listingDate: Date;
  @Column({
    type: 'varchar',
    comment: '行业',
  })
  industry: string;
  @Column({
    type: 'varchar',
    comment: '地区',
  })
  area: string;
  @Column({
    type: 'varchar',
    comment: '概念',
  })
  concept: string;
  @Column({
    type: 'varchar',
    comment: '风格',
  })
  style: string;

  // 指数成分
  @Column({
    type: 'boolean',
    comment: '沪深300',
  })
  isHs300: boolean;
  @Column({
    type: 'boolean',
    comment: '上证50',
  })
  isSz50: boolean;
  @Column({
    type: 'boolean',
    comment: '中证500',
  })
  isZz500: boolean;
  @Column({
    type: 'boolean',
    comment: '中证1000',
  })
  isZz1000: boolean;
  @Column({
    type: 'boolean',
    comment: '创业板50',
  })
  isCy50: boolean;

  // 估值指标
  @Column({
    type: 'float',
    comment: '市盈率TTM',
  })
  pe9: number;
  @Column({
    type: 'float',
    comment: '市净率MRQ',
  })
  pbnewmrq: number;
  @Column({
    type: 'float',
    comment: '市盈率TTM扣非',
  })
  pettmdeducted: number;
  @Column({
    type: 'float',
    comment: '市现率TTM',
  })
  pcfjyxjl9: number;
  @Column({
    type: 'float',
    comment: '预测市盈率今年',
  })
  predictPeSyear: number;
  @Column({
    type: 'float',
    comment: '预测市盈率明年',
  })
  predictPeNyear: number;
  @Column({
    type: 'float',
    comment: '总市值',
  })
  totalMarketCap: number;
  @Column({
    type: 'float',
    comment: '流通市值',
  })
  freeCap: number;
  @Column({
    type: 'float',
    comment: '动态市盈率',
  })
  dtsyl: number;
  @Column({
    type: 'float',
    comment: '预测PEG',
  })
  ycpeg: number;
  @Column({
    type: 'float',
    comment: '企业价值倍数',
  })
  enterpriseValueMultiple: number;

  // 每股指标
  @Column({
    type: 'float',
    comment: '每股收益',
  })
  basicEps: number;
  @Column({
    type: 'float',
    comment: '每股净资产',
  })
  bvps: number;
  @Column({
    type: 'float',
    comment: '每股经营现金流',
  })
  perNetcashOperate: number;
  @Column({
    type: 'float',
    comment: '每股自由现金流',
  })
  perFcfe: number;
  @Column({
    type: 'float',
    comment: '每股资本公积',
  })
  perCapitalReserve: number;
  @Column({
    type: 'float',
    comment: '每股未分配利润',
  })
  perUnassignProfit: number;
  @Column({
    type: 'float',
    comment: '每股盈余公积',
  })
  perSurplusReserve: number;
  @Column({
    type: 'float',
    comment: '每股留存收益',
  })
  perRetainedEarning: number;

  // 财务指标
  @Column({
    type: 'float',
    comment: '归属净利润',
  })
  parentNetprofit: number;
  @Column({
    type: 'float',
    comment: '扣非净利润',
  })
  deductNetprofit: number;
  @Column({
    type: 'float',
    comment: '营业总收入',
  })
  totalOperateIncome: number;
  @Column({
    type: 'float',
    comment: '净资产收益率ROE',
  })
  roeWeight: number;
  @Column({
    type: 'float',
    comment: '总资产净利率ROA',
  })
  jroa: number;
  @Column({
    type: 'float',
    comment: '投入资本回报率ROIC',
  })
  roic: number;
  @Column({
    type: 'float',
    comment: '最新股息率',
  })
  zxgxl: number;
  @Column({
    type: 'float',
    comment: '毛利率',
  })
  saleGpr: number;
  @Column({
    type: 'float',
    comment: '净利率',
  })
  saleNpr: number;

  // 增长指标
  @Column({
    type: 'float',
    comment: '净利润增长率',
  })
  netprofitYoyRatio: number;
  @Column({
    type: 'float',
    comment: '扣非净利润增长率',
  })
  deductNetprofitGrowthrate: number;
  @Column({
    type: 'float',
    comment: '营收增长率',
  })
  toiYoyRatio: number;
  @Column({
    type: 'float',
    comment: '净利润3年复合增长率',
  })
  netprofitGrowthrate3y: number;
  @Column({
    type: 'float',
    comment: '营收3年复合增长率',
  })
  incomeGrowthrate3y: number;
  @Column({
    type: 'float',
    comment: '预测净利润同比增长',
  })
  predictNetprofitRatio: number;
  @Column({
    type: 'float',
    comment: '预测营收同比增长',
  })
  predictIncomeRatio: number;
  @Column({
    type: 'float',
    comment: '每股收益同比增长率',
  })
  basicepsYoyRatio: number;
  @Column({
    type: 'float',
    comment: '利润总额同比增长率',
  })
  totalProfitGrowthrate: number;
  @Column({
    type: 'float',
    comment: '营业利润同比增长率',
  })
  operateProfitGrowthrate: number;

  // 资产负债指标
  @Column({
    type: 'float',
    comment: '资产负债率',
  })
  debtAssetRatio: number;
  @Column({
    type: 'float',
    comment: '产权比率',
  })
  equityRatio: number;
  @Column({
    type: 'float',
    comment: '权益乘数',
  })
  equityMultiplier: number;
  @Column({
    type: 'float',
    comment: '流动比率',
  })
  currentRatio: number;
  @Column({
    type: 'float',
    comment: '速动比率',
  })
  speedRatio: number;

  // 股本结构
  @Column({
    type: 'float',
    comment: '总股本',
  })
  totalShares: number;
  @Column({
    type: 'float',
    comment: '流通股本',
  })
  freeShares: number;
  @Column({
    type: 'int',
    comment: '最新股东户数',
  })
  holderNewest: number;
  @Column({
    type: 'float',
    comment: '股东户数增长率',
  })
  holderRatio: number;
  @Column({
    type: 'float',
    comment: '户均持股金额',
  })
  holdAmount: number;
  @Column({
    type: 'float',
    comment: '户均持股数季度增长率',
  })
  holdnumGrowthrate3q: number;
  @Column({
    type: 'float',
    comment: '户均持股数半年增长率',
  })
  holdnumGrowthrateHy: number;
  @Column({
    type: 'float',
    comment: '十大股东持股比例合计',
  })
  holdRatioCount: number;
  @Column({
    type: 'float',
    comment: '十大流通股东比例合计',
  })
  freeHoldRatio: number;

  // 技术指标
  @Column({
    type: 'boolean',
    comment: 'MACD金叉日线',
  })
  macdGoldenFork: boolean;
  @Column({
    type: 'boolean',
    comment: 'MACD金叉周线',
  })
  macdGoldenForkz: boolean;
  @Column({
    type: 'boolean',
    comment: 'MACD金叉月线',
  })
  macdGoldenForky: boolean;
  @Column({
    type: 'boolean',
    comment: 'KDJ金叉日线',
  })
  kdjGoldenFork: boolean;
  @Column({
    type: 'boolean',
    comment: 'KDJ金叉周线',
  })
  kdjGoldenForkz: boolean;
  @Column({
    type: 'boolean',
    comment: 'KDJ金叉月线',
  })
  kdjGoldenForky: boolean;
  @Column({
    type: 'boolean',
    comment: '放量突破',
  })
  breakThrough: boolean;
  @Column({
    type: 'boolean',
    comment: '低位资金净流入',
  })
  lowFundsInflow: boolean;
  @Column({
    type: 'boolean',
    comment: '高位资金净流出',
  })
  highFundsOutflow: boolean;

  // 均线指标
  @Column({
    type: 'boolean',
    comment: '向上突破均线5日',
  })
  breakupMa5days: boolean;
  @Column({
    type: 'boolean',
    comment: '向上突破均线10日',
  })
  breakupMa10days: boolean;
  @Column({
    type: 'boolean',
    comment: '向上突破均线20日',
  })
  breakupMa20days: boolean;
  @Column({
    type: 'boolean',
    comment: '向上突破均线30日',
  })
  breakupMa30days: boolean;
  @Column({
    type: 'boolean',
    comment: '向上突破均线60日',
  })
  breakupMa60days: boolean;
  @Column({
    type: 'boolean',
    comment: '均线多头排列',
  })
  longAvgArray: boolean;
  @Column({
    type: 'boolean',
    comment: '均线空头排列',
  })
  shortAvgArray: boolean;

  // K线形态
  @Column({
    type: 'boolean',
    comment: '连涨放量',
  })
  upperLargeVolume: boolean;
  @Column({
    type: 'boolean',
    comment: '下跌无量',
  })
  downNarrowVolume: boolean;
  @Column({
    type: 'boolean',
    comment: '一根大阳线',
  })
  oneDayangLine: boolean;
  @Column({
    type: 'boolean',
    comment: '两根大阳线',
  })
  twoDayangLines: boolean;
  @Column({
    type: 'boolean',
    comment: '旭日东升',
  })
  riseSun: boolean;
  @Column({
    type: 'boolean',
    comment: '强势多方炮',
  })
  powerFulgun: boolean;
  @Column({
    type: 'boolean',
    comment: '拨云见日',
  })
  restoreJustice: boolean;
  @Column({
    type: 'boolean',
    comment: '七仙女下凡',
  })
  down7days: boolean;
  @Column({
    type: 'boolean',
    comment: '八仙过海',
  })
  upper8days: boolean;
  @Column({
    type: 'boolean',
    comment: '九阳神功',
  })
  upper9days: boolean;
  @Column({
    type: 'boolean',
    comment: '四串阳',
  })
  upper4days: boolean;
  @Column({
    type: 'boolean',
    comment: '天量法则',
  })
  heavenRule: boolean;
  @Column({
    type: 'boolean',
    comment: '放量上攻',
  })
  upsideVolume: boolean;

  // 股东机构
  @Column({
    type: 'int',
    comment: '机构持股家数合计',
  })
  allcorpNum: number;
  @Column({
    type: 'int',
    comment: '基金持股家数',
  })
  @Column({
    type: 'int',
    comment: '券商持股家数',
  })
  allcorpQsNum: number;
  @Column({
    type: 'int',
    comment: 'QFII持股家数',
  })
  allcorpQfiiNum: number;
  @Column({
    type: 'int',
    comment: '保险公司持股家数',
  })
  allcorpBxNum: number;
  @Column({
    type: 'int',
    comment: '社保持股家数',
  })
  allcorpSbNum: number;
  @Column({
    type: 'int',
    comment: '信托公司持股家数',
  })
  allcorpXtNum: number;
  @Column({
    type: 'float',
    comment: '机构持股比例合计',
  })
  allcorpRatio: number;
  @Column({
    type: 'float',
    comment: '基金持股比例',
  })
  allcorpFundRatio: number;
  @Column({
    type: 'float',
    comment: '券商持股比例',
  })
  allcorpQsRatio: number;
  @Column({
    type: 'float',
    comment: 'QFII持股比例',
  })
  allcorpQfiiRatio: number;
  @Column({
    type: 'float',
    comment: '保险公司持股比例',
  })
  allcorpBxRatio: number;
  @Column({
    type: 'float',
    comment: '社保持股比例',
  })
  allcorpSbRatio: number;
  @Column({
    type: 'float',
    comment: '信托公司持股比例',
  })
  allcorpXtRatio: number;

  // 资金流向
  @Column({
    type: 'float',
    comment: '当日净流入额',
  })
  netInflow: number;
  @Column({
    type: 'float',
    comment: '3日主力净流入',
  })
  netinflow3days: number;
  @Column({
    type: 'float',
    comment: '5日主力净流入',
  })
  netinflow5days: number;
  @Column({
    type: 'float',
    comment: '当日增仓占比',
  })
  nowinterstRatio: number;
  @Column({
    type: 'float',
    comment: '3日增仓占比',
  })
  nowinterstRatio3d: number;
  @Column({
    type: 'float',
    comment: '5日增仓占比',
  })
  nowinterstRatio5d: number;
  @Column({
    type: 'float',
    comment: '当日DDX',
  })
  ddx: number;
  @Column({
    type: 'float',
    comment: '3日DDX',
  })
  ddx3d: number;
  @Column({
    type: 'float',
    comment: '5日DDX',
  })
  ddx5d: number;
  @Column({
    type: 'int',
    comment: '10日内DDX飘红天数',
  })
  ddxRed10d: number;

  // 涨跌幅数据
  @Column({
    type: 'float',
    comment: '3日涨跌幅',
  })
  changerate3days: number;
  @Column({
    type: 'float',
    comment: '5日涨跌幅',
  })
  changerate5days: number;
  @Column({
    type: 'float',
    comment: '10日涨跌幅',
  })
  changerate10days: number;
  @Column({
    type: 'float',
    comment: '今年以来涨跌幅',
  })
  changerateTy: number;
  @Column({
    type: 'int',
    comment: '连涨天数',
  })
  upnday: number;
  @Column({
    type: 'int',
    comment: '连跌天数',
  })
  downnday: number;

  // 港股通数据
  @Column({
    type: 'float',
    comment: '沪深股通净买入金额',
  })
  mutualNetbuyAmt: number;
  @Column({
    type: 'float',
    comment: '沪深股通持股比例',
  })
  holdRatio: number;

  // 系统字段
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
  })
  updatedAt: Date;
}
