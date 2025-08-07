import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/common/databases/database.module';
import { DataFeedModule } from 'src/modules/data-feed/data.feed.module';
import { NewsModule } from 'src/modules/news/news.module';
import { StockModule } from 'src/modules/stocks-a/stock.module';

@Module({
  imports: [DatabaseModule, DataFeedModule, StockModule, NewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
