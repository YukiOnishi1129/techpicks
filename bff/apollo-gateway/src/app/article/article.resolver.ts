import * as grpc from '@grpc/grpc-js';
import { UseGuards, OnModuleInit } from '@nestjs/common';
import { Resolver, Args, Query, Context } from '@nestjs/graphql';

import { ArticleService } from './article.service';
import { GraphQLContext } from '../../graphql/context.interface';
import { ArticleConnection, ArticlesInput } from '../../graphql/types/graphql';
import { ContentServiceClient } from '../../grpc/content/content_grpc_pb';
import { SupabaseAuthGuard } from '../auth/auth.guard';

const grpcUrl =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'
    ? `${process.env.CONTENT_SERVICE_CONTAINER_NAME}:${process.env.CONTENT_SERVICE_CONTAINER_PORT}`
    : process.env.CONTENT_SERVICE_CONTAINER_NAME;

const grpcCredentials =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'
    ? grpc.credentials.createInsecure()
    : grpc.credentials.createSsl();

@Resolver()
export class ArticleResolver implements OnModuleInit {
  private contentService: ContentServiceClient;

  constructor(private readonly articleService: ArticleService) {}

  onModuleInit() {
    const options: Partial<grpc.CallOptions> = {
      deadline: 10000,
    };
    this.contentService = new ContentServiceClient(
      grpcUrl,
      grpcCredentials,
      options,
    );
  }

  // @Mutation('createArticle')
  // create(@Args('createArticleInput') createArticleInput: CreateArticleInput) {
  //   return this.articleService.create(createArticleInput);
  // }

  @Query(() => ArticleConnection)
  @UseGuards(SupabaseAuthGuard)
  async articles(
    @Args('articlesInput') articlesInput: ArticlesInput,
    @Context() context: GraphQLContext,
  ): Promise<ArticleConnection> {
    const user = context.req.user;
    return await this.articleService.getArticles(
      this.contentService,
      user.id,
      articlesInput,
    );
  }

  // @Query('article')
  // findOne(@Args('id') id: number) {
  //   return this.articleService.findOne(id);
  // }

  // @Mutation('updateArticle')
  // update(@Args('updateArticleInput') updateArticleInput: UpdateArticleInput) {
  //   return this.articleService.update(
  //     updateArticleInput.id,
  //     updateArticleInput,
  //   );
  // }

  // @Mutation('removeArticle')
  // remove(@Args('id') id: number) {
  //   return this.articleService.remove(id);
  // }
}
