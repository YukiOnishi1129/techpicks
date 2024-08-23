import { Injectable } from '@nestjs/common';

import { ArticleConnection, ArticlesInput } from '../../graphql/types/graphql';

import { CreateArticleInput } from './dto/create-article.input';

@Injectable()
export class ArticleService {
  create(createArticleInput: CreateArticleInput) {
    return `This action adds a new article ${createArticleInput}`;
  }

  getArticles(articlesInput: ArticlesInput): ArticleConnection {
    console.log('🔥');
    console.log('input:', articlesInput);
    return {
      edges: [
        {
          cursor: '1',
          node: {
            articleUrl: 'article-1-articleUrl',
            createdAt: '2021-09-01T00:00:00Z',
            description: 'article-1-description',
            feeds: [],
            id: 'article-1',
            isBookmarked: false,
            isEng: true,
            isFollowing: false,
            isPrivate: false,
            platform: {
              createdAt: '2021-09-01T00:00:00Z',
              faviconUrl: 'platform-1-faviconUrl',
              id: 'platform-1',
              isEng: true,
              name: 'platform-1-name',
              platformSiteType: 1,
              siteUrl: 'platform-1-siteUrl',
              updatedAt: '2021-09-01T00:00:00Z',
            },
            publishedAt: '2021-09-01T00:00:00Z',
            thumbnailUrl: 'article-1-thumbnailUrl',
            title: 'article-1-title',
            updatedAt: '2021-09-01T00:00:00Z',
          },
        },
      ],
      pageInfo: {
        endCursor: '1',
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: '1',
      },
    };
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
