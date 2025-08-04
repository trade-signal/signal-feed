import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { News } from './entities/news.entity';

@Injectable()
export class NewsClsService {
  constructor(private readonly newsRepository: Repository<News>) {}
}
