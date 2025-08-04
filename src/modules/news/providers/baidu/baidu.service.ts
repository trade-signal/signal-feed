import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import dayjs from 'dayjs';
import { isBefore24Hours } from 'src/common/utils/date';
import { get } from 'src/common/utils/request';

@Injectable()
export class BaiduService {
  private readonly logger = new Logger(BaiduService.name);

  constructor(private readonly httpService: HttpService) {}

  private async request(page: number): Promise<any[]> {
    try {
      const url = `https://finance.pae.baidu.com/selfselect/expressnews`;

      const baseParams = {
        rn: 200,
        pn: page * 200,
        tag: '',
        finClientType: 'pc',
      };

      const response = await get(this.httpService)(url, baseParams);

      if (response.ResultCode !== '0') {
        throw new Error(`获取百度新闻失败: ${response.ResultMsg}`);
      }

      const content = response?.Result?.content;
      if (!content) return [];

      return content.list;
    } catch (error) {
      return [];
    }
  }

  async getNews() {
    let page = 1;

    const results: any[] = [];

    while (true) {
      try {
        const data = await this.request(page);

        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error(`百度新闻数据获取失败: 数据为空`);
        }

        results.push(...data);

        const lastTime = data[data.length - 1].publish_time;
        const time = dayjs(lastTime * 1e3).toDate();

        // 如果时间超过24小时前，则停止
        if (isBefore24Hours(time) || data.length < 20) break;

        page++;
      } catch (error) {
        this.logger.error(`获取百度新闻失败: ${error.message}`);
        break;
      }
    }

    this.logger.log(`获取百度新闻成功，共${results.length}条`);

    return results;
  }
}
