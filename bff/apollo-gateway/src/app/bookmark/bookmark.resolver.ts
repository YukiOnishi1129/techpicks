import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Bookmark, CreateBookmarkInput } from 'src/graphql/types/graphql';

import { BookmarkService } from './bookmark.service';
import { SupabaseAuthGuard } from '../auth/auth.guard';

@Resolver()
export class BookmarkResolver {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Query(() => Bookmark)
  @UseGuards(SupabaseAuthGuard)
  async articles(
    @Args('createBookmarkInput') input: CreateBookmarkInput,
    // @Context() context: GraphQLContext,
  ): Promise<Bookmark> {
    return await this.bookmarkService.createBookmark(input);
  }
}
