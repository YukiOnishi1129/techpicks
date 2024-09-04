import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query, Context } from '@nestjs/graphql';

import { ArticleService } from './article.service';
import { GraphQLContext } from '../../graphql/context.interface';
import { ArticleConnection, ArticlesInput } from '../../graphql/types/graphql';
import { SupabaseAuthGuard } from '../auth/auth.guard';

@Resolver()
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

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
    return await this.articleService.getArticles(user.id, articlesInput);
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
