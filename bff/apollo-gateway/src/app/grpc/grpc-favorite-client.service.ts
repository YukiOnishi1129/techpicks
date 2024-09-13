import * as grpc from '@grpc/grpc-js';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { grpcCredentials } from '../../constants/grpc';
import { FavoriteServiceClient } from '../../grpc/favorite/favorite_grpc_pb';

const grpcUrl =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'
    ? `${process.env.FAVORITE_SERVICE_CONTAINER_NAME}:${process.env.FAVORITE_SERVICE_CONTAINER_PORT}`
    : process.env.FAVORITE_SERVICE_CONTAINER_NAME;

@Injectable()
export class GrpcFavoriteClientService implements OnModuleInit {
  private grpcFavoriteService: FavoriteServiceClient;

  onModuleInit() {
    const options: Partial<grpc.CallOptions> = {
      deadline: 10000,
    };
    this.grpcFavoriteService = new FavoriteServiceClient(
      grpcUrl,
      grpcCredentials,
      options,
    );
  }

  getGrpcFavoriteService() {
    return this.grpcFavoriteService;
  }
}
