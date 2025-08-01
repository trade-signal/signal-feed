import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/common/databases/database.module';
import { DataFeedModule } from './modules/data-feed/data.feed.module';
import { StockModule } from 'src/modules/stocks-a/stock.module';

@Module({
  imports: [DatabaseModule, DataFeedModule, StockModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
