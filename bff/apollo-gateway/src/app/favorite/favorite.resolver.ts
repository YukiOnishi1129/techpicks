import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import {
  CreateFavoriteArticleFolderInput,
  FavoriteArticleFolder,
} from 'src/graphql/types/graphql';

import { FavoriteService } from './favorite.service';
import { GraphQLContext } from '../../graphql/context.interface';
import { SupabaseAuthGuard } from '../auth/auth.guard';

@Resolver()
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

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
}
