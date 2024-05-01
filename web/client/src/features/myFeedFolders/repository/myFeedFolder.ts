"use server";

// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/prisma";

import { MyFeedFolderType } from "@/types/myFeedFolder";

type GetMyFeedFolders = {
  userId: string;
  offset?: number;
};

const LIMIT = 20;

export const getMyFeedFolders = async ({
  userId,
  offset = 1,
}: GetMyFeedFolders) => {
  try {
    const res = await prisma.myFeedList.findMany({
      take: LIMIT,
      skip: (offset - 1) * LIMIT,
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        myFeeds: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
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
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
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
                  },
                },
              },
            },
          },
        },
        profile: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    const myFeedFolders: Array<MyFeedFolderType> = res.map((myFeedFolder) => {
      const resMyFeedFolder: MyFeedFolderType = {
        id: myFeedFolder.id,
        title: myFeedFolder.title,
        description: myFeedFolder.description,
        createdAt: myFeedFolder.createdAt,
        updatedAt: myFeedFolder.updatedAt,
        profile: {
          id: myFeedFolder.profile.id,
          name: myFeedFolder.profile.name,
          email: myFeedFolder.profile.email,
          image: myFeedFolder.profile.image,
          createdAt: myFeedFolder.profile.createdAt,
          updatedAt: myFeedFolder.profile.updatedAt,
        },
        feeds: myFeedFolder.myFeeds.map((myFeed) => {
          return {
            id: myFeed.feed.id,
            name: myFeed.feed.name,
            description: myFeed.feed.description,
            thumbnailUrl: myFeed.feed.thumbnailUrl,
            siteUrl: myFeed.feed.siteUrl,
            rssUrl: myFeed.feed.rssUrl,
            apiQueryParam: myFeed.feed.apiQueryParam,
            trendPlatformType: myFeed.feed.trendPlatformType,
            createdAt: myFeed.feed.createdAt,
            updatedAt: myFeed.feed.updatedAt,
            category: myFeed.feed.category,
            platform: {
              id: myFeed.feed.platform.id,
              name: myFeed.feed.platform.name,
              siteUrl: myFeed.feed.platform.siteUrl,
              faviconUrl: myFeed.feed.platform.faviconUrl,
              platformType: myFeed.feed.platform.platformType,
              isEng: myFeed.feed.platform.isEng,
              createdAt: myFeed.feed.platform.createdAt,
              updatedAt: myFeed.feed.platform.updatedAt,
            },
            myFeedId: myFeed.id,
          };
        }),
      };
      return resMyFeedFolder;
    });
    return myFeedFolders;
  } catch (err) {
    throw new Error(`Failed to get my feed folders: ${err}`);
  }
};

type GetMyFeedFolderById = {
  id: string;
  userId: string;
};

export const getMyFeedFolderById = async ({
  id,
  userId,
}: GetMyFeedFolderById) => {
  try {
    const myFeedFolder = await prisma.myFeedList.findUnique({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        myFeeds: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
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
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
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
                  },
                },
              },
            },
          },
        },
        profile: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!myFeedFolder) {
      throw new Error(`My feed list not found`);
    }

    const resMyFeedFolder: MyFeedFolderType = {
      id: myFeedFolder.id,
      title: myFeedFolder.title,
      description: myFeedFolder.description,
      createdAt: myFeedFolder.createdAt,
      updatedAt: myFeedFolder.updatedAt,
      profile: {
        id: myFeedFolder.profile.id,
        name: myFeedFolder.profile.name,
        email: myFeedFolder.profile.email,
        image: myFeedFolder.profile.image,
        createdAt: myFeedFolder.profile.createdAt,
        updatedAt: myFeedFolder.profile.updatedAt,
      },
      feeds: myFeedFolder.myFeeds.map((myFeed) => {
        return {
          id: myFeed.feed.id,
          name: myFeed.feed.name,
          description: myFeed.feed.description,
          thumbnailUrl: myFeed.feed.thumbnailUrl,
          siteUrl: myFeed.feed.siteUrl,
          rssUrl: myFeed.feed.rssUrl,
          apiQueryParam: myFeed.feed.apiQueryParam,
          trendPlatformType: myFeed.feed.trendPlatformType,
          createdAt: myFeed.feed.createdAt,
          updatedAt: myFeed.feed.updatedAt,
          category: {
            id: myFeed.feed.category.id,
            name: myFeed.feed.category.name,
            type: myFeed.feed.category.type,
            createdAt: myFeed.feed.category.createdAt,
            updatedAt: myFeed.feed.category.updatedAt,
          },
          platform: {
            id: myFeed.feed.platform.id,
            name: myFeed.feed.platform.name,
            siteUrl: myFeed.feed.platform.siteUrl,
            faviconUrl: myFeed.feed.platform.faviconUrl,
            platformType: myFeed.feed.platform.platformType,
            isEng: myFeed.feed.platform.isEng,
            createdAt: myFeed.feed.platform.createdAt,
            updatedAt: myFeed.feed.platform.updatedAt,
          },
          myFeedId: myFeed.id,
        };
      }),
    };

    return resMyFeedFolder;
  } catch (err) {
    throw new Error(`Failed to get my feed folder by id: ${err}`);
  }
};

type createMyFeedFolderDTO = {
  title: string;
  description: string;
  userId: string;
};

export const createMyFeedFolder = async (dto: createMyFeedFolderDTO) => {
  try {
    const uuid = uuidv4();
    const data = await prisma.myFeedList.create({
      data: {
        id: uuid,
        title: dto.title,
        description: dto.description,
        userId: dto.userId,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to create my feed folder: ${err}`);
  }
};

type updateMyFeedFolderDTO = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

export const updateMyFeedFolder = async (dto: updateMyFeedFolderDTO) => {
  try {
    const data = await prisma.myFeedList.update({
      where: {
        id: dto.id,
        userId: dto.userId,
      },
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to update my feed folder: ${err}`);
  }
};

export const deleteMyFeedFolder = async (id: string) => {
  try {
    await prisma.myFeedList.delete({
      where: {
        id: id,
      },
    });
  } catch (err) {
    throw new Error(`Failed to delete my feed folder: ${err}`);
  }
};
