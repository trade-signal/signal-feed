import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import dayjs from 'dayjs';
import { getCurrentUnixTime, isBefore24Hours } from 'src/common/utils/date';
import { get } from 'src/common/utils/request';

@Injectable()
export class FutunnService {
  private readonly logger = new Logger(FutunnService.name);

  constructor(private readonly httpService: HttpService) {}

  private readonly cnCodes = ['sz', 'sh', 'bj'];

  private isCn(code: string) {
    return this.cnCodes.some(key => code.endsWith(key));
  }

  private formatCode(code: string) {
    const isCn = this.isCn(code.toLocaleLowerCase());

    return {
      code: code
        .split('.')
        .reverse()
        .join(isCn ? '' : '_')
        .toLocaleLowerCase(),
      isCn,
    };
  }

  private async request(seqMark: string) {
    try {
      const url = `https://news.futunn.com/news-site-api/main/get-flash-list`;

      const baseParams = { pageSize: 200 } as Record<string, any>;

      if (seqMark) baseParams.seqMark = seqMark;

      const response = await get(this.httpService)(url, {
        ...baseParams,
        _t: getCurrentUnixTime(),
      });

      if (response.code !== 0) {
        throw new Error(`获取富途牛牛新闻失败: ${response.msg}`);
      }

      return response?.data?.data || [];
    } catch (error) {
      return [];
    }
  }

  async getNews() {
    const results: any[] = [];

    let seqMark = '';

    while (true) {
      try {
        const data = await this.request(seqMark);

        const { seqMark: newSeqMark, hasMore, news } = data || {};

        if (!news || !Array.isArray(news) || news.length === 0) {
          throw new Error(`富途牛牛新闻数据获取失败: 数据为空`);
        }

        results.push(...news);

        const lastTime = news[news.length - 1].time;
        const time = dayjs(lastTime * 1e3).toDate();

        // 如果时间超过24小时前，或者没有更多数据，则停止
        if (isBefore24Hours(time) || !hasMore) break;

        seqMark = newSeqMark;
      } catch (error) {
        this.logger.error(`富途牛牛新闻数据获取失败: ${error}`);
        break;
      }
    }

    this.logger.log(`获取富途牛牛新闻成功，共${results.length}条`);

    return results;
  }
}
