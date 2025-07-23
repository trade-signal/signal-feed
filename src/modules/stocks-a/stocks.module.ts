import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EastMoneyStockService } from './providers/eastmoney/stock.service';
import { AStock } from './entities/stock.entity';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  imports: [TypeOrmModule.forFeature([AStock]), HttpModule],
  controllers: [StocksController],
  providers: [StocksService, EastMoneyStockService],
  exports: [StocksService, EastMoneyStockService],
})
export class StocksModule {}
