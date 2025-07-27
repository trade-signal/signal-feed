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
export class AStockQuotes {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '主键ID',
  })
  id: number;

  // 基本信息
  @Column({
    type: 'varchar',
    comment: '交易日期',
  })
  date: string;
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

  // 价格相关
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
    comment: '涨跌额',
  })
  upsDowns: number;

  // 交易指标
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
    comment: '振幅',
  })
  amplitude: number;
  @Column({
    type: 'float',
    comment: '换手率',
  })
  turnoverRate: number;
  @Column({
    type: 'float',
    comment: '量比',
  })
  volumeRatio: number;
  @Column({
    type: 'float',
    comment: '今开',
  })
  openPrice: number;
  @Column({
    type: 'float',
    comment: '最高',
  })
  highPrice: number;
  @Column({
    type: 'float',
    comment: '最低',
  })
  lowPrice: number;
  @Column({
    type: 'float',
    comment: '昨收',
  })
  preClosePrice: number;

  // 涨跌速度指标
  @Column({
    type: 'float',
    comment: '涨速',
  })
  speedIncrease: number;
  @Column({
    type: 'float',
    comment: '5分钟涨跌',
  })
  speedIncrease5: number;
  @Column({
    type: 'float',
    comment: '60日涨跌幅',
  })
  speedIncrease60: number;
  @Column({
    type: 'float',
    comment: '年初至今涨跌幅',
  })
  speedIncreaseAll: number;

  // 估值指标
  @Column({
    type: 'float',
    comment: '市盈率动',
  })
  dtsyl: number;
  @Column({
    type: 'float',
    comment: '市盈率TTM',
  })
  pe: number;
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
    comment: '每股公积金',
  })
  perCapitalReserve: number;
  @Column({
    type: 'float',
    comment: '每股未分配利润',
  })
  perUnassignProfit: number;

  // 财务指标
  @Column({
    type: 'float',
    comment: '加权净资产收益率',
  })
  roeWeight: number;
  @Column({
    type: 'float',
    comment: '毛利率',
  })
  debtAssetRatio: number;
  @Column({
    type: 'float',
    comment: '营业总收入',
  })
  totalOperateIncome: number;
  @Column({
    type: 'float',
    comment: '营业收入同比增长',
  })
  toiYoyRatio: number;
  @Column({
    type: 'float',
    comment: '归属净利润',
  })
  parentNetprofit: number;
  @Column({
    type: 'float',
    comment: '归属净利润同比增长',
  })
  netprofitYoyRatio: number;

  @Column({
    type: 'float',
    comment: '总股本',
  })
  totalShares: number;
  @Column({
    type: 'float',
    comment: '已流通股份',
  })
  freeShares: number;
  @Column({
    type: 'float',
    comment: '总市值',
  })
  totalMarketCap: number;
  @Column({
    type: 'float',
    comment: '流通市值',
  })
  freeMarketCap: number;

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
