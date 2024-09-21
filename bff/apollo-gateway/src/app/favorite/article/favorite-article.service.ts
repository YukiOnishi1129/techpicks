import { Injectable } from '@nestjs/common';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import {
  StringValue,
  Int64Value,
} from 'google-protobuf/google/protobuf/wrappers_pb';
import {
  CreateFavoriteArticleInput,
  FavoriteArticle,
  FavoriteArticleConnection,
  FavoriteArticlesInput,
  DeleteFavoriteArticleInput,
  FavoriteArticleEdge,
  DeleteFavoriteArticleByArticleIdInput,
  CreateFavoriteArticleForUploadArticleInput,
} from 'src/graphql/types/graphql';
import {
  CreateFavoriteArticleForUploadArticleRequest,
  CreateFavoriteArticleRequest,
  DeleteFavoriteArticleByArticleIdRequest,
  DeleteFavoriteArticleRequest,
  GetFavoriteArticlesRequest,
} from 'src/grpc/favorite/favorite_pb';
import { convertTimestampToInt } from 'src/utils/timestamp';

import { GrpcFavoriteClientService } from '../../grpc/grpc-favorite-client.service';

@Injectable()
export class FavoriteArticleService {
  constructor(
    private readonly grpcFavoriteClientService: GrpcFavoriteClientService,
  ) {}

  async getFavoriteArticles(
    userId: string,
    input: FavoriteArticlesInput,
  ): Promise<FavoriteArticleConnection> {
    const req = new GetFavoriteArticlesRequest();
    req.setUserId(userId);
    if (input?.first) req.setLimit(new Int64Value().setValue(input.first));
    if (input?.after) req.setCursor(new StringValue().setValue(input.after));
    if (input?.keyword)
      req.setKeyword(new StringValue().setValue(input.keyword));
    if (input?.folderId)
      req.setFavoriteArticleFolderId(
        new StringValue().setValue(input.folderId),
      );

    const client = this.grpcFavoriteClientService.getGrpcFavoriteService();

    return new Promise((resolve, reject) => {
      client.getFavoriteArticles(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resFavoriteArticles = res.toObject();

        const favoriteArticleEdges: FavoriteArticleEdge[] =
          resFavoriteArticles.favoriteArticlesEdgeList.map(
            (resFavoriteArticle) => {
              const article = resFavoriteArticle.node;
              return {
                cursor: article.id,
                node: {
                  articleId: article.articleId,
                  articleUrl: article.articleUrl,
                  authorName: article?.authorName?.value,
                  createdAt: convertTimestampToInt(article.createdAt),
                  description: article.description,
                  favoriteArticleFolderId: article.favoriteArticleFolderId,
                  id: article.id,
                  isEng: article.isEng,
                  isPrivate: article.isPrivate,
                  isRead: article.isRead,
                  platformFaviconUrl: article.platformFaviconUrl,
                  platformId: article?.platformId?.value,
                  platformName: article.platformName,
                  platformUrl: article.platformUrl,
                  publishedAt: article?.publishedAt
                    ? convertTimestampToInt(article.publishedAt)
                    : undefined,
                  tags: article?.tags?.value,
                  thumbnailUrl: article.thumbnailUrl,
                  title: article.title,
                  updatedAt: convertTimestampToInt(article.updatedAt),
                  userId: article.userId,
                },
              };
            },
          );

        const favoriteArticleConnection: FavoriteArticleConnection = {
          edges: favoriteArticleEdges,
          pageInfo: {
            endCursor: resFavoriteArticles.pageInfo.endCursor,
            hasNextPage: resFavoriteArticles.pageInfo.hasNextPage,
            hasPreviousPage: false,
          },
        };

        resolve(favoriteArticleConnection);
      });
    });
  }

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
          favoriteArticleFolderId: resFavoriteArticle.favoriteArticleFolderId,
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

  async createFavoriteArticleForUploadArticle(
    userId: string,
    input: CreateFavoriteArticleForUploadArticleInput,
  ): Promise<FavoriteArticle> {
    const req = new CreateFavoriteArticleForUploadArticleRequest();
    req.setUserId(userId);
    req.setFavoriteArticleFolderId(input.favoriteArticleFolderId);
    req.setTitle(input.title);
    req.setDescription(input.description);
    req.setThumbnailUrl(input.thumbnailUrl);
    req.setArticleUrl(input.articleUrl);
    req.setPlatformName(input.platformName);
    req.setPlatformUrl(input.platformUrl);
    req.setPlatformFaviconUrl(input.platformFaviconUrl);

    const client = this.grpcFavoriteClientService.getGrpcFavoriteService();

    return new Promise((resolve, reject) => {
      client.createFavoriteArticleForUploadArticle(req, (err, res) => {
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
          favoriteArticleFolderId: resFavoriteArticle.favoriteArticleFolderId,
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

  async deleteFavoriteArticle(
    userId: string,
    input: DeleteFavoriteArticleInput,
  ): Promise<boolean> {
    const client = this.grpcFavoriteClientService.getGrpcFavoriteService();
    const req = new DeleteFavoriteArticleRequest();
    req.setId(input.id);
    req.setUserId(userId);

    return new Promise((resolve, reject) => {
      client.deleteFavoriteArticle(req, (err) => {
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

  async deleteFavoriteArticleByArticleId(
    userId: string,
    input: DeleteFavoriteArticleByArticleIdInput,
  ): Promise<boolean> {
    const client = this.grpcFavoriteClientService.getGrpcFavoriteService();
    const req = new DeleteFavoriteArticleByArticleIdRequest();
    req.setArticleId(input.articleId);
    req.setUserId(userId);
    req.setFavoriteArticleFolderId(input.favoriteArticleFolderId);

    return new Promise((resolve, reject) => {
      client.deleteFavoriteArticlesByArticleId(req, (err) => {
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
