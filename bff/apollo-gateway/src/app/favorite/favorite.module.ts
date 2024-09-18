import { Module } from '@nestjs/common';

import { FavoriteArticleModule } from './article/favorite-article.module';
import { FavoriteResolver } from './favorite.resolver';
import { FavoriteArticleFolderModule } from './folder/favorite-article-folder.module';
import { GrpcClientModule } from '../grpc/grpc-client.module';

@Module({
  imports: [
    GrpcClientModule,
    FavoriteArticleFolderModule,
    FavoriteArticleModule,
  ],
  providers: [FavoriteResolver],
})
export class FavoriteModule {}
