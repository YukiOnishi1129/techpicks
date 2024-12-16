import { Module } from '@nestjs/common';

import { PersonalFeedResolver } from './personal-feed.resolver';
import { GrpcClientModule } from '../grpc/grpc-client.module';

@Module({
  imports: [GrpcClientModule],
  providers: [PersonalFeedResolver],
})
export class PersonalFeedModule {}
