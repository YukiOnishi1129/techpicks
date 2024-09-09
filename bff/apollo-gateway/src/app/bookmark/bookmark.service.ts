import { Injectable } from '@nestjs/common';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import {
  CreateBookmarkInput,
  Bookmark,
  DeleteBookmarkInput,
} from 'src/graphql/types/graphql';
import {
  CreateBookmarkRequest,
  DeleteBookmarkRequest,
} from 'src/grpc/bookmark/bookmark_pb';
import { convertTimestampToInt } from 'src/utils/timestamp';

import { GrpcBookmarkClientService } from '../grpc/grpc-bookmark-client.service';

@Injectable()
export class BookmarkService {
  constructor(
    private readonly grpcBookmarkClientService: GrpcBookmarkClientService,
  ) {}

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
          id: resBookmark.id,
          isEng: resBookmark.isEng,
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
