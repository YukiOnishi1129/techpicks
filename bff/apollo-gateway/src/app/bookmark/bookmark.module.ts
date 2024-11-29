import { Module } from '@nestjs/common';

import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkService } from './bookmark.service';
import { GrpcClientModule } from '../grpc/grpc-client.module';

@Module({
  imports: [GrpcClientModule],
  providers: [BookmarkResolver, BookmarkService],
})
export class BookmarkModule {}
