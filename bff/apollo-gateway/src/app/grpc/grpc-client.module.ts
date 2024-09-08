import { Module } from '@nestjs/common';

import { GrpcBookmarkClientService } from './grpc-bookmark-client.service';
import { GrpcContentClientService } from './grpc-content-client.service';

@Module({
  exports: [GrpcContentClientService, GrpcBookmarkClientService],
  providers: [GrpcContentClientService, GrpcBookmarkClientService],
})
export class GrpcClientModule {}
