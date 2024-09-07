import { Module } from '@nestjs/common';

import { GrpcContentClientService } from './grpc-content-client.service';

@Module({
  exports: [GrpcContentClientService],
  providers: [GrpcContentClientService],
})
export class GrpcClientModule {}
