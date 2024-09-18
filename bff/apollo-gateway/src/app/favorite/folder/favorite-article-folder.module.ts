import { Module } from '@nestjs/common';

import { FavoriteArticleFolderService } from './favorite-article-folder.service';
import { GrpcClientModule } from '../../grpc/grpc-client.module';
import { FavoriteArticleModule } from '../article/favorite-article.module';

@Module({
  exports: [FavoriteArticleFolderService],
  imports: [GrpcClientModule, FavoriteArticleModule],
  providers: [FavoriteArticleFolderService],
})
export class FavoriteArticleFolderModule {}
