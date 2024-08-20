import { Module } from '@nestjs/common';

import { ArticleModule } from '../app/article/article.module';
import { GraphQLServerModule } from '../graphql/graphql-server.module';

@Module({
  imports: [GraphQLServerModule, ArticleModule],
})
export class AppModule {}
