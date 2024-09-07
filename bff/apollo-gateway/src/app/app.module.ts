import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ContentModule } from './content/content.module';
import { GrpcClientModule } from './grpc/grpc-client.module';
import { GraphQLServerModule } from '../graphql/graphql-server.module';

@Module({
  imports: [
    GraphQLServerModule,
    GrpcClientModule,
    ContentModule,
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
