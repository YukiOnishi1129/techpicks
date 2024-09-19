import { Injectable } from '@nestjs/common';
import {
  Int64Value,
  StringValue,
  BoolValue,
} from 'google-protobuf/google/protobuf/wrappers_pb';
import {
  CreateFavoriteArticleFolderInput,
  FavoriteArticleFolder,
  FavoriteArticleFolderConnection,
  FavoriteArticleFoldersInput,
  FavoriteArticleFolderEdge,
  UpdateFavoriteArticleFolderInput,
  DeleteFavoriteArticleFolderInput,
} from 'src/graphql/types/graphql';
import {
  CreateFavoriteArticleFolderRequest,
  DeleteFavoriteArticleFolderRequest,
  GetFavoriteArticleFoldersRequest,
  UpdateFavoriteArticleFolderRequest,
} from 'src/grpc/favorite/favorite_pb';
import { convertTimestampToInt } from 'src/utils/timestamp';

import { GrpcFavoriteClientService } from '../../grpc/grpc-favorite-client.service';

@Injectable()
export class FavoriteArticleFolderService {
  constructor(
    private readonly grpcFavoriteClientService: GrpcFavoriteClientService,
  ) {}

  async getFavoriteArticleFolders(
    userId: string,
    input: FavoriteArticleFoldersInput,
  ): Promise<FavoriteArticleFolderConnection> {
    const req = new GetFavoriteArticleFoldersRequest();
    req.setUserId(userId);
    if (input?.first) req.setLimit(new Int64Value().setValue(input.first));
    if (input?.after) req.setCursor(new StringValue().setValue(input.after));
    if (input?.keyword)
      req.setKeyword(new StringValue().setValue(input.keyword));
    if (input?.isFolderOnly)
      req.setIsFolderOnly(new BoolValue().setValue(input.isFolderOnly));
    if (input?.isAllFetch)
      req.setIsAllFetch(new BoolValue().setValue(input.isAllFetch));
    const client = this.grpcFavoriteClientService.getGrpcFavoriteService();

    return new Promise((resolve, reject) => {
      client.getFavoriteArticleFolders(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resFavoriteArticleFolders = res.toObject();

        const favoriteArticleFolderEdges: FavoriteArticleFolderEdge[] =
          resFavoriteArticleFolders.favoriteArticleFoldersEdgeList.map(
            (favoriteArticleFolderEdge) => {
              const folder = favoriteArticleFolderEdge.node;
              return {
                cursor: folder.id,
                node: {
                  createdAt: convertTimestampToInt(folder.createdAt),
                  description: folder?.description,
                  favoriteArticles: folder.favoriteArticlesList.map(
                    (article) => {
                      return {
                        articleId: article.articleId,
                        articleUrl: article.articleUrl,
                        authorName: article?.authorName?.value,
                        createdAt: convertTimestampToInt(article.createdAt),
                        description: article.description,
                        favoriteArticleFolderId:
                          article.favoriteArticleFolderId,
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
                      };
                    },
                  ),
                  id: folder.id,
                  title: folder.title,
                  updatedAt: convertTimestampToInt(folder.updatedAt),
                  userId: folder.userId,
                },
              };
            },
          );

        const favoriteArticleFolderConnection: FavoriteArticleFolderConnection =
          {
            edges: favoriteArticleFolderEdges,
            pageInfo: {
              endCursor: resFavoriteArticleFolders.pageInfo.endCursor,
              hasNextPage: resFavoriteArticleFolders.pageInfo.hasNextPage,
              hasPreviousPage: false,
            },
          };

        resolve(favoriteArticleFolderConnection);
      });
    });
  }

  async createFavoriteArticleFolder(
    userId: string,
    input: CreateFavoriteArticleFolderInput,
  ): Promise<FavoriteArticleFolder> {
    return new Promise((resolve, reject) => {
      const req = new CreateFavoriteArticleFolderRequest();
      req.setUserId(userId);
      req.setTitle(input.title);
      if (input?.description) {
        req.setDescription(new StringValue().setValue(input.description));
      }

      const client = this.grpcFavoriteClientService.getGrpcFavoriteService();
      client.createFavoriteArticleFolder(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resFavoriteArticleFolder = res.toObject();

        const favoriteArticleFolder: FavoriteArticleFolder = {
          createdAt: convertTimestampToInt(
            resFavoriteArticleFolder.favoriteArticleFolder.createdAt,
          ),
          description:
            resFavoriteArticleFolder.favoriteArticleFolder.description,
          favoriteArticles: resFavoriteArticleFolder.favoriteArticleFolder
            ? resFavoriteArticleFolder.favoriteArticleFolder.favoriteArticlesList.map(
                (article) => {
                  return {
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
                  };
                },
              )
            : [],
          id: resFavoriteArticleFolder.favoriteArticleFolder.id,
          title: resFavoriteArticleFolder.favoriteArticleFolder.title,
          updatedAt: convertTimestampToInt(
            resFavoriteArticleFolder.favoriteArticleFolder.updatedAt,
          ),
          userId: resFavoriteArticleFolder.favoriteArticleFolder.userId,
        };

        resolve(favoriteArticleFolder);
      });
    });
  }

  async updateFavoriteArticleFolder(
    userId: string,
    input: UpdateFavoriteArticleFolderInput,
  ): Promise<FavoriteArticleFolder> {
    return new Promise((resolve, reject) => {
      const req = new UpdateFavoriteArticleFolderRequest();
      req.setId(input.id);
      req.setUserId(userId);
      req.setTitle(input.title);
      if (input.description) {
        req.setDescription(new StringValue().setValue(input.description));
      }

      const client = this.grpcFavoriteClientService.getGrpcFavoriteService();
      client.updateFavoriteArticleFolder(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resFavoriteArticleFolder = res.toObject();

        const favoriteArticleFolder: FavoriteArticleFolder = {
          createdAt: convertTimestampToInt(
            resFavoriteArticleFolder.favoriteArticleFolder.createdAt,
          ),
          description:
            resFavoriteArticleFolder.favoriteArticleFolder.description,
          favoriteArticles: resFavoriteArticleFolder.favoriteArticleFolder
            ? resFavoriteArticleFolder.favoriteArticleFolder.favoriteArticlesList.map(
                (article) => {
                  return {
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
                  };
                },
              )
            : [],
          id: resFavoriteArticleFolder.favoriteArticleFolder.id,
          title: resFavoriteArticleFolder.favoriteArticleFolder.title,
          updatedAt: convertTimestampToInt(
            resFavoriteArticleFolder.favoriteArticleFolder.updatedAt,
          ),
          userId: resFavoriteArticleFolder.favoriteArticleFolder.userId,
        };

        resolve(favoriteArticleFolder);
      });
    });
  }

  async deleteFavoriteArticleFolder(
    userId: string,
    input: DeleteFavoriteArticleFolderInput,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const req = new DeleteFavoriteArticleFolderRequest();
      req.setId(input.id);
      req.setUserId(userId);

      const client = this.grpcFavoriteClientService.getGrpcFavoriteService();
      client.deleteFavoriteArticleFolder(req, (err) => {
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
