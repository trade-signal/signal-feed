import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import dayjs from 'dayjs';
import { getCurrentUnixTime, isBefore24Hours } from 'src/common/utils/date';
import { get } from 'src/common/utils/request';

@Injectable()
export class ClsService {
  private readonly logger = new Logger(ClsService.name);

  private static readonly CLS_CATEGORIES = [
    '', // 全部
    'red', // 红色
    'announcement', // 公告
    'watch', // 看盘
    'hk_us', // 港股美股
    'fund', // 基金
  ];

  constructor(private readonly httpService: HttpService) {}

  private async request(category: string, lastTime: number) {
    try {
      const url = `https://www.cls.cn/v1/roll/get_roll_list`;

      const baseParams = {
        app: 'CailianpressWeb',
        category: category || '',
        last_time: lastTime || getCurrentUnixTime(),
        os: 'web',
        refresh_type: 1,
        rn: 20,
        sv: '8.4.6',
      };

      const response = await get(this.httpService)(url, baseParams);

      if (response.errno != 0) {
        throw new Error(`获取24小时电报失败: ${response.msg}`);
      }

      return response.data && response.data.roll_data;
    } catch (error) {
      return [];
    }
  }

  async getNews() {
    const results: any[] = [];

    for (const category of ClsService.CLS_CATEGORIES) {
      let lastTime = getCurrentUnixTime();
      let page = 1;

      while (true) {
        try {
          const data = await this.request(category, lastTime);

          if (!data || !Array.isArray(data) || data.length === 0) {
            throw new Error(`${category} 分类数据获取失败: 数据为空`);
          }

          results.push(...data);

          lastTime = data[data.length - 1].ctime;

          const time = dayjs(lastTime * 1e3).toDate();

          // 如果时间超过24小时前，或者页码大于30，则停止
          if (isBefore24Hours(time) || page >= 30) break;

          page++;
        } catch (error) {
          this.logger.error(`${category} 分类数据获取失败: ${error}`);
          break;
        }
      }
    }

    this.logger.log(`获取财联社新闻成功，共${results.length}条`);

    return results;
  }
}
