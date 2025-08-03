interface BaiduNewsContentItem {
  type: string;
  data: string;
}

interface BaiduNewsEntityItem {
  more_url: string;
  code: string;
  type: string;
  name: string;
  market: string;
  price: string;
  ratio: string;
  status: string;
  exchange: string;
  logo: {
    logo: string;
    type: string;
  };
}

export type BaiduNewsTag = {
  text: string;
};
export type BaiduNewsTags = BaiduNewsTag[];

export interface BaiduNews {
  loc: string;
  title: string;
  content: {
    items: BaiduNewsContentItem[];
    'items#num#baidu': number;
  };
  publish_time: number;
  third_url: string;
  important: number;
  tag: string;
  provider: string;
  entity: BaiduNewsEntityItem[];
}
