import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { get } from 'src/common/utils/request';

@Injectable()
export class SinaService {
  private readonly logger = new Logger(SinaService.name);

  constructor(private readonly httpService: HttpService) {}

  private async request(page: number, pageSize: number) {
    try {
      const url = `https://zhibo.sina.com.cn/api/zhibo/feed`;

      const response = await get(this.httpService)(url, {
        page,
        page_size: pageSize,
        zhibo_id: 152,
        tag_id: 0,
        dire: 'f',
        dpc: 1,
      });

      if (!response.result) {
        throw new Error(
          `getNews error: ${response.message || 'unknown error'}`,
        );
      }

      return response.result;
    } catch (error) {
      return [];
    }
  }

  async getNews() {
    const results: any[] = [];

    let page = 1;
    const pageSize = 100;

    while (true) {
      try {
        const response = await this.request(page, pageSize);

        if (!response.status || response.status.code !== 0) {
          this.logger.error(JSON.stringify(response));
          throw new Error(
            `获取新浪财经数据失败: ${response.msg || 'unknown error'}`,
          );
        }

        const { page_info, list } = (response.data && response.data.feed) || {};

        if (!page_info || !list || !Array.isArray(list)) {
          throw new Error(`获取新浪财经数据失败: 数据为空`);
        }

        results.push(...list);

        const { totalPage } = page_info;
        if (!totalPage || page >= totalPage) break;

        page++;
      } catch (error) {
        this.logger.error(`获取新浪财经数据失败: ${error}`);
        break;
      }
    }

    this.logger.log(`获取新浪财经数据成功，共${results.length}条`);

    return results;
  }
}
