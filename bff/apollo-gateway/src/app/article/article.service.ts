import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  StringValue,
  Int64Value,
} from 'google-protobuf/google/protobuf/wrappers_pb';
import { lastValueFrom } from 'rxjs';

import { ArticleConnection, ArticlesInput } from '../../graphql/types/graphql';
import {
  ArticleServiceClient,
  GetArticlesRequest,
} from '../../grpc/content/content';

@Injectable()
export class ArticleService implements OnModuleInit {
  private articleService: ArticleServiceClient;

  constructor(@Inject('ARTICLE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.articleService =
      this.client.getService<ArticleServiceClient>('ArticleService');
  }

  // create(createArticleInput: CreateArticleInput) {
  //   return `This action adds a new article ${createArticleInput}`;
  // }

  async getArticles(input: ArticlesInput): Promise<ArticleConnection> {
    const req: GetArticlesRequest = {
      cursor: input.after,
      languageStatus: new Int64Value({ value: input.userId }),
      limit: input.first,
      tag: new StringValue({ value: input.tag }),
      userId: new StringValue({ value: input.userId }),
    };

    const rpcRes = this.articleService.getArticles(req);
    const res = await lastValueFrom(rpcRes);

    const articles: ArticleConnection = {
      edges: res.articlesEdge.map((edge) => {
        return {
          cursor: edge.article.createdAt.seconds.toString(),
          node: {
            articleUrl: edge.article.articleUrl,
            createdAt: edge.article.createdAt.seconds,
            description: edge.article.description,
            feeds: edge.article.feeds.map((feed) => {
              return {
                apiQueryParam: feed.apiQueryParam,
                category: {
                  createdAt: feed.category.createdAt.seconds,
                  id: feed.category.id,
                  name: feed.category.name,
                  type: feed.category.type,
                  updatedAt: feed.category.updatedAt.seconds,
                },
                createdAt: feed.createdAt.seconds,
                description: feed.description,
                id: feed.id,
                name: feed.name,
                platform: {
                  createdAt: feed.platform.createdAt.seconds,
                  faviconUrl: feed.platform.faviconUrl,
                  id: feed.platform.id,
                  isEng: feed.platform.isEng,
                  name: feed.platform.name,
                  platformSiteType: feed.platform.platformSiteType,
                  siteUrl: feed.platform.siteUrl,
                  updatedAt: feed.platform.updatedAt.seconds,
                },
                rssUrl: feed.rssUrl,
                siteUrl: feed.siteUrl,
                thumbnailUrl: feed.thumbnailUrl,
                trendPlatformType: feed.trendPlatformType,
                updatedAt: feed.updatedAt.seconds,
              };
            }),
            id: edge.article.id,
            isBookmarked: false,
            isEng: edge.article.isEng,
            isFollowing: false,
            isPrivate: edge.article.isPrivate,
            platform: {
              createdAt: edge.article.platform.createdAt.seconds,
              faviconUrl: edge.article.platform.faviconUrl,
              id: edge.article.platform.id,
              isEng: edge.article.platform.isEng,
              name: edge.article.platform.name,
              platformSiteType: edge.article.platform.platformSiteType,
              siteUrl: edge.article.platform.siteUrl,
              updatedAt: edge.article.platform.updatedAt.seconds,
            },
            publishedAt: edge.article.publishedAt.seconds,
            thumbnailUrl: edge.article.thumbnailUrl,
            title: edge.article.title,
            updatedAt: edge.article.updatedAt.seconds,
          },
        };
      }),
      pageInfo: {
        endCursor: res.pageInfo.endCursor,
        hasNextPage: res.pageInfo.hasNextPage,
        hasPreviousPage: false,
      },
    };

    return articles;
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
