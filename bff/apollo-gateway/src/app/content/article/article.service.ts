import {
  ListArticleRequest,
  GetArticleOGPRequest,
  UpsertArticleCommentRequest,
  DeleteArticleCommentRequest,
} from '@checkpicks/checkpicks-rpc-ts/src/grpc/content/content_pb';
import { Injectable } from '@nestjs/common';
import {
  StringValue,
  Int64Value,
} from 'google-protobuf/google/protobuf/wrappers_pb';

import {
  ArticleConnection,
  ArticlesInput,
  ArticleOGP,
  UpsertArticleCommentInput,
  ArticleComment,
  DeleteArticleCommentInput,
} from '../../../graphql/types/graphql';
import { convertTimestampToInt } from '../../../utils/timestamp';
import { GrpcContentClientService } from '../../grpc/grpc-content-client.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly grpcContentClientService: GrpcContentClientService,
  ) {}

  async getArticles(
    userId: string,
    input: ArticlesInput,
  ): Promise<ArticleConnection> {
    const req = new ListArticleRequest();
    if (input?.first) req.setLimit(input.first);
    if (input?.after) req.setCursor(input.after);
    if (input?.keywords && input.keywords.length !== 0) {
      const keywords = input.keywords.map((word) => {
        return new StringValue().setValue(word);
      });
      req.setKeywordsList(keywords);
    }
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
    if (input?.tab) req.setTag(new StringValue().setValue(input.tab));

    req.setUserId(new StringValue().setValue(userId));

    return new Promise((resolve, reject) => {
      const client = this.grpcContentClientService.getGrpcContentService();
      client.listArticle(req, (err, res) => {
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
                    bookmarkId: edge.article?.bookmarkId?.value,
                    comment: edge.article?.comment
                      ? {
                          comment: edge.article.comment.comment,
                          id: edge.article.comment.id,
                        }
                      : undefined,
                    createdAt: convertTimestampToInt(edge.article.createdAt),
                    description: edge.article.description,
                    favoriteArticleFolderIds: edge.article
                      ?.favoriteArticleFolderIdsList
                      ? edge.article?.favoriteArticleFolderIdsList
                      : [],
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
                            rssUrl: feed.rssUrl,
                            siteUrl: feed.siteUrl,
                            thumbnailUrl: feed.thumbnailUrl,
                            trendPlatformType: feed.trendPlatformType,
                            updatedAt: convertTimestampToInt(feed.updatedAt),
                          };
                        })
                      : [],
                    id: edge.article.id,
                    isBookmarked: false,
                    isEng: edge.article.isEng,
                    isFollowing: edge.article.isFollowing,
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

  async getArticleOgp(articleUrl: string): Promise<ArticleOGP> {
    const req = new GetArticleOGPRequest();
    req.setArticleUrl(articleUrl);

    return new Promise((resolve, reject) => {
      const client = this.grpcContentClientService.getGrpcContentService();
      client.getArticleOGP(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resArticleOgp = res.toObject();
        const articleOgp: ArticleOGP = {
          articleUrl: resArticleOgp.ogp.articleUrl,
          description: resArticleOgp.ogp?.description?.value,
          faviconUrl: resArticleOgp.ogp?.faviconUrl,
          siteName: resArticleOgp.ogp.siteName,
          siteUrl: resArticleOgp.ogp.siteUrl,
          thumbnailUrl: resArticleOgp.ogp.thumbnailUrl,
          title: resArticleOgp.ogp.title,
        };

        resolve(articleOgp);
      });
    });
  }

  async upsertArticleComment(
    userId: string,
    input: UpsertArticleCommentInput,
  ): Promise<ArticleComment> {
    const req = new UpsertArticleCommentRequest();
    req.setArticleId(input.articleId);
    req.setUserId(userId);
    req.setComment(input.comment);
    if (input.articleCommentId)
      req.setId(new StringValue().setValue(input.articleCommentId));

    return new Promise((resolve, reject) => {
      const client = this.grpcContentClientService.getGrpcContentService();
      client.upsertArticleComment(req, (err, res) => {
        if (err) {
          reject({
            code: err?.code || 500,
            message: err?.message || 'something went wrong',
          });
          return;
        }

        const resArticleComment = res.toObject();
        const articleComment: ArticleComment = {
          comment: resArticleComment.comment.comment,
          id: resArticleComment.comment.id,
        };

        resolve(articleComment);
      });
    });
  }

  async deleteArticleComment(
    userId: string,
    input: DeleteArticleCommentInput,
  ): Promise<boolean> {
    const req = new DeleteArticleCommentRequest();
    req.setUserId(userId);
    req.setId(input.articleCommentId);

    return new Promise((resolve, reject) => {
      const client = this.grpcContentClientService.getGrpcContentService();
      client.deleteArticleComment(req, (err) => {
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
