import { Module } from '@nestjs/common';

import { GrpcBookmarkClientService } from './grpc-bookmark-client.service';
import { GrpcContentClientService } from './grpc-content-client.service';
import { GrpcFavoriteClientService } from './grpc-favorite-client.service';
import { GrpcMyFeedClientService } from './grpc-my-feed-client.service';

@Module({
  exports: [
    GrpcContentClientService,
    GrpcBookmarkClientService,
    GrpcMyFeedClientService,
    GrpcFavoriteClientService,
  ],
  providers: [
    GrpcContentClientService,
    GrpcBookmarkClientService,
    GrpcMyFeedClientService,
    GrpcFavoriteClientService,
  ],
})
export class GrpcClientModule {}
