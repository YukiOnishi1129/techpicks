import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ArticleModule } from '../app/article/article.module';
import { GraphQLServerModule } from '../graphql/graphql-server.module';

@Module({
  imports: [
    GraphQLServerModule,
    ArticleModule,
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
