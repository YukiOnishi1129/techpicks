import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import {
  Bookmark,
  BookmarkConnection,
  BookmarksInput,
  CreateBookmarkInput,
  DeleteBookmarkInput,
  CreateBookmarkForUploadArticleInput,
} from 'src/graphql/types/graphql';

import { BookmarkService } from './bookmark.service';
import { GraphQLContext } from '../../graphql/context.interface';
import { SupabaseAuthGuard } from '../auth/auth.guard';

@Resolver()
export class BookmarkResolver {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Query(() => BookmarkConnection)
  @UseGuards(SupabaseAuthGuard)
  async bookmarks(
    @Args('input') input: BookmarksInput,
    @Context() context: GraphQLContext,
  ): Promise<BookmarkConnection> {
    const user = context.req.user;
    return await this.bookmarkService.getBookmarks(user.id, input);
  }

  @Mutation(() => Bookmark)
  @UseGuards(SupabaseAuthGuard)
  async createBookmark(
    @Args('createBookmarkInput') input: CreateBookmarkInput,
    @Context() context: GraphQLContext,
  ): Promise<Bookmark> {
    const user = context.req.user;
    return await this.bookmarkService.createBookmark(user.id, input);
  }

  @Mutation(() => Bookmark)
  @UseGuards(SupabaseAuthGuard)
  async createBookmarkForUploadArticle(
    @Args('input') input: CreateBookmarkForUploadArticleInput,
    @Context() context: GraphQLContext,
  ): Promise<Bookmark> {
    const user = context.req.user;
    return await this.bookmarkService.createBookmarkForUploadArticle(
      user.id,
      input,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(SupabaseAuthGuard)
  async deleteBookmark(
    @Args('deleteBookmarkInput') input: DeleteBookmarkInput,
    @Context() context: GraphQLContext,
  ): Promise<boolean> {
    const user = context.req.user;
    return await this.bookmarkService.deleteBookmark(user.id, input);
  }
}
