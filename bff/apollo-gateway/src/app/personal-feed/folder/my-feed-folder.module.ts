import { Module } from '@nestjs/common';

import { MyFeedFolderService } from './my-feed-folder.service';
import { GrpcClientModule } from '../../grpc/grpc-client.module';

@Module({
  exports: [MyFeedFolderService],
  imports: [GrpcClientModule],
  providers: [MyFeedFolderService],
})
export class MyFeedFolderModule {}
