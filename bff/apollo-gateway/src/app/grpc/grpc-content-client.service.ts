import { ContentServiceClient } from '@checkpicks/checkpicks-rpc-ts/src/grpc/content/content_grpc_pb';
import * as grpc from '@grpc/grpc-js';
import { Injectable, OnModuleInit } from '@nestjs/common';

const grpcUrl =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'
    ? `${process.env.CONTENT_SERVICE_CONTAINER_NAME}:${process.env.CONTENT_SERVICE_CONTAINER_PORT}`
    : process.env.CONTENT_SERVICE_CONTAINER_NAME;

const grpcCredentials =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'
    ? grpc.credentials.createInsecure()
    : grpc.credentials.createSsl();

@Injectable()
export class GrpcContentClientService implements OnModuleInit {
  private grpcContentService: ContentServiceClient;

  onModuleInit() {
    const options: Partial<grpc.CallOptions> = {
      deadline: 10000,
    };
    this.grpcContentService = new ContentServiceClient(
      grpcUrl,
      grpcCredentials,
      options,
    );
  }

  getGrpcContentService() {
    return this.grpcContentService;
  }
}
