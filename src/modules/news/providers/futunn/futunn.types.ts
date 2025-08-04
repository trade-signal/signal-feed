interface AudioInfo {
  audioDuration: number;
  audioUrl: string;
  language: string;
}

interface Quote {
  stockId: string;
  pmahStatus: number;
  changePrice: string;
  changeRatio: string;
  price: string;
  stateType: number;
  pmahPrice: string;
  pmahChangeRatio: string;
  code: string;
  name: string;
  quoteUrl: string;
  quoteNnUrl: string;
  newStockFlag: number;
  stockStatus: string;
  stockType: number;
  stockMarket: string;
  instrumentType: number;
  stockCategory: number;
}

export interface FutunnNews {
  audioInfos: AudioInfo[];
  relatedStocks: string[];
  quote: Quote[];
  content: string;
  detailUrl: string;
  futusource: string;
  id: string;
  isAutoTranslated: number;
  level: number;
  newsType: number;
  newsUniqueId: string;
  originLang: string;
  pic: string;
  sensorFields: Record<string, string>;
  time: string;
  title: string;
  newsContentType: number;
  targetUrlQuery: string;
}
