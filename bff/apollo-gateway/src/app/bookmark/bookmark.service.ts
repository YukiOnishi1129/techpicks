import { Injectable } from '@nestjs/common';
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
    req.setUserId(input.userId);

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
          publishedAt: convertTimestampToInt(resBookmark?.publishedAt),
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
    req.setId(input.bookmarkId);
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
