import dayjs from 'dayjs';
import { arrayToObject } from 'src/common/utils/tools';

import { IndicatorMapping, IndicatorType } from './stock.indicators';

// 获取指标字段
export const getIndicatorFields = (indicatorMapping: IndicatorMapping) => {
  return Object.values(indicatorMapping).map((item: any) => item.map);
};

// 格式化日期
export const formatDate = (value: string) => {
  try {
    const date = dayjs(value);

    if (date.isValid()) return date.toDate();

    throw new Error('Invalid date');
  } catch (error) {
    if (!value || !/^\d{8}$/.test(value)) return null;

    const rawValue = (value + '').replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    const date = dayjs(rawValue);

    if (date.isValid()) return date.toDate();

    return null;
  }
};

// 格式化指标值
export const normalizeValue = (type: IndicatorType, value: string) => {
  if (type === IndicatorType.DATE) {
    return formatDate(value);
  }
  if (type === IndicatorType.NUMBER) {
    const numValue = Number(value);
    return isNaN(numValue) ? 0 : numValue;
  }
  if (type === IndicatorType.BOOLEAN) {
    return value === '1';
  }
  if (type === IndicatorType.ARRAY) {
    return Array.isArray(value) ? value.join(',') : value || '';
  }
  return value || '';
};

// 转换股票数据
export const transformStockData = (
  data: any[],
  indicatorMapping: IndicatorMapping,
) => {
  const keys = Object.keys(indicatorMapping);

  return data.map((item: any) =>
    arrayToObject(
      keys.map(key => {
        const { type, map } = indicatorMapping[key];

        return {
          [key]: normalizeValue(type, item[map as string]),
        };
      }),
    ),
  );
};
