import prisma from "@/lib/prisma";

import { ArticleTabType, ArticleType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

const LIMIT = 20;

export type GetArticleParams = {
  userId?: string;
  platformId?: string;
  keyword?: string;
  languageStatus?: LanguageStatus;
  platformIdList: Array<string>;
  tab: ArticleTabType;
  offset?: number;
  sort?: "asc" | "desc";
  sortColum?: string;
};

export const getArticles = async ({
  userId,
  keyword,
  languageStatus = 1,
  platformIdList,
  tab,
  offset = 1,
  sort = "desc",
  sortColum = "publishedAt",
}: GetArticleParams): Promise<Array<ArticleType>> => {
  "use server";

  let orderBy = {};

  let where = {};
  if (keyword) {
    where = {
      AND: [
        {
          OR: [
            {
              title: {
                contains: keyword,
              },
            },
            {
              description: {
                contains: keyword,
              },
            },
            {
              tags: {
                contains: keyword,
              },
            },
          ],
        },
      ],
    };
  }

  if (languageStatus === 2) {
    where = {
      ...where,
      platform: {
        isEng: true,
      },
    };
  } else if (languageStatus === 1) {
    where = {
      ...where,
      platform: {
        isEng: false,
      },
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

  switch (tab) {
    case "trend":
      where = {
        ...where,
        feedArticleRelatoins: {
          none: {
            feed: {
              trendPlatformType: 0,
            },
          },
        },
      };
      break;
    case "site":
      where = {
        ...where,
        platform: {
          platformType: 1,
        },
      };
      if (languageStatus !== 0) {
        where = {
          ...where,
          platform: {
            platformType: 1,
            isEng: languageStatus === 2,
          },
        };
      }
      break;
    case "company":
      where = {
        ...where,
        platform: {
          platformType: 2,
        },
      };
      if (languageStatus !== 0) {
        where = {
          ...where,
          platform: {
            platformType: 2,
            isEng: languageStatus === 2,
          },
        };
      }
      break;
    case "summary":
      where = {
        ...where,
        platform: {
          platformType: 3,
        },
      };
      if (languageStatus !== 0) {
        where = {
          ...where,
          platform: {
            platformType: 3,
            isEng: languageStatus === 2,
          },
        };
      }
      break;
  }

  switch (sortColum) {
    case "publishedAt":
      orderBy = {
        publishedAt: sort,
      };
      break;
    default:
  }

  if (tab === "trend") {
    orderBy = [
      {
        createdAt: "desc",
      },
    ];
  }

  try {
    const res = await prisma.article.findMany({
      take: 20,
      skip: (offset - 1) * LIMIT,
      where,
      orderBy,
      include: {
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
                deletedAt: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                    type: true,
                  },
                },
              },
            },
          },
        },
        platform: {
          select: {
            id: true,
            name: true,
            siteUrl: true,
            faviconUrl: true,
            platformType: true,
            isEng: true,
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
    });

    const articleList: Array<ArticleType> = res.map((article) => {
      const isBookmarked = article.bookmarks.length > 0;
      return {
        id: article.id,
        title: article.title,
        description: article.description,
        thumbnailURL: article.thumbnailURL,
        articleUrl: article.articleUrl,
        publishedAt: article.publishedAt,
        authorName: article.authorName,
        tags: article.tags,
        isPrivate: article.isPrivate,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        platform: {
          id: article.platform.id,
          name: article.platform.name,
          platformType: article.platform.platformType,
          siteUrl: article.platform.siteUrl,
          faviconUrl: article.platform.faviconUrl,
          isEng: article.platform.isEng,
        },
        isBookmarked: isBookmarked,
        bookmarkId: isBookmarked ? article.bookmarks[0].id : undefined,
        feeds: article.feedArticleRelatoins.map((feed) => {
          return {
            id: feed.feed.id,
            name: feed.feed.name,
            description: feed.feed.description,
            thumbnailUrl: feed.feed.thumbnailUrl,
            siteUrl: feed.feed.siteUrl,
            apiQueryParam: feed.feed.apiQueryParam,
            trendPlatformType: feed.feed.trendPlatformType,
            category: {
              id: feed.feed.category.id,
              name: feed.feed.category.name,
              type: feed.feed.category.type,
            },
          };
        }),
      };
    });

    return articleList;
  } catch (err) {
    throw new Error(`Failed to fetch articles: ${err}`);
  }
};

type GetArticleByArticleUrlParam = {
  articleUrl: string;
  platformUrl: string;
  userId?: string;
};
