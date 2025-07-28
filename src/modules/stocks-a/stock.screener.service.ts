import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AStockScreener } from './entities/stock.screener.entity';
import { EastMoneyStockScreenerService } from './providers/eastmoney/stock.screener.service';
import { StockTradeService } from './stock.trade.service';

@Injectable()
export class StockScreenerService {
  private readonly logger = new Logger(StockScreenerService.name);

  constructor(
    private readonly eastMoneyStockScreenerService: EastMoneyStockScreenerService,
    private readonly stockTradeService: StockTradeService,

    @InjectRepository(AStockScreener)
    private readonly stockScreenerRepository: Repository<AStockScreener>,
  ) {}
}
