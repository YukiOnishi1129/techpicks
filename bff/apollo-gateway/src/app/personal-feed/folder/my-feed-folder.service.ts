import {
  GetMyFeedFoldersRequest,
  CreateMyFeedFolderRequest,
  UpdateMyFeedFolderRequest,
} from '@checkpicks/checkpicks-rpc-ts/src/grpc/my_feed/my_feed_pb';
import { Injectable } from '@nestjs/common';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import { GrpcMyFeedClientService } from 'src/app/grpc/grpc-my-feed-client.service';
import {
  MyFeedFoldersInput,
  MyFeedFolderConnection,
  CreateMyFeedFolderInput,
  MyFeedFolder,
  UpdateMyFeedFolderInput,
} from 'src/graphql/types/graphql';

import { convertTimestampToInt } from '../../../utils/timestamp';

@Injectable()
export class MyFeedFolderService {
  constructor(
    private readonly grpcMyFeedClientService: GrpcMyFeedClientService,
  ) {}

  async getMyFeedFolders(
    userId: string,
    input: MyFeedFoldersInput,
  ): Promise<MyFeedFolderConnection> {
    const req = new GetMyFeedFoldersRequest();
    req.setUserId(userId);
    if (input?.first) req.setLimit(input.first);
    if (input?.after) req.setCursor(input.after);
    if (input?.keyword) {
      const keyword = new StringValue();
      keyword.setValue(input.keyword);
      req.setKeyword(keyword);
    }

    return new Promise((resolve, reject) => {
      const client = this.grpcMyFeedClientService.getGrpcMyFeedService();
      client.getMyFeedFolders(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resFolders = res.toObject();

        const myFeedFolderEdges = resFolders?.myFeedFolderEdgesList;

        const folders: MyFeedFolderConnection = {
          edges: myFeedFolderEdges.map((edge) => {
            edge.node.feedsList;
            return {
              cursor: edge.cursor,
              node: {
                createdAt: convertTimestampToInt(edge.node?.createdAt),
                description: edge.node?.description?.value || '',
                feeds: edge.node.feedsList.map((feed) => {
                  return {
                    apiQueryParams: feed.apiQueryParam.value || '',
                    category: {
                      createdAt: convertTimestampToInt(feed.category.createdAt),
                      id: feed.category.id,
                      name: feed.category.name,
                      type: feed.category.type,
                      updatedAt: convertTimestampToInt(feed.category.updatedAt),
                    },
                    createdAt: convertTimestampToInt(feed.createdAt),
                    description: feed.description,
                    id: feed.id,
                    name: feed.name,
                    platform: {
                      createdAt: convertTimestampToInt(feed.platform.createdAt),
                      faviconUrl: feed.platform.faviconUrl,
                      id: feed.platform.id,
                      isEng: feed.platform.isEng,
                      name: feed.platform.name,
                      platformSiteType: feed.platform.platformSiteType,
                      siteUrl: feed.platform.siteUrl,
                      updatedAt: convertTimestampToInt(feed.platform.updatedAt),
                    },
                    rssUrl: feed.rssUrl,
                    siteUrl: feed.siteUrl,
                    thumbnailUrl: feed.thumbnailUrl,
                    trendPlatformType: feed.trendPlatformType,
                    updatedAt: convertTimestampToInt(feed.updatedAt),
                  };
                }),
                id: edge.node?.id || '',
                title: edge.node?.title || '',
                updatedAt: convertTimestampToInt(edge.node?.updatedAt),
                userId: edge.node?.userId || '',
              },
            };
          }),
          pageInfo: {
            endCursor: resFolders?.pageInfo?.endCursor || '',
            hasNextPage: resFolders?.pageInfo?.hasNextPage,
            hasPreviousPage: false,
          },
        };

        resolve(folders);
      });
    });
  }

  async createMyFeedFolder(
    userId: string,
    createMyFeedFolderInput: CreateMyFeedFolderInput,
  ): Promise<MyFeedFolder> {
    const req = new CreateMyFeedFolderRequest();
    req.setUserId(userId);
    req.setTitle(createMyFeedFolderInput.title);
    if (createMyFeedFolderInput?.description) {
      const description = new StringValue();
      description.setValue(createMyFeedFolderInput.description);
      req.setDescription(description);
    }

    if (
      createMyFeedFolderInput?.feedIds &&
      createMyFeedFolderInput.feedIds.length > 0
    ) {
      req.setFeedIdListList(createMyFeedFolderInput.feedIds);
    }

    return new Promise((resolve, reject) => {
      const client = this.grpcMyFeedClientService.getGrpcMyFeedService();
      client.createMyFeedFolder(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resFolder = res.toObject().myFeedFolder;

        const folder: MyFeedFolder = {
          createdAt: convertTimestampToInt(resFolder.createdAt),
          description: resFolder?.description.value,
          feeds: resFolder.feedsList.map((feed) => {
            return {
              apiQueryParams: feed.apiQueryParam.value || '',
              category: {
                createdAt: convertTimestampToInt(feed.category.createdAt),
                id: feed.category.id,
                name: feed.category.name,
                type: feed.category.type,
                updatedAt: convertTimestampToInt(feed.category.updatedAt),
              },
              createdAt: convertTimestampToInt(feed.createdAt),
              description: feed.description,
              id: feed.id,
              name: feed.name,
              platform: {
                createdAt: convertTimestampToInt(feed.platform.createdAt),
                faviconUrl: feed.platform.faviconUrl,
                id: feed.platform.id,
                isEng: feed.platform.isEng,
                name: feed.platform.name,
                platformSiteType: feed.platform.platformSiteType,
                siteUrl: feed.platform.siteUrl,
                updatedAt: convertTimestampToInt(feed.platform.updatedAt),
              },
              rssUrl: feed.rssUrl,
              siteUrl: feed.siteUrl,
              thumbnailUrl: feed.thumbnailUrl,
              trendPlatformType: feed.trendPlatformType,
              updatedAt: convertTimestampToInt(feed.updatedAt),
            };
          }),
          id: resFolder.id,

          title: resFolder.title,
          updatedAt: convertTimestampToInt(resFolder.updatedAt),
          userId: resFolder.userId,
        };

        resolve(folder);
      });
    });
  }

  async updateMyFeedFolder(
    userId: string,
    updateMyFeedFolderInput: UpdateMyFeedFolderInput,
  ): Promise<MyFeedFolder> {
    const req = new UpdateMyFeedFolderRequest();
    req.setUserId(userId);
    req.setMyFeedFolderId(updateMyFeedFolderInput.myFeedFolderId);
    req.setTitle(updateMyFeedFolderInput.title);
    if (updateMyFeedFolderInput?.description) {
      const description = new StringValue();
      description.setValue(updateMyFeedFolderInput.description);
      req.setDescription(description);
    }

    if (
      updateMyFeedFolderInput?.feedIds &&
      updateMyFeedFolderInput.feedIds.length > 0
    ) {
      req.setFeedIdListList(updateMyFeedFolderInput.feedIds);
    }

    return new Promise((resolve, reject) => {
      const client = this.grpcMyFeedClientService.getGrpcMyFeedService();
      client.updateMyFeedFolder(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resFolder = res.toObject().myFeedFolder;

        const folder: MyFeedFolder = {
          createdAt: convertTimestampToInt(resFolder.createdAt),
          description: resFolder?.description.value,
          feeds: resFolder.feedsList.map((feed) => {
            return {
              apiQueryParams: feed.apiQueryParam.value || '',
              category: {
                createdAt: convertTimestampToInt(feed.category.createdAt),
                id: feed.category.id,
                name: feed.category.name,
                type: feed.category.type,
                updatedAt: convertTimestampToInt(feed.category.updatedAt),
              },
              createdAt: convertTimestampToInt(feed.createdAt),
              description: feed.description,
              id: feed.id,
              name: feed.name,
              platform: {
                createdAt: convertTimestampToInt(feed.platform.createdAt),
                faviconUrl: feed.platform.faviconUrl,
                id: feed.platform.id,
                isEng: feed.platform.isEng,
                name: feed.platform.name,
                platformSiteType: feed.platform.platformSiteType,
                siteUrl: feed.platform.siteUrl,
                updatedAt: convertTimestampToInt(feed.platform.updatedAt),
              },
              rssUrl: feed.rssUrl,
              siteUrl: feed.siteUrl,
              thumbnailUrl: feed.thumbnailUrl,
              trendPlatformType: feed.trendPlatformType,
              updatedAt: convertTimestampToInt(feed.updatedAt),
            };
          }),
          id: resFolder.id,
          title: resFolder.title,
          updatedAt: convertTimestampToInt(resFolder.updatedAt),
          userId: resFolder.userId,
        };

        resolve(folder);
      });
    });
  }
}
