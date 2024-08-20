import { Resolver, Args, Query } from '@nestjs/graphql';

import { ArticleConnection, ArticlesInput } from '../../graphql/types/graphql';

import { ArticleService } from './article.service';

@Resolver()
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  // @Mutation('createArticle')
  // create(@Args('createArticleInput') createArticleInput: CreateArticleInput) {
  //   return this.articleService.create(createArticleInput);
  // }

  @Query(() => ArticleConnection)
  articles(
    @Args('articlesInput') articlesInput: ArticlesInput,
  ): ArticleConnection {
    return this.articleService.getArticles(articlesInput);
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
