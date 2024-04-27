"use server";

import prisma from "@/lib/prisma";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";
import { TrendArticleType } from "@/types/trendArticle";

const LIMIT = 20;

export type GetTrendArticlesParams = {
  userId?: string;
  platformId?: string;
  keyword?: string;
  languageStatus?: LanguageStatus;
  platformIdList: Array<string>;
  tab: ArticleTabType;
  offset?: number;
  sort?: "asc" | "desc";
  sortColum?: string;
  startTime: Date;
  endTime: Date;
};

export const getTrendArticles = async ({
  userId,
  keyword,
  languageStatus = 1,
  platformIdList,
  offset = 1,
  sort = "desc",
  sortColum = "publishedAt",
  startTime,
  endTime,
}: GetTrendArticlesParams): Promise<TrendArticleType[]> => {
  let where = {};
  where = {
    updatedAt: {
      gte: startTime,
      lte: endTime,
    },
    platform: {
      isEng: languageStatus === 2,
    },
  };

  if (keyword) {
    where = {
      ...where,
      OR: [
        {
          article: {
            title: {
              contains: keyword,
            },
          },
        },
        {
          article: {
            description: {
              contains: keyword,
            },
          },
        },
        {
          article: {
            tags: {
              contains: keyword,
            },
          },
        },
      ],
    };
  }

  if (platformIdList.length) {
    where = {
      ...where,
      platformId: {
        in: [...platformIdList],
      },
    };
  }

  try {
    const res = await prisma.trendArticle.findMany({
      take: LIMIT,
      skip: LIMIT * (offset - 1),
      where,
      orderBy: [
        {
          likeCount: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
      include: {
        platform: true,
        article: {
          select: {
            id: true,
            title: true,
            description: true,
            articleUrl: true,
            publishedAt: true,
            authorName: true,
            tags: true,
            thumbnailURL: true,
            isPrivate: true,
            platform: true,
            createdAt: true,
            updatedAt: true,
            feedArticleRelatoins: {
              select: {
                feed: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    thumbnailUrl: true,
                    siteUrl: true,
                    rssUrl: true,
                    apiQueryParam: true,
                    trendPlatformType: true,
                    createdAt: true,
                    updatedAt: true,
                    category: true,
                  },
                },
              },
            },
            bookmarks: {
              select: {
                id: true,
              },
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });

    const trendArticleList: Array<TrendArticleType> = res.map(
      (trendArticle) => {
        const isBookmarked = !!trendArticle.article.bookmarks.length;

        let bookmarkId: string | undefined = "";
        if (trendArticle.article.bookmarks.length > 0) {
          bookmarkId = trendArticle.article.bookmarks[0].id;
        }

        return {
          id: trendArticle.id,
          articleId: trendArticle.articleId,
          likeCount: trendArticle.likeCount,
          createdAt: trendArticle.updatedAt,
          updatedAt: trendArticle.updatedAt,
          article: {
            id: trendArticle.article.id,
            title: trendArticle.article.title,
            description: trendArticle.article.description,
            articleUrl: trendArticle.article.articleUrl,
            publishedAt: trendArticle.article.publishedAt,
            authorName: trendArticle.article.authorName,
            tags: trendArticle.article.tags,
            thumbnailURL: trendArticle.article.thumbnailURL,
            isPrivate: trendArticle.article.isPrivate,
            createdAt: trendArticle.article.createdAt,
            updatedAt: trendArticle.article.updatedAt,
          },

          // title: trendArticle.article.title,
          // description: trendArticle.article.description,
          // articleUrl: trendArticle.article.articleUrl,
          // publishedAt: trendArticle.article.publishedAt,
          // authorName: trendArticle.article.authorName,
          // tags: trendArticle.article.tags,
          // thumbnailURL: trendArticle.article.thumbnailURL,
          // isPrivate: trendArticle.article.isPrivate,
          // articleCreatedAt: trendArticle.article.createdAt,
          // articleUpdatedAt: trendArticle.article.updatedAt,
          platform: {
            id: trendArticle.platform.id,
            name: trendArticle.platform.name,
            siteUrl: trendArticle.platform.siteUrl,
            faviconUrl: trendArticle.platform.faviconUrl,
            platformType: trendArticle.platform.platformType,
            isEng: trendArticle.platform.isEng,
          },
          feeds: trendArticle.article.feedArticleRelatoins.map(
            (feedArticleRelatoins) => {
              return {
                id: feedArticleRelatoins.feed.id,
                name: feedArticleRelatoins.feed.name,
                description: feedArticleRelatoins.feed.description,
                thumbnailUrl: feedArticleRelatoins.feed.thumbnailUrl,
                siteUrl: feedArticleRelatoins.feed.siteUrl,
                apiQueryParam: feedArticleRelatoins.feed.apiQueryParam,
                trendPlatformType: feedArticleRelatoins.feed.trendPlatformType,
                category: feedArticleRelatoins.feed.category,
              };
            }
          ),
          isBookmarked: isBookmarked,
          bookmarkId: bookmarkId,
        };
      }
    );
    return trendArticleList;
  } catch (err) {
    throw new Error(`Failed to fetch articles: ${err}`);
  }
};
