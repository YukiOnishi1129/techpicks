import * as grpc from '@grpc/grpc-js';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { MyFeedServiceClient } from '../../grpc/my_feed/my_feed_grpc_pb';

const grpcUrl =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'
    ? `${process.env.MY_FEED_SERVICE_CONTAINER_NAME}:${process.env.MY_FEED_SERVICE_CONTAINER_PORT}`
    : process.env.MY_FEED_SERVICE_CONTAINER_NAME;

const grpcCredentials =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'
    ? grpc.credentials.createInsecure()
    : grpc.credentials.createSsl();

@Injectable()
export class GrpcMyFeedClientService implements OnModuleInit {
  private grpcMyFeedService: MyFeedServiceClient;

  onModuleInit() {
    const options: Partial<grpc.CallOptions> = {
      deadline: 10000,
    };
    this.grpcMyFeedService = new MyFeedServiceClient(
      grpcUrl,
      grpcCredentials,
      options,
    );
  }

  getGrpcMyFeedService() {
    return this.grpcMyFeedService;
  }
}
