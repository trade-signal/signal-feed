import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class StockBaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ type: 'int', comment: '股票ID' })
  id: number;

  @Column({
    type: 'varchar',
    comment: '股票名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    comment: '股票代码',
  })
  code: string;

  @Column({
    type: 'varchar',
    comment: '行业',
  })
  industry: string;

  @Column({
    type: 'date',
    comment: '上市日期',
    nullable: true,
  })
  listingDate: Date;

  @Column({
    type: 'boolean',
    comment: '是否活跃',
  })
  isActive: boolean;

  @Column({
    type: 'boolean',
    comment: '是否停牌',
  })
  isSuspended: boolean;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
  })
  updatedAt: Date;
}
