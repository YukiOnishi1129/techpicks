"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

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
      isEng: true,
    };
  } else if (languageStatus === 1) {
    where = {
      ...where,
      isEng: false,
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
          isEng: languageStatus === 2,
          platform: {
            platformType: 1,
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
          isEng: languageStatus === 2,
          platform: {
            platformType: 2,
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
          isEng: languageStatus === 2,
          platform: {
            platformType: 3,
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

  where = {
    ...where,
    isPrivate: false,
  };

  try {
    const res = await prisma.article.findMany({
      take: LIMIT,
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
        favoriteArticles: {
          where: {
            userId: userId,
          },
        },
      },
    });

    const articleList: Array<ArticleType> = res.map((article) => {
      const isBookmarked = article.bookmarks.length > 0;
      const resArticle: ArticleType = {
        id: article.id,
        title: article.title,
        description: article.description,
        thumbnailURL: article.thumbnailURL,
        articleUrl: article.articleUrl,
        publishedAt: article.publishedAt,
        authorName: article.authorName,
        tags: article.tags,
        isEng: article.isEng,
        isPrivate: article.isPrivate,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
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
        isFollowing: article.favoriteArticles.length > 0,
        favoriteArticles: article.favoriteArticles,
      };
      if (article.platform) {
        resArticle.platform = {
          id: article.platform.id,
          name: article.platform.name,
          platformType: article.platform.platformType,
          siteUrl: article.platform.siteUrl,
          faviconUrl: article.platform.faviconUrl,
          isEng: article.platform.isEng,
        };
      }

      return resArticle;
    });

    return articleList;
  } catch (err) {
    throw new Error(`Failed to fetch articles: ${err}`);
  }
};

export type GetArticleByFeedIdsParams = {
  userId?: string;
  feedIds: Array<string>;
  keyword?: string;
  offset?: number;
};

export const getArticlesByFeedIds = async ({
  userId,
  feedIds,
  keyword,
  offset = 1,
}: GetArticleByFeedIdsParams) => {
  let where = {};
  if (keyword) {
    where = {
      AND: [
        {
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
          ],
        },
      ],
    };
  }

  where = {
    ...where,
    feedId: {
      in: feedIds,
    },
  };

  try {
    const res = await prisma.feedArticleRelation.findMany({
      take: LIMIT,
      skip: (offset - 1) * LIMIT,
      where,
      orderBy: [
        {
          article: {
            publishedAt: "desc",
          },
        },
      ],
      distinct: ["id"],
      include: {
        article: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnailURL: true,
            articleUrl: true,
            publishedAt: true,
            authorName: true,
            tags: true,
            isEng: true,
            isPrivate: true,
            createdAt: true,
            updatedAt: true,
            platformId: true,
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
              where: {
                feedId: {
                  in: feedIds,
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
            trendArticles: {
              select: {
                id: true,
                likeCount: true,
              },
              orderBy: {
                likeCount: "desc",
              },
            },
            favoriteArticles: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });

    const articles = res.map((feedArticle) => feedArticle.article);

    const articleList: Array<ArticleType> = articles.map((article) => {
      const isBookmarked = article.bookmarks.length > 0;
      const likeCount =
        article.trendArticles.length > 0
          ? article.trendArticles[0].likeCount
          : undefined;

      const resArticle: ArticleType = {
        id: article.id,
        title: article.title,
        description: article.description,
        thumbnailURL: article.thumbnailURL,
        articleUrl: article.articleUrl,
        publishedAt: article.publishedAt,
        authorName: article.authorName,
        tags: article.tags,
        isEng: article.isEng,
        isPrivate: article.isPrivate,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        isBookmarked: isBookmarked,
        bookmarkId: isBookmarked ? article.bookmarks[0].id : undefined,
        likeCount: likeCount,
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
        isFollowing: article.favoriteArticles.length > 0,
        favoriteArticles: article.favoriteArticles,
      };
      if (article.platform) {
        resArticle.platform = {
          id: article.platform.id,
          name: article.platform.name,
          siteUrl: article.platform.siteUrl,
          faviconUrl: article.platform.faviconUrl,
          platformType: article.platform.platformType,
          isEng: article.platform.isEng,
        };
      }
      return resArticle;
    });
    return articleList;
  } catch (err) {
    throw new Error(`Failed to fetch articles: ${err}`);
  }
};

type GetArticleByIdParam = {
  id: string;
  userId?: string;
};

export const getArticleById = async ({ id, userId }: GetArticleByIdParam) => {
  try {
    const article = await prisma.article.findFirst({
      where: {
        id: id,
      },
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
                apiQueryParam: true,
                trendPlatformType: true,
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
        favoriteArticles: {
          where: {
            userId: userId,
          },
        },
      },
    });

    if (!article) return;
    const isBookmarked =
      !!article?.bookmarks?.length && article.bookmarks.length > 0;
    const resArticle: ArticleType = {
      id: article.id,
      title: article.title,
      description: article.description,
      thumbnailURL: article.thumbnailURL,
      articleUrl: article.articleUrl,
      publishedAt: article.publishedAt,
      authorName: article.authorName,
      tags: article.tags,
      isEng: article.isEng,
      isPrivate: article.isPrivate,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
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
      isFollowing: article.favoriteArticles.length > 0,
      favoriteArticles: article.favoriteArticles,
    };

    if (article.platform) {
      resArticle.platform = {
        id: article.platform.id,
        name: article.platform.name,
        platformType: article.platform.platformType,
        siteUrl: article.platform.siteUrl,
        faviconUrl: article.platform.faviconUrl,
        isEng: article.platform.isEng,
      };
    }

    return resArticle;
  } catch (err) {
    throw new Error(`Failed to fetch article: ${err}`);
  }
};

type GetArticleByArticleUrlParam = {
  articleUrl: string;
  platformUrl: string;
  userId?: string;
};

export const getArticleByArticleAndPlatformUrl = async ({
  articleUrl,
  platformUrl,
  userId,
}: GetArticleByArticleUrlParam) => {
  try {
    const article = await prisma.article.findFirst({
      where: {
        articleUrl: {
          contains: articleUrl,
        },
        platform: {
          siteUrl: {
            contains: platformUrl,
          },
        },
      },
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
                apiQueryParam: true,
                trendPlatformType: true,
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
        favoriteArticles: {
          where: {
            userId: userId,
          },
        },
      },
    });

    if (!article) return;
    const isBookmarked =
      !!article?.bookmarks?.length && article.bookmarks.length > 0;
    const resArticle: ArticleType = {
      id: article.id,
      title: article.title,
      description: article.description,
      thumbnailURL: article.thumbnailURL,
      articleUrl: article.articleUrl,
      publishedAt: article.publishedAt,
      authorName: article.authorName,
      tags: article.tags,
      isEng: article.isEng,
      isPrivate: article.isPrivate,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
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
      isFollowing: article.favoriteArticles.length > 0,
      favoriteArticles: article.favoriteArticles,
    };

    if (article.platform) {
      resArticle.platform = {
        id: article.platform.id,
        name: article.platform.name,
        platformType: article.platform.platformType,
        siteUrl: article.platform.siteUrl,
        faviconUrl: article.platform.faviconUrl,
        isEng: article.platform.isEng,
      };
    }

    return resArticle;
  } catch (err) {
    throw new Error(`Failed to fetch article: ${err}`);
  }
};

type CreateArticleDTO = {
  platformId?: string;
  title: string;
  description: string;
  thumbnailURL: string;
  articleUrl: string;
  publishedAt?: Date;
  authorName?: string;
  tags?: string;
  isEng: boolean;
  isPrivate: boolean;
};

export const createArticle = async (dto: CreateArticleDTO) => {
  try {
    const uuid = uuidv4();
    const data = await prisma.article.create({
      data: {
        id: uuid,
        platformId: dto.platformId,
        title: dto.title,
        description: dto.description,
        thumbnailURL: dto.thumbnailURL,
        articleUrl: dto.articleUrl,
        publishedAt: dto.publishedAt,
        authorName: dto.authorName,
        tags: dto.tags,
        isEng: dto.isEng,
        isPrivate: dto.isPrivate,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to create article: ${err}`);
  }
};
