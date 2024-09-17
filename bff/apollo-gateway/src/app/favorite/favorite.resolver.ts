import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import {
  CreateFavoriteArticleFolderInput,
  FavoriteArticleFolder,
  FavoriteArticleFolderConnection,
  FavoriteArticleFoldersInput,
  UpdateFavoriteArticleFolderInput,
} from 'src/graphql/types/graphql';

import { FavoriteService } from './favorite.service';
import { GraphQLContext } from '../../graphql/context.interface';
import { SupabaseAuthGuard } from '../auth/auth.guard';

@Resolver()
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Query(() => FavoriteArticleFolderConnection)
  @UseGuards(SupabaseAuthGuard)
  async favoriteArticleFolders(
    @Args('input') input: FavoriteArticleFoldersInput,
    @Context() context: GraphQLContext,
  ): Promise<FavoriteArticleFolderConnection> {
    const userId = context.req.user.id;
    return await this.favoriteService.getFavoriteArticleFolders(userId, input);
  }

  @Mutation(() => FavoriteArticleFolder)
  @UseGuards(SupabaseAuthGuard)
  async createFavoriteArticleFolder(
    @Args('input') input: CreateFavoriteArticleFolderInput,
    @Context() context: GraphQLContext,
  ): Promise<FavoriteArticleFolder> {
    const userId = context.req.user.id;
    return await this.favoriteService.createFavoriteArticleFolder(
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
    return await this.favoriteService.updateFavoriteArticleFolder(
      userId,
      input,
    );
  }
}
