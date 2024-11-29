import { Module } from '@nestjs/common';

import { ArticleService } from './article.service';
import { GrpcClientModule } from '../../grpc/grpc-client.module';

@Module({
  exports: [ArticleService],
  imports: [GrpcClientModule],
  providers: [ArticleService],
})
export class ArticleModule {}
