import { Column, Entity, Index } from 'typeorm';
import { BaseStockEntity } from 'src/common/entities/base-stock.entity';

@Entity()
@Index(['code', 'marketId'], { unique: true })
@Index(['industry', 'marketId'])
export class AStock extends BaseStockEntity {
  @Column()
  marketId: number;
}
