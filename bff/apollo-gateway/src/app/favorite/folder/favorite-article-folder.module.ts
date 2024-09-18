import { Module } from '@nestjs/common';

import { FavoriteArticleFolderService } from './favorite-article-folder.service';
import { GrpcClientModule } from '../../grpc/grpc-client.module';

@Module({
  exports: [FavoriteArticleFolderService],
  imports: [GrpcClientModule],
  providers: [FavoriteArticleFolderService],
})
export class FavoriteArticleFolderModule {}
