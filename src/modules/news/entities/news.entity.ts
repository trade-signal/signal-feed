import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'news',
  comment: '新闻数据表',
})
@Index(['source', 'sourceId'], { unique: true })
@Index(['source', 'publishDate', 'sourceId'])
export class News {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '主键ID',
  })
  id: number;

  @Column({
    type: 'varchar',
    comment: '来源, 如 "sina", "cls", "futunn", "baidu"',
  })
  source: string;

  @Column({
    type: 'varchar',
    comment: '源站ID',
  })
  sourceId: string;

  @Column({
    type: 'varchar',
    comment: '源站URL',
  })
  sourceUrl: string;

  @Column({
    type: 'varchar',
    comment: '标题',
  })
  title: string;

  @Column({
    type: 'varchar',
    comment: '摘要',
  })
  summary: string;

  @Column({
    type: 'varchar',
    comment: '内容',
  })
  content: string;

  @Column({
    type: 'timestamptz',
    comment: '发布时间',
  })
  publishDate: Date;

  @Column({
    type: 'json',
    comment: '标签数组',
  })
  tags: string[];

  @Column({
    type: 'json',
    comment: '相关股票',
  })
  stocks: {
    code: string;
    market: string;
    name: string;
  }[];

  @Column({
    type: 'json',
    comment: '分类数组',
  })
  categories: string[];

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
