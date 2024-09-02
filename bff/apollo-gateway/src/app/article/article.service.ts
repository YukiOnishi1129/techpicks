import * as grpc from '@grpc/grpc-js';
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  StringValue,
  Int64Value,
} from 'google-protobuf/google/protobuf/wrappers_pb';

import { ArticleServiceClient } from '../../generate/content/content_grpc_pb';
import { GetArticlesRequest } from '../../generate/content/content_pb';
import { ArticleConnection, ArticlesInput } from '../../graphql/types/graphql';
import { convertTimestampToInt } from '../../utils/timestamp';

@Injectable()
export class ArticleService implements OnModuleInit {
  private articleService: ArticleServiceClient;

  constructor() {}

  onModuleInit() {
    this.articleService = new ArticleServiceClient(
      'checkpicks_content_service:3001',
      grpc.credentials.createInsecure(),
    );
    // this.articleService =
    //   this.client.getService<ArticleServiceClient>('ArticleService');
  }

  // create(createArticleInput: CreateArticleInput) {
  //   return `This action adds a new article ${createArticleInput}`;
  // }

  async getArticles(input: ArticlesInput): Promise<ArticleConnection> {
    const req = new GetArticlesRequest();
    if (input?.first) req.setLimit(input.first);
    if (input?.after) req.setCursor(input.after);
    if (input?.feedIds)
      req.setFeedIdsList(
        input.feedIds.map((feedId) => {
          const stringValue = new StringValue();
          stringValue.setValue(feedId);
          return stringValue;
        }),
      );
    if (input?.languageStatus)
      req.setLanguageStatus(new Int64Value().setValue(input.languageStatus));
    if (input?.tag) req.setTag(new StringValue().setValue(input.tag));
    if (input?.userId) req.setUserId(new StringValue().setValue(input.userId));

    return new Promise((resolve, reject) => {
      this.articleService.getArticles(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }
        const resArticles = res.toObject();

        const articles: ArticleConnection = {
          edges: resArticles?.articlesedgeList
            ? resArticles.articlesedgeList.map((edge) => {
                return {
                  cursor: edge.article.id,
                  node: {
                    articleUrl: edge.article.articleUrl,
                    createdAt: convertTimestampToInt(edge.article.createdAt),
                    description: edge.article.description,
                    feeds: edge.article?.feedsList
                      ? edge.article.feedsList.map((feed) => {
                          return {
                            apiQueryParam: feed?.apiQueryParam?.value,
                            category: {
                              createdAt: convertTimestampToInt(
                                feed.category.createdAt,
                              ),
                              id: feed.category.id,
                              name: feed.category.name,
                              type: feed.category.type,
                              updatedAt: convertTimestampToInt(
                                feed.category.updatedAt,
                              ),
                            },
                            createdAt: convertTimestampToInt(feed.createdAt),
                            description: feed.description,
                            id: feed.id,
                            name: feed.name,
                            platform: {
                              createdAt: convertTimestampToInt(
                                feed.platform.createdAt,
                              ),
                              faviconUrl: feed.platform.faviconUrl,
                              id: feed.platform.id,
                              isEng: feed.platform.isEng,
                              name: feed.platform.name,
                              platformSiteType: feed.platform.platformSiteType,
                              siteUrl: feed.platform.siteUrl,
                              updatedAt: convertTimestampToInt(
                                feed.platform.updatedAt,
                              ),
                            },
                            rssUrl: feed.rssurl,
                            siteUrl: feed.siteurl,
                            thumbnailUrl: feed.thumbnailUrl,
                            trendPlatformType: feed.trendPlatformType,
                            updatedAt: convertTimestampToInt(feed.updatedAt),
                          };
                        })
                      : [],
                    id: edge.article.id,
                    isBookmarked: false,
                    isEng: edge.article.isEng,
                    isFollowing: false,
                    isPrivate: edge.article?.isPrivate || false,
                    likeCount: edge.article.likeCount,
                    platform: {
                      createdAt: convertTimestampToInt(
                        edge.article.platform.createdAt,
                      ),
                      faviconUrl: edge.article.platform.faviconUrl,
                      id: edge.article.platform.id,
                      isEng: edge.article.platform.isEng,
                      name: edge.article.platform.name,
                      platformSiteType: edge.article.platform.platformSiteType,
                      siteUrl: edge.article.platform.siteUrl,
                      updatedAt: convertTimestampToInt(
                        edge.article.platform.updatedAt,
                      ),
                    },
                    publishedAt: convertTimestampToInt(
                      edge.article.publishedAt,
                    ),
                    thumbnailUrl: edge.article.thumbnailUrl,
                    title: edge.article.title,
                    updatedAt: convertTimestampToInt(edge.article.updatedAt),
                  },
                };
              })
            : [],
          pageInfo: {
            endCursor: resArticles.pageInfo?.endCursor,
            hasNextPage: resArticles.pageInfo?.hasNextPage,
            hasPreviousPage: false,
          },
        };

        resolve(articles);
      });
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} article`;
  // }

  // update(id: number, updateArticleInput: UpdateArticleInput) {
  //   return `This action updates a #${id} article`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} article`;
  // }
}
