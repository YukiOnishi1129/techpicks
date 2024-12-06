import { Injectable } from '@nestjs/common';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import {
  CreateBookmarkInput,
  Bookmark,
  DeleteBookmarkInput,
  BookmarksInput,
  BookmarkConnection,
  CreateBookmarkForUploadArticleInput,
} from 'src/graphql/types/graphql';
import {
  GetBookmarksRequest,
  CreateBookmarkRequest,
  DeleteBookmarkRequest,
  CreateBookmarkForUploadArticleRequest,
} from 'src/grpc/bookmark/bookmark_pb';
import { convertTimestampToInt } from 'src/utils/timestamp';

import { GrpcBookmarkClientService } from '../grpc/grpc-bookmark-client.service';

@Injectable()
export class BookmarkService {
  constructor(
    private readonly grpcBookmarkClientService: GrpcBookmarkClientService,
  ) {}

  async getBookmarks(
    userId: string,
    input: BookmarksInput,
  ): Promise<BookmarkConnection> {
    const req = new GetBookmarksRequest();
    req.setUserId(userId);
    if (input?.first) req.setLimit(input.first);
    if (input?.after) req.setCursor(input.after);
    if (input?.keyword)
      req.setKeyword(new StringValue().setValue(input.keyword));

    return new Promise((resolve, reject) => {
      const client = this.grpcBookmarkClientService.getGrpcBookmarkService();
      client.getBookmarks(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resBookmarks = res.toObject();

        const bookmarks: BookmarkConnection = {
          edges: resBookmarks?.bookmarkedgeList
            ? resBookmarks.bookmarkedgeList.map((edge) => {
                return {
                  cursor: edge.bookmark.id,
                  node: {
                    articleId: edge.bookmark.articleId,
                    articleUrl: edge.bookmark.articleUrl,
                    createdAt: convertTimestampToInt(edge.bookmark.createdAt),
                    description: edge.bookmark.description,
                    favoriteArticleFolderIds: [],
                    id: edge.bookmark.id,
                    isEng: edge.bookmark.isEng,
                    isFollowing: false,
                    isRead: edge.bookmark.isRead,
                    platformFaviconUrl: edge.bookmark.platformFaviconUrl,
                    platformId: edge.bookmark?.platformId?.value,
                    platformName: edge.bookmark.platformName,
                    platformUrl: edge.bookmark.platformUrl,
                    publishedAt: edge.bookmark?.publishedAt
                      ? convertTimestampToInt(edge.bookmark.publishedAt)
                      : undefined,
                    thumbnailUrl: edge.bookmark.thumbnailUrl,
                    title: edge.bookmark.title,
                    updatedAt: convertTimestampToInt(edge.bookmark.updatedAt),
                  },
                };
              })
            : [],
          pageInfo: {
            endCursor: resBookmarks.pageInfo.endCursor,
            hasNextPage: resBookmarks.pageInfo.hasNextPage,
            hasPreviousPage: false,
          },
        };

        resolve(bookmarks);
      });
    });
  }

  async createBookmark(input: CreateBookmarkInput): Promise<Bookmark> {
    const req = new CreateBookmarkRequest();
    req.setArticleId(input.articleId);
    req.setPlatformId(new StringValue().setValue(input.platformId));
    req.setUserId(input.userId);
    req.setTitle(input.title);
    req.setDescription(input.description);
    req.setArticleUrl(input.articleUrl);
    req.setThumbnailUrl(input.thumbnailUrl);
    req.setPublishedAt(new Timestamp().setSeconds(input.publishedAt));
    req.setPlatformName(input.platformName);
    req.setPlatformUrl(input.platformUrl);
    req.setPlatformFaviconUrl(input.platformFaviconUrl);
    req.setIsEng(input.isEng);
    req.setIsRead(input.isRead);

    return new Promise((resolve, reject) => {
      const client = this.grpcBookmarkClientService.getGrpcBookmarkService();

      client.createBookmark(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resBookmark = res.toObject().bookmark;

        const bookmark: Bookmark = {
          articleId: resBookmark.articleId,
          articleUrl: resBookmark.articleUrl,
          createdAt: convertTimestampToInt(resBookmark.createdAt),
          description: resBookmark.description,
          favoriteArticleFolderIds: [],
          id: resBookmark.id,
          isEng: resBookmark.isEng,
          isFollowing: false,
          isRead: resBookmark.isRead,
          platformFaviconUrl: resBookmark.platformFaviconUrl,
          platformId: resBookmark?.platformId?.value,
          platformName: resBookmark.platformName,
          platformUrl: resBookmark.platformUrl,
          publishedAt: resBookmark?.publishedAt
            ? convertTimestampToInt(resBookmark.publishedAt)
            : undefined,
          thumbnailUrl: resBookmark.thumbnailUrl,
          title: resBookmark.title,
          updatedAt: convertTimestampToInt(resBookmark.updatedAt),
        };

        resolve(bookmark);
      });
    });
  }

  async createBookmarkForUploadArticle(
    userId: string,
    input: CreateBookmarkForUploadArticleInput,
  ): Promise<Bookmark> {
    return new Promise((resolve, reject) => {
      const req = new CreateBookmarkForUploadArticleRequest();
      req.setUserId(userId);
      req.setTitle(input.title);
      req.setDescription(input.description);
      req.setArticleUrl(input.articleUrl);
      req.setThumbnailUrl(input.thumbnailUrl);
      req.setThumbnailUrl(input.thumbnailUrl);
      req.setPlatformName(input.platformName);
      req.setPlatformUrl(input.platformUrl);
      req.setPlatformFaviconUrl(input.platformFaviconUrl);

      const client = this.grpcBookmarkClientService.getGrpcBookmarkService();
      client.createBookmarkForUploadArticle(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resBookmark = res.toObject().bookmark;
        const bookmark: Bookmark = {
          articleId: resBookmark.articleId,
          articleUrl: resBookmark.articleUrl,
          createdAt: convertTimestampToInt(resBookmark.createdAt),
          description: resBookmark.description,
          favoriteArticleFolderIds: [],
          id: resBookmark.id,
          isEng: resBookmark.isEng,
          isFollowing: false,
          isRead: resBookmark.isRead,
          platformFaviconUrl: resBookmark.platformFaviconUrl,
          platformId: resBookmark?.platformId?.value,
          platformName: resBookmark.platformName,
          platformUrl: resBookmark.platformUrl,
          publishedAt: resBookmark?.publishedAt
            ? convertTimestampToInt(resBookmark.publishedAt)
            : undefined,
          thumbnailUrl: resBookmark.thumbnailUrl,
          title: resBookmark.title,
          updatedAt: convertTimestampToInt(resBookmark.updatedAt),
        };

        resolve(bookmark);
      });
    });
  }

  async deleteBookmark(input: DeleteBookmarkInput): Promise<boolean> {
    const req = new DeleteBookmarkRequest();
    req.setBookmarkId(input.bookmarkId);
    req.setUserId(input.userId);

    return new Promise((resolve, reject) => {
      const client = this.grpcBookmarkClientService.getGrpcBookmarkService();

      client.deleteBookmark(req, (err) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        resolve(true);
      });
    });
  }
}
