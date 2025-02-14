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
  FavoriteArticleFolderInput,
  DeleteFavoriteArticleInput,
  FavoriteArticleConnection,
  FavoriteArticlesInput,
  DeleteFavoriteArticleByArticleIdInput,
  CreateFavoriteArticleForUploadArticleInput,
  FavoriteAllFolderArticlesInput,
  FavoriteAllFolderArticleConnection,
  CreatedMultiFolderFavoriteArticle,
  CreateMultiFavoriteArticleForUploadArticleInput,
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

  @Query(() => FavoriteArticleFolder)
  @UseGuards(SupabaseAuthGuard)
  async favoriteArticleFolder(
    @Args('input') input: FavoriteArticleFolderInput,
    @Context() context: GraphQLContext,
  ): Promise<FavoriteArticleFolder> {
    const userId = context.req.user.id;
    return await this.favoriteArticleFolderService.getFavoriteArticleFolder(
      userId,
      input,
    );
  }

  @Query(() => FavoriteArticleConnection)
  @UseGuards(SupabaseAuthGuard)
  async favoriteAllFolderArticles(
    @Args('input') input: FavoriteAllFolderArticlesInput,
    @Context() context: GraphQLContext,
  ): Promise<FavoriteAllFolderArticleConnection> {
    const userId = context.req.user.id;
    return await this.favoriteArticleService.getFavoriteAllFolderArticles(
      userId,
      input,
    );
  }
  @Query(() => FavoriteArticleConnection)
  @UseGuards(SupabaseAuthGuard)
  async favoriteArticles(
    @Args('input') input: FavoriteArticlesInput,
    @Context() context: GraphQLContext,
  ): Promise<FavoriteArticleConnection> {
    const userId = context.req.user.id;
    return await this.favoriteArticleService.getFavoriteArticles(userId, input);
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
  ): Promise<FavoriteArticle> {
    const userId = context.req.user.id;
    return await this.favoriteArticleService.createFavoriteArticle(
      userId,
      input,
    );
  }

  @Mutation(() => FavoriteArticle)
  @UseGuards(SupabaseAuthGuard)
  async createFavoriteArticleForUploadArticle(
    @Args('input') input: CreateFavoriteArticleForUploadArticleInput,
    @Context() context: GraphQLContext,
  ): Promise<FavoriteArticle> {
    const userId = context.req.user.id;
    return await this.favoriteArticleService.createFavoriteArticleForUploadArticle(
      userId,
      input,
    );
  }

  @Mutation(() => CreatedMultiFolderFavoriteArticle)
  @UseGuards(SupabaseAuthGuard)
  async createMultiFavoriteArticleForUploadArticle(
    @Args('input') input: CreateMultiFavoriteArticleForUploadArticleInput,
    @Context() context: GraphQLContext,
  ): Promise<CreatedMultiFolderFavoriteArticle> {
    const userId = context.req.user.id;
    return await this.favoriteArticleService.createMultiFavoriteArticleForUploadArticle(
      userId,
      input,
    );
  }

  @Mutation(() => FavoriteArticle)
  @UseGuards(SupabaseAuthGuard)
  async deleteFavoriteArticle(
    @Args('input') input: DeleteFavoriteArticleInput,
    @Context() context: GraphQLContext,
  ): Promise<boolean> {
    const userId = context.req.user.id;
    return await this.favoriteArticleService.deleteFavoriteArticle(
      userId,
      input,
    );
  }

  @Mutation(() => FavoriteArticle)
  @UseGuards(SupabaseAuthGuard)
  async deleteFavoriteArticleByArticleId(
    @Args('input') input: DeleteFavoriteArticleByArticleIdInput,
    @Context() context: GraphQLContext,
  ): Promise<boolean> {
    const userId = context.req.user.id;
    return await this.favoriteArticleService.deleteFavoriteArticleByArticleId(
      userId,
      input,
    );
  }
}
