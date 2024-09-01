import { Resolver, Args, Query } from '@nestjs/graphql';

import { ArticleService } from './article.service';
import { ArticleConnection, ArticlesInput } from '../../graphql/types/graphql';

@Resolver()
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  // @Mutation('createArticle')
  // create(@Args('createArticleInput') createArticleInput: CreateArticleInput) {
  //   return this.articleService.create(createArticleInput);
  // }

  @Query(() => ArticleConnection)
  async articles(
    @Args('articlesInput') articlesInput: ArticlesInput,
  ): Promise<ArticleConnection> {
    return await this.articleService.getArticles(articlesInput);
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
