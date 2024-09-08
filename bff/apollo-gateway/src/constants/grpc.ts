import * as grpc from '@grpc/grpc-js';

export const grpcCredentials =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'
    ? grpc.credentials.createInsecure()
    : grpc.credentials.createSsl();
