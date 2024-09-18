import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import {
  CreateFavoriteArticleFolderInput,
  FavoriteArticleFolder,
  FavoriteArticle,
  FavoriteArticleFolderConnection,
  FavoriteArticleFoldersInput,
  UpdateFavoriteArticleFolderInput,
  DeleteFavoriteArticleFolderInput,
  CreateFavoriteArticleInput,
} from 'src/graphql/types/graphql';

import { FavoriteArticleService } from './article/favorite-article.service';
import { FavoriteArticleFolderService } from './folder/favorite-article-folder.service';
import { GraphQLContext } from '../../graphql/context.interface';
import { SupabaseAuthGuard } from '../auth/auth.guard';

@Resolver()
export class FavoriteResolver {
  constructor(
    private readonly favoriteArticleFolderService: FavoriteArticleFolderService,
    private readonly favoriteArticleService: FavoriteArticleService,
  ) {}

  @Query(() => FavoriteArticleFolderConnection)
  @UseGuards(SupabaseAuthGuard)
  async favoriteArticleFolders(
    @Args('input') input: FavoriteArticleFoldersInput,
    @Context() context: GraphQLContext,
  ): Promise<FavoriteArticleFolderConnection> {
    const userId = context.req.user.id;
    return await this.favoriteArticleFolderService.getFavoriteArticleFolders(
      userId,
      input,
    );
  }

  @Mutation(() => FavoriteArticleFolder)
  @UseGuards(SupabaseAuthGuard)
  async createFavoriteArticleFolder(
    @Args('input') input: CreateFavoriteArticleFolderInput,
    @Context() context: GraphQLContext,
  ): Promise<FavoriteArticleFolder> {
    const userId = context.req.user.id;
    return await this.favoriteArticleFolderService.createFavoriteArticleFolder(
      userId,
      input,
    );
  }

  @Mutation(() => FavoriteArticleFolder)
  @UseGuards(SupabaseAuthGuard)
  async updateFavoriteArticleFolder(
    @Args('input') input: UpdateFavoriteArticleFolderInput,
    @Context() context: GraphQLContext,
  ): Promise<FavoriteArticleFolder> {
    const userId = context.req.user.id;
    return await this.favoriteArticleFolderService.updateFavoriteArticleFolder(
      userId,
      input,
    );
  }

  @Mutation(() => FavoriteArticleFolder)
  @UseGuards(SupabaseAuthGuard)
  async deleteFavoriteArticleFolder(
    @Args('input') input: DeleteFavoriteArticleFolderInput,
    @Context() context: GraphQLContext,
  ): Promise<boolean> {
    const userId = context.req.user.id;
    return await this.favoriteArticleFolderService.deleteFavoriteArticleFolder(
      userId,
      input,
    );
  }

  @Mutation(() => FavoriteArticle)
  @UseGuards(SupabaseAuthGuard)
  async createFavoriteArticle(
    @Args('input') input: CreateFavoriteArticleInput,
    @Context() context: GraphQLContext,
  ): Promise<FavoriteArticleFolder> {
    const userId = context.req.user.id;
    return await this.favoriteArticleService.createFavoriteArticle(
      userId,
      input,
    );
  }
}
