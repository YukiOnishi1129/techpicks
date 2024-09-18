import { Injectable } from '@nestjs/common';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import {
  CreateFavoriteArticleInput,
  FavoriteArticle,
} from 'src/graphql/types/graphql';
import { CreateFavoriteArticleRequest } from 'src/grpc/favorite/favorite_pb';
import { convertTimestampToInt } from 'src/utils/timestamp';

import { GrpcFavoriteClientService } from '../../grpc/grpc-favorite-client.service';

@Injectable()
export class FavoriteArticleService {
  constructor(
    private readonly grpcFavoriteClientService: GrpcFavoriteClientService,
  ) {}

  async createFavoriteArticle(
    userId: string,
    input: CreateFavoriteArticleInput,
  ): Promise<FavoriteArticle> {
    const client = this.grpcFavoriteClientService.getGrpcFavoriteService();
    const req = new CreateFavoriteArticleRequest();
    req.setUserId(userId);
    req.setArticleId(input.articleId);
    req.setFavoriteArticleFolderId(input.favoriteArticleFolderId);
    req.setTitle(input.title);
    req.setThumbnailUrl(input.thumbnailUrl);
    req.setArticleUrl(input.articleUrl);
    req.setPlatformName(input.platformName);
    req.setPlatformUrl(input.platformUrl);
    req.setPlatformFaviconUrl(input.platformFaviconUrl);
    req.setIsEng(input.isEng);
    req.setIsPrivate(input.isPrivate);
    req.setIsRead(input.isRead);

    if (input?.platformId) {
      req.setPlatformId(new StringValue().setValue(input.platformId));
    }
    if (input?.description) {
      req.setDescription(new StringValue().setValue(input.description));
    }
    if (input?.publishedAt) {
      req.setPublishedAt(new Timestamp().setSeconds(input.publishedAt));
      req.setPlatformName(input.platformName);
    }
    if (input?.authorName) {
      req.setAuthorName(new StringValue().setValue(input.authorName));
    }
    if (input?.tags) {
      req.setTags(new StringValue().setValue(input.tags));
    }

    return new Promise((resolve, reject) => {
      client.createFavoriteArticle(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resFavoriteArticle = res.toObject().favoriteArticle;

        const favoriteArticle: FavoriteArticle = {
          articleId: resFavoriteArticle.articleId,
          articleUrl: resFavoriteArticle.articleUrl,
          authorName: resFavoriteArticle?.authorName?.value,
          createdAt: convertTimestampToInt(resFavoriteArticle.createdAt),
          description: resFavoriteArticle.description,
          id: resFavoriteArticle.id,
          isEng: resFavoriteArticle.isEng,
          isPrivate: resFavoriteArticle.isPrivate,
          isRead: resFavoriteArticle.isRead,
          platformFaviconUrl: resFavoriteArticle.platformFaviconUrl,
          platformId: resFavoriteArticle?.platformId?.value,
          platformName: resFavoriteArticle.platformName,
          platformUrl: resFavoriteArticle.platformUrl,
          publishedAt: resFavoriteArticle?.publishedAt
            ? convertTimestampToInt(resFavoriteArticle.publishedAt)
            : undefined,
          tags: resFavoriteArticle?.tags?.value,
          thumbnailUrl: resFavoriteArticle.thumbnailUrl,
          title: resFavoriteArticle.title,
          updatedAt: convertTimestampToInt(resFavoriteArticle.updatedAt),
          userId: resFavoriteArticle.userId,
        };

        resolve(favoriteArticle);
      });
    });
  }
}
