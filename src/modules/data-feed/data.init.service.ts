import { Global, Injectable, Logger } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';

import { StockService } from 'src/modules/stocks-a/stock.service';
import { StockQuotesService } from 'src/modules/stocks-a/stock.quotes.service';
import { StockScreenerService } from 'src/modules/stocks-a/stock.screener.service';
import { NewsSinaService } from 'src/modules/news/news.sina.service';
import { NewsFutunnService } from 'src/modules/news/news.futunn.service';
import { NewsClsService } from 'src/modules/news/news.cls.service';
import { NewsBaiduService } from 'src/modules/news/news.baidu.service';

@Injectable()
@Global()
export class DataInitService implements OnModuleInit {
  private readonly logger = new Logger(DataInitService.name);

  constructor(
    private readonly stockService: StockService,
    private readonly stockQuotesService: StockQuotesService,
    private readonly stockScreenerService: StockScreenerService,
    private readonly newsSinaService: NewsSinaService,
    private readonly newsFutunnService: NewsFutunnService,
    private readonly newsClsService: NewsClsService,
    private readonly newsBaiduService: NewsBaiduService,
  ) {}

  async onModuleInit() {
    await this.initialize();
  }

  private async initialize() {
    // 股票数据初始化
    await this.stockAInitialization();
    // 新闻数据初始化
    await this.newsInitialization();
  }

  private async stockAInitialization() {
    // 股票数据初始化
    await this.stockInitialization();
    // 股票行情数据初始化
    await this.stockQuotesInitialization();
    // 股票筛选器数据初始化
    await this.stockScreenerInitialization();
  }

  private async newsInitialization() {
    // 新浪新闻数据初始化
    await this.newsSinaInitialization();
    // 富途牛牛新闻数据初始化
    await this.newsFutunnInitialization();
    // 财联社财经新闻数据初始化
    await this.newsClsInitialization();
    // 百度股市通新闻数据初始化
    await this.newsBaiduInitialization();
  }

  private async stockInitialization() {
    const dataExist = await this.stockService.checkExist();
    if (dataExist) {
      this.logger.log('股票数据已存在，跳过初始化');
      return;
    }

    try {
      await this.stockService.fetchAll();
    } catch (error) {
      this.logger.error(`股票数据初始化失败: ${error.message}`);
    }
  }

  private async stockQuotesInitialization() {
    const dataExist = await this.stockQuotesService.checkExist();
    if (dataExist) {
      this.logger.log('股票行情数据已存在，跳过初始化');
      return;
    }

    try {
      await this.stockQuotesService.fetchAll();
    } catch (error) {
      this.logger.error(`股票行情数据初始化失败: ${error.message}`);
    }
  }

  private async stockScreenerInitialization() {
    const dataExist = await this.stockScreenerService.checkExist();
    if (dataExist) {
      this.logger.log('股票筛选器数据已存在，跳过初始化');
      return;
    }

    try {
      await this.stockScreenerService.fetchAll();
    } catch (error) {
      this.logger.error(`股票筛选器数据初始化失败: ${error.message}`);
    }
  }

  private async newsSinaInitialization() {
    const dataExist = await this.newsSinaService.checkExist();
    if (dataExist) {
      this.logger.log('新浪新闻数据已存在，跳过初始化');
      return;
    }

    try {
      await this.newsSinaService.fetchAll();
    } catch (error) {
      this.logger.error(`新浪新闻数据初始化失败: ${error.message}`);
    }
  }

  private async newsFutunnInitialization() {
    const dataExist = await this.newsFutunnService.checkExist();
    if (dataExist) {
      this.logger.log('富途牛牛新闻数据已存在，跳过初始化');
      return;
    }

    try {
      await this.newsFutunnService.fetchAll();
    } catch (error) {
      this.logger.error(`富途牛牛新闻数据初始化失败: ${error.message}`);
    }
  }

  private async newsClsInitialization() {
    const dataExist = await this.newsClsService.checkExist();
    if (dataExist) {
      this.logger.log('财联社财经新闻数据已存在，跳过初始化');
      return;
    }

    try {
      await this.newsClsService.fetchAll();
    } catch (error) {
      this.logger.error(`财联社财经新闻数据初始化失败: ${error.message}`);
    }
  }

  private async newsBaiduInitialization() {
    const dataExist = await this.newsBaiduService.checkExist();
    if (dataExist) {
      this.logger.log('百度股市通新闻数据已存在，跳过初始化');
      return;
    }

    try {
      await this.newsBaiduService.fetchAll();
    } catch (error) {
      this.logger.error(`百度股市通新闻数据初始化失败: ${error.message}`);
    }
  }
}
