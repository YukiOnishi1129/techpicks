import { Module } from '@nestjs/common';

import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [],
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
