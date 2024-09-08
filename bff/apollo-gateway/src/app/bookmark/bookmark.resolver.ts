import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import {
  Bookmark,
  CreateBookmarkInput,
  DeleteBookmarkInput,
} from 'src/graphql/types/graphql';

import { BookmarkService } from './bookmark.service';
import { SupabaseAuthGuard } from '../auth/auth.guard';

@Resolver()
export class BookmarkResolver {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Mutation(() => Bookmark)
  @UseGuards(SupabaseAuthGuard)
  async createBookmark(
    @Args('createBookmarkInput') input: CreateBookmarkInput,
    // @Context() context: GraphQLContext,
  ): Promise<Bookmark> {
    return await this.bookmarkService.createBookmark(input);
  }

  @Mutation(() => Boolean)
  @UseGuards(SupabaseAuthGuard)
  async deleteBookmark(
    @Args('deleteBookmarkInput') input: DeleteBookmarkInput,
    // @Context() context: GraphQLContext,
  ): Promise<boolean> {
    return await this.bookmarkService.deleteBookmark(input);
  }
}
