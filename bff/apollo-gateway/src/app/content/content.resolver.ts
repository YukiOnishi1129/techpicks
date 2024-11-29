import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query, Context } from '@nestjs/graphql';

import { ArticleService } from './article/article.service';
import { GraphQLContext } from '../../graphql/context.interface';
import {
  ArticleConnection,
  ArticleOGP,
  ArticlesInput,
} from '../../graphql/types/graphql';
import { SupabaseAuthGuard } from '../auth/auth.guard';

@Resolver()
export class ContentResolver {
  constructor(private readonly articleService: ArticleService) {}

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
}
