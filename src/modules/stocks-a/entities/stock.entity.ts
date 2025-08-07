import { Column, Entity, Index } from 'typeorm';
import { BaseStockEntity } from 'src/common/entities/stock.base.entity';

@Entity({
  name: 'a_stock',
  comment: 'A股股票数据表',
})
@Index(['code', 'marketId'], { unique: true })
@Index(['industry', 'marketId'])
export class AStock extends BaseStockEntity {
  @Column({
    type: 'int',
    comment: '市场ID',
  })
  marketId: number;
}
