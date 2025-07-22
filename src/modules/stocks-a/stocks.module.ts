import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EastMoneyStockService } from './providers/eastmoney/stock.service';
import { Stock } from './entities/stock.entity';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Stock])],
  controllers: [StocksController],
  providers: [StocksService, EastMoneyStockService],
  exports: [StocksService, EastMoneyStockService],
})
export class StocksModule {}
