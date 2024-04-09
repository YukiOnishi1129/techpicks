import prisma from "@/lib/prisma";

import { ArticleType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

const LIMIT = 20;

export type GetArticleParams = {
  userId?: string;
  platformId?: string;
  keyword?: string;
  languageStatus?: LanguageStatus;
  platformIdList: Array<string>;
  offset?: number;
  sort?: "asc" | "desc";
  sortColum?: string;
};

export const getArticles = async ({
  userId,
  keyword,
  languageStatus = 1,
  platformIdList,
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
          ],
        },
        {
          platform: {
            isEng: languageStatus === 2,
          },
        },
      ],
    };
  } else {
    where = {
      platform: {
        isEng: languageStatus === 2,
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

  switch (sortColum) {
    case "publishedAt":
      orderBy = {
        publishedAt: sort,
      };
      break;
    default:
  }

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
              siteUrl: true,
              rssUrl: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
              category: {
                select: {
                  id: true,
                  name: true,
                  type: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
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
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
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
        createdAt: article.platform.createdAt,
        updatedAt: article.platform.updatedAt,
        deletedAt: article.platform.deletedAt,
      },
      isBookmarked: isBookmarked,
      feeds: article.feedArticleRelatoins.map((feed) => {
        return {
          id: feed.feed.id,
          name: feed.feed.name,
          siteUrl: feed.feed.siteUrl,
          rssUrl: feed.feed.rssUrl,
          createdAt: feed.feed.createdAt,
          updatedAt: feed.feed.updatedAt,
          deletedAt: feed.feed.deletedAt,
          category: {
            id: feed.feed.category.id,
            name: feed.feed.category.name,
            type: feed.feed.category.type,
            createdAt: feed.feed.category.createdAt,
            updatedAt: feed.feed.category.updatedAt,
            deletedAt: feed.feed.category.deletedAt,
          },
        };
      }),
    };
  });

  return articleList;
};
