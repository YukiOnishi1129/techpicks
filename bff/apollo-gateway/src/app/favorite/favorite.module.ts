import { Module } from '@nestjs/common';

import { FavoriteResolver } from './favorite.resolver';
import { FavoriteService } from './favorite.service';
import { GrpcClientModule } from '../grpc/grpc-client.module';

@Module({
  imports: [GrpcClientModule],
  providers: [FavoriteResolver, FavoriteService],
})
export class FavoriteModule {}
