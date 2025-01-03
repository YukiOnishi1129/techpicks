import {
  GetFeedsRequest,
  GetFeedRequest,
} from '@checkpicks/checkpicks-rpc-ts/src/grpc/content/content_pb';
import { Injectable } from '@nestjs/common';
import {
  BoolValue,
  Int64Value,
  StringValue,
} from 'google-protobuf/google/protobuf/wrappers_pb';
import {
  FeedConnection,
  FeedsInput,
  Feed,
  FeedInput,
} from 'src/graphql/types/graphql';

import { convertTimestampToInt } from '../../../utils/timestamp';
import { GrpcContentClientService } from '../../grpc/grpc-content-client.service';
@Injectable()
export class FeedService {
  constructor(
    private readonly grpcContentClientService: GrpcContentClientService,
  ) {}

  async getFeeds(userId: string, input: FeedsInput): Promise<FeedConnection> {
    const req = new GetFeedsRequest();
    if (input?.first) req.setLimit(input.first);
    if (input?.after) req.setCursor(input.after);
    if (input?.platformSiteType)
      req.setPlatformSiteType(
        new Int64Value().setValue(input.platformSiteType),
      );
    if (input?.platformId)
      req.setPlatformId(new StringValue().setValue(input.platformId));
    if (input?.keyword)
      req.setKeyword(new StringValue().setValue(input.keyword));
    if (input?.isAllFetch)
      req.setIsAllFetch(new BoolValue().setValue(input.isAllFetch));

    req.setUserId(userId);

    return new Promise((resolve, reject) => {
      const client = this.grpcContentClientService.getGrpcContentService();
      client.getFeeds(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }
        const resFeeds = res.toObject();

        const feeds: FeedConnection = {
          edges: resFeeds?.feedEdgeList
            ? resFeeds.feedEdgeList.map((edge) => {
                const feed = edge.feed;
                return {
                  cursor: edge.cursor,
                  node: {
                    apiQueryParam: feed?.apiQueryParam?.value,
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
                    myFeedIds: feed.myFeedIdsList.map((myFeed) => myFeed),
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
                  },
                };
              })
            : [],
          pageInfo: {
            endCursor: resFeeds?.pageInfo?.endCursor || '',
            hasNextPage: resFeeds?.pageInfo?.hasNextPage || false,
            hasPreviousPage: false,
          },
        };

        resolve(feeds);
      });
    });
  }

  async getFeed(userId: string, input: FeedInput): Promise<Feed> {
    const req = new GetFeedRequest();
    req.setUserId(userId);
    req.setFeedId(input.id);

    return new Promise((resolve, reject) => {
      const client = this.grpcContentClientService.getGrpcContentService();
      client.getFeed(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resFeed = res.toObject().feed;

        const feed: Feed = {
          apiQueryParam: resFeed?.apiQueryParam?.value,
          category: {
            createdAt: convertTimestampToInt(resFeed.category.createdAt),
            id: resFeed.category.id,
            name: resFeed.category.name,
            type: resFeed.category.type,
            updatedAt: convertTimestampToInt(resFeed.category.updatedAt),
          },
          createdAt: convertTimestampToInt(resFeed.createdAt),
          description: resFeed.description,
          id: resFeed.id,
          myFeedIds: resFeed.myFeedIdsList.map((myFeed) => myFeed),
          name: resFeed.name,
          platform: {
            createdAt: convertTimestampToInt(resFeed.platform.createdAt),
            faviconUrl: resFeed.platform.faviconUrl,
            id: resFeed.platform.id,
            isEng: resFeed.platform.isEng,
            name: resFeed.platform.name,
            platformSiteType: resFeed.platform.platformSiteType,
            siteUrl: resFeed.platform.siteUrl,
            updatedAt: convertTimestampToInt(resFeed.platform.updatedAt),
          },
          rssUrl: resFeed.rssUrl,
          siteUrl: resFeed.siteUrl,
          thumbnailUrl: resFeed.thumbnailUrl,
          trendPlatformType: resFeed.trendPlatformType,
          updatedAt: convertTimestampToInt(resFeed.updatedAt),
        };

        resolve(feed);
      });
    });
  }
}
