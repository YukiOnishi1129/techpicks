import { Injectable } from '@nestjs/common';
import {
  CreateFavoriteArticleFolderInput,
  FavoriteArticleFolder,
} from 'src/graphql/types/graphql';
import { CreateFavoriteArticleFolderRequest } from 'src/grpc/favorite/favorite_pb';
import { convertTimestampToInt } from 'src/utils/timestamp';

import { GrpcFavoriteClientService } from '../grpc/grpc-favorite-client.service';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly grpcFavoriteClientService: GrpcFavoriteClientService,
  ) {}

  async createFavoriteArticleFolder(
    userId: string,
    input: CreateFavoriteArticleFolderInput,
  ): Promise<FavoriteArticleFolder> {
    return new Promise((resolve, reject) => {
      const req = new CreateFavoriteArticleFolderRequest();
      req.setUserId(userId);
      req.setTitle(input.title);
      req.setDescription(input.description);

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
}
