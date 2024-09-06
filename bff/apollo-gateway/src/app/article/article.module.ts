import { join } from 'path';

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ARTICLE_PACKAGE',
        options: {
          package: 'checkpicks.content.v1',
          protoPath: join(__dirname, '../../proto/content/content.proto'),
          url: `${process.env.CONTENT_SERVICE_CONTAINER_NAME}:${process.env.CONTENT_SERVICE_CONTAINER_PORT}`,
        },
        transport: Transport.GRPC,
      },
    ]),
  ],
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
