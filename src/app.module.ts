import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/common/databases/database.module';
import { StockModule } from 'src/modules/stocks-a/stock.module';

@Module({
  imports: [DatabaseModule, StockModule], // 引入股票模块
  controllers: [],
  providers: [],
})
export class AppModule {}
