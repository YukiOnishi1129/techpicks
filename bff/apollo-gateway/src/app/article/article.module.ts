import { Module } from '@nestjs/common';

import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'ARTICLE_PACKAGE',
    //     options: {
    //       credentials: grpc.credentials.createInsecure(),
    //       package: 'checkpicks.content.v1',
    //       protoPath: join(__dirname, '../../proto/content/content.proto'),
    //       url:
    //         process.env.NODE_ENV !== 'production' &&
    //         process.env.NODE_ENV !== 'staging'
    //           ? `${process.env.CONTENT_SERVICE_CONTAINER_NAME}:${process.env.CONTENT_SERVICE_CONTAINER_PORT}`
    //           : process.env.CONTENT_SERVICE_CONTAINER_NAME,
    //     },
    //     transport: Transport.GRPC,
    //   },
    // ]),
  ],
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
