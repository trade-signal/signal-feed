import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/common/databases/database.module';
import { StocksModule } from 'src/modules/stocks-a/stocks.module';

@Module({
  imports: [DatabaseModule, StocksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
