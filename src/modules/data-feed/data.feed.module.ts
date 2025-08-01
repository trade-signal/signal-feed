import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { StockModule } from 'src/modules/stocks-a/stock.module';

import { DataInitService } from './data.init.service';
import { DataStockCronService } from './data.stock.cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), StockModule],
  controllers: [],
  providers: [DataInitService, DataStockCronService],
  exports: [DataInitService, DataStockCronService],
})
export class DataFeedModule {}
