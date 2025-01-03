import { BookmarkServiceClient } from '@checkpicks/checkpicks-rpc-ts/src/grpc/bookmark/bookmark_grpc_pb';
import * as grpc from '@grpc/grpc-js';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { grpcCredentials } from '../../constants/grpc';

const grpcUrl =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'
    ? `${process.env.BOOKMARK_SERVICE_CONTAINER_NAME}:${process.env.BOOKMARK_SERVICE_CONTAINER_PORT}`
    : process.env.BOOKMARK_SERVICE_CONTAINER_NAME;

@Injectable()
export class GrpcBookmarkClientService implements OnModuleInit {
  private grpcBookmarkService: BookmarkServiceClient;

  onModuleInit() {
    const options: Partial<grpc.CallOptions> = {
      deadline: 10000,
    };
    this.grpcBookmarkService = new BookmarkServiceClient(
      grpcUrl,
      grpcCredentials,
      options,
    );
  }

  getGrpcBookmarkService() {
    return this.grpcBookmarkService;
  }
}
