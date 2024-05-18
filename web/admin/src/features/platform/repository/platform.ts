"use server";

import prisma from "@/lib/prisma";

import { PlatformType } from "@/types/platform";

export type GetPlatformsDT0 = {
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

export const getPlatforms = async ({
  offset = 1,
  keyword,
  language,
  platformSiteType,
}: GetPlatformsDT0) => {
  const limit = 8;
  let where = {};
  if (keyword) {
    where = {
      AND: [
        {
          OR: [
            {
              name: {
                contains: keyword,
              },
            },
          ],
        },
      ],
    };
  }

  if (language) {
    where = {
      ...where,
      isEng: {
        equals: language === "2" ? true : false,
      },
    };
  }

  let argPlatformSiteType = 0;
  switch (platformSiteType) {
    case "1":
      argPlatformSiteType = 1;
      break;
    case "2":
      argPlatformSiteType = 2;
      break;
    case "3":
      argPlatformSiteType = 3;
      break;
    default:
      argPlatformSiteType = 0;
      break;
  }

  if (argPlatformSiteType) {
    where = {
      ...where,
      platformSiteType: {
        equals: argPlatformSiteType,
      },
    };
  }

  try {
    const platforms = await prisma.platform.findMany({
      take: limit,
      skip: (offset - 1) * limit,
      where,
      orderBy: {
        createdAt: "asc",
      },
      include: {
        feeds: {
          select: {
            id: true,
            name: true,
            description: true,
            thumbnailUrl: true,
            platformId: true,
            categoryId: true,
            siteUrl: true,
            rssUrl: true,
            apiQueryParam: true,
            trendPlatformType: true,
            deletedAt: true,
            createdAt: true,
            updatedAt: true,
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
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    const resPlatforms: Array<PlatformType> = platforms.map((platform) => {
      const resPlatform: PlatformType = {
        id: platform.id,
        name: platform.name,
        siteUrl: platform.siteUrl,
        platformSiteType: platform.platformSiteType,
        faviconUrl: platform.faviconUrl,
        isEng: platform.isEng,
        deletedAt: platform?.deletedAt || undefined,
        createdAt: platform.createdAt,
        updatedAt: platform.updatedAt,
        feeds: platform.feeds.map((feed) => {
          return {
            id: feed.id,
            name: feed.name,
            description: feed.description,
            thumbnailUrl: feed.thumbnailUrl,
            platformId: feed.platformId,
            categoryId: feed.categoryId,
            siteUrl: feed.siteUrl,
            rssUrl: feed.rssUrl,
            apiQueryParam: feed?.apiQueryParam || undefined,
            trendPlatformType: feed.trendPlatformType,
            deletedAt: feed?.deletedAt || undefined,
            createdAt: feed.createdAt,
            updatedAt: feed.updatedAt,
            category: {
              id: feed.category.id,
              name: feed.category.name,
              type: feed.category.type,
              createdAt: feed.category.createdAt,
              updatedAt: feed.category.updatedAt,
              deletedAt: feed.category?.deletedAt || undefined,
            },
          };
        }),
      };
      return resPlatform;
    });

    return resPlatforms;
  } catch (err) {
    throw new Error(`Failed to get platforms: ${err}`);
  }
};

export type GetPlatformsCountDT0 = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

export const getPlatformsCount = async ({
  keyword,
  language,
  platformSiteType,
}: GetPlatformsCountDT0) => {
  let where = {};
  if (keyword) {
    where = {
      AND: [
        {
          OR: [
            {
              name: {
                contains: keyword,
              },
            },
          ],
        },
      ],
    };
  }

  if (language) {
    where = {
      ...where,
      isEng: {
        equals: language === "2" ? true : false,
      },
    };
  }

  let argPlatformSiteType = 0;
  switch (platformSiteType) {
    case "1":
      argPlatformSiteType = 1;
      break;
    case "2":
      argPlatformSiteType = 2;
      break;
    case "3":
      argPlatformSiteType = 3;
      break;
    default:
      argPlatformSiteType = 0;
      break;
  }

  if (argPlatformSiteType) {
    where = {
      ...where,
      platformSiteType: {
        equals: argPlatformSiteType,
      },
    };
  }

  try {
    const count = await prisma.platform.count({
      where,
    });

    return count;
  } catch (err) {
    throw new Error(`Failed to get platforms count: ${err}`);
  }
};
