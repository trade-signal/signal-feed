import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EastMoneyStockService } from './providers/eastmoney/stock.service';
import { AStock } from './entities/stock.entity';
import { StocksController } from './stock.controller';
import { StockService } from './stock.service';
import { StockQuotesService } from './stock.quotes.service';

@Module({
  imports: [TypeOrmModule.forFeature([AStock]), HttpModule],
  controllers: [StocksController],
  providers: [StockService, StockQuotesService, EastMoneyStockService],
  exports: [StockService, StockQuotesService, EastMoneyStockService],
})
export class StockModule {}
