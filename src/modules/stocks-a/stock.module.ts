import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AStock } from './entities/stock.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';
import { SinaTradeService } from './providers/sina/sina.trade.service';

import { StocksController } from './stock.controller';
import { StockQuotesService } from './stock.quotes.service';
import { StockTradeService } from './stock.trade.service';
import { StockService } from './stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([AStock]), HttpModule],
  controllers: [StocksController],
  providers: [
    EastMoneyStockService,
    SinaTradeService,
    StockService,
    StockQuotesService,
    StockTradeService,
  ],
  exports: [StockService, StockQuotesService, StockTradeService],
})
export class StockModule {}
