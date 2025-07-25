import { Column, Entity, Index } from 'typeorm';
import { StockBaseEntity } from 'src/common/entities/stock.base.entity';

@Entity()
@Index(['code', 'marketId'], { unique: true })
@Index(['industry', 'marketId'])
export class AStock extends StockBaseEntity {
  @Column({
    type: 'int',
    comment: '市场ID',
  })
  marketId: number;
}
