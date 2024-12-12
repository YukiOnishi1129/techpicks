import { Module } from '@nestjs/common';

import { ArticleModule } from './article/article.module';
import { ContentResolver } from './content.resolver';
import { FeedModule } from './feed/feed.module';
import { GrpcClientModule } from '../grpc/grpc-client.module';

@Module({
  imports: [ArticleModule, FeedModule, GrpcClientModule],
  providers: [ContentResolver],
})
export class ContentModule {}
