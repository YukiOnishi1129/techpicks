import { Module } from '@nestjs/common';

import { ArticleModule } from './article/article.module';
import { ContentResolver } from './content.resolver';
import { GrpcClientModule } from '../grpc/grpc-client.module';

@Module({
  imports: [ArticleModule, GrpcClientModule],
  providers: [ContentResolver],
})
export class ContentModule {}
