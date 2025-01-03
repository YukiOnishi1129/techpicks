import { Module } from '@nestjs/common';

import { MyFeedFolderModule } from './folder/my-feed-folder.module';
import { PersonalFeedResolver } from './personal-feed.resolver';
import { GrpcClientModule } from '../grpc/grpc-client.module';

@Module({
  imports: [GrpcClientModule, MyFeedFolderModule],
  providers: [PersonalFeedResolver],
})
export class PersonalFeedModule {}
