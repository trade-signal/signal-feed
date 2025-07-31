import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { StockModule } from 'src/modules/stocks-a/stock.module';

import { DataInitializationService } from './data.initialization.service';
import { DataUpdateService } from './data.update.service';

@Module({
  imports: [ScheduleModule.forRoot(), StockModule],
  controllers: [],
  providers: [DataInitializationService, DataUpdateService],
  exports: [DataInitializationService, DataUpdateService],
})
export class DataFeedModule {}
