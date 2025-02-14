import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query, Context, Mutation } from '@nestjs/graphql';

import { ArticleService } from './article/article.service';
import { FeedService } from './feed/feed.service';
import { GraphQLContext } from '../../graphql/context.interface';
import {
  ArticleConnection,
  ArticleOGP,
  ArticlesInput,
  FeedConnection,
  Feed,
  FeedsInput,
  FeedInput,
  ArticleComment,
  UpsertArticleCommentInput,
  DeleteArticleCommentInput,
} from '../../graphql/types/graphql';
import { SupabaseAuthGuard } from '../auth/auth.guard';

@Resolver()
export class ContentResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly feedService: FeedService,
  ) {}

  @Query(() => ArticleConnection)
  @UseGuards(SupabaseAuthGuard)
  async articles(
    @Args('articlesInput') articlesInput: ArticlesInput,
    @Context() context: GraphQLContext,
  ): Promise<ArticleConnection> {
    const user = context.req.user;
    return await this.articleService.getArticles(user.id, articlesInput);
  }

  @Query(() => ArticleOGP)
  @UseGuards(SupabaseAuthGuard)
  async articleOpg(
    @Args('articleUrl') articleUrl: string,
  ): Promise<ArticleOGP> {
    return await this.articleService.getArticleOgp(articleUrl);
  }

  @Query(() => FeedConnection)
  @UseGuards(SupabaseAuthGuard)
  async feeds(
    @Args('feedsInput') feedsInput: FeedsInput,
    @Context() context: GraphQLContext,
  ): Promise<FeedConnection> {
    const user = context.req.user;
    return await this.feedService.getFeeds(user.id, feedsInput);
  }

  @Query(() => Feed)
  @UseGuards(SupabaseAuthGuard)
  async feed(
    @Args('feedInput') feedInput: FeedInput,
    @Context() context: GraphQLContext,
  ): Promise<Feed> {
    const user = context.req.user;
    return await this.feedService.getFeed(user.id, feedInput);
  }

  @Mutation(() => ArticleComment)
  @UseGuards(SupabaseAuthGuard)
  async upsertArticleComment(
    @Args('input') input: UpsertArticleCommentInput,
    @Context() context: GraphQLContext,
  ): Promise<ArticleComment> {
    const user = context.req.user;
    return await this.articleService.upsertArticleComment(user.id, input);
  }

  @Mutation(() => ArticleComment)
  @UseGuards(SupabaseAuthGuard)
  async deleteArticleComment(
    @Args('input') input: DeleteArticleCommentInput,
    @Context() context: GraphQLContext,
  ): Promise<boolean> {
    const user = context.req.user;
    return await this.articleService.deleteArticleComment(user.id, input);
  }
}
