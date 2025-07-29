import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AStock } from './entities/stock.entity';
import { AStockQuotes } from './entities/stock.quotes.entity';
import { AStockScreener } from './entities/stock.screener.entity';
import { EastMoneyStockService } from './providers/eastmoney/stock.service';
import { EastMoneyStockScreenerService } from './providers/eastmoney/stock.screener.service';
import { SinaTradeService } from './providers/sina/sina.trade.service';

import { StocksController } from './stock.controller';
import { StockQuotesService } from './stock.quotes.service';
import { StockTradeService } from './stock.trade.service';
import { StockService } from './stock.service';
import { StockScreenerService } from './stock.screener.service';
import { StockResolver } from './graphql/stock.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([AStock, AStockQuotes, AStockScreener]),
    HttpModule,
  ],
  controllers: [StocksController],
  providers: [
    EastMoneyStockService,
    EastMoneyStockScreenerService,
    SinaTradeService,
    StockService,
    StockQuotesService,
    StockTradeService,
    StockScreenerService,
    StockResolver,
  ],
  exports: [
    StockService,
    StockQuotesService,
    StockTradeService,
    StockScreenerService,
  ],
})
export class StockModule {}
