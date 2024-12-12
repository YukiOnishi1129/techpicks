import { Module } from '@nestjs/common';

import { FeedService } from './feed.service';
import { GrpcClientModule } from '../../grpc/grpc-client.module';

@Module({
  exports: [FeedService],
  imports: [GrpcClientModule],
  providers: [FeedService],
})
export class FeedModule {}
