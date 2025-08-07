import { Column, PrimaryGeneratedColumn, Entity, Index } from 'typeorm';

@Entity({
  name: 'news',
  comment: '新闻数据表',
})
@Index(['source', 'sourceId'], { unique: true })
@Index(['date'])
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
    type: 'date',
    comment: '发布时间',
  })
  date: Date;

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
    type: 'varchar',
    comment: '分类数组',
  })
  categories: string[];
}
