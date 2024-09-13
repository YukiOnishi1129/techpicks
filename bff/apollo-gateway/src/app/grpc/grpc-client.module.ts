import { Module } from '@nestjs/common';

import { GrpcBookmarkClientService } from './grpc-bookmark-client.service';
import { GrpcContentClientService } from './grpc-content-client.service';
import { GrpcFavoriteClientService } from './grpc-favorite-client.service';

@Module({
  exports: [
    GrpcContentClientService,
    GrpcBookmarkClientService,
    GrpcFavoriteClientService,
  ],
  providers: [
    GrpcContentClientService,
    GrpcBookmarkClientService,
    GrpcFavoriteClientService,
  ],
})
export class GrpcClientModule {}
