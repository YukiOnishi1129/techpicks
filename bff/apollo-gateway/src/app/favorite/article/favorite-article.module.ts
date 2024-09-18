import { Module } from '@nestjs/common';

import { FavoriteArticleService } from './favorite-article.service';
import { GrpcClientModule } from '../../grpc/grpc-client.module';

@Module({
  exports: [FavoriteArticleService],
  imports: [GrpcClientModule, FavoriteArticleModule],
  providers: [FavoriteArticleService],
})
export class FavoriteArticleModule {}
