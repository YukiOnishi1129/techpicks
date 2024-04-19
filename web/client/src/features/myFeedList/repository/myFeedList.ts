"use server";

// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { MyFeedListType } from "@/types/myFeedList";

type GetMyFeedList = {
  userId: string;
};

export const getMyFeedList = async ({ userId }: GetMyFeedList) => {
  try {
    const res = await prisma.myFeedList.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        myFeeds: {
          select: {
            feed: {
              select: {
                id: true,
                name: true,
                siteUrl: true,
                rssUrl: true,
                isTrending: true,
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
    const myFeedLists: Array<MyFeedListType> = res.map((myFeedList) => {
      const resMyFeedList: MyFeedListType = {
        id: myFeedList.id,
        title: myFeedList.title,
        description: myFeedList.description,
        createdAt: myFeedList.createdAt,
        updatedAt: myFeedList.updatedAt,
        profile: {
          id: myFeedList.profile.id,
          name: myFeedList.profile.name,
          email: myFeedList.profile.email,
          image: myFeedList.profile.image,
          createdAt: myFeedList.profile.createdAt,
          updatedAt: myFeedList.profile.updatedAt,
        },
        feeds: myFeedList.myFeeds.map((myFeed) => {
          return {
            id: myFeed.feed.id,
            name: myFeed.feed.name,
            siteUrl: myFeed.feed.siteUrl,
            rssUrl: myFeed.feed.rssUrl,
            isTrending: myFeed.feed.isTrending,
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
          };
        }),
      };
      return resMyFeedList;
    });
    return myFeedLists;
  } catch (err) {
    throw new Error(`Failed to get my feed list: ${err}`);
  }
};

type GetMyFeedListById = {
  id: string;
  userId: string;
};

export const getMyFeedListById = async ({ id, userId }: GetMyFeedListById) => {
  try {
    const myFeedList = await prisma.myFeedList.findUnique({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        myFeeds: {
          select: {
            feed: {
              select: {
                id: true,
                name: true,
                siteUrl: true,
                rssUrl: true,
                isTrending: true,
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

    if (!myFeedList) {
      throw new Error(`My feed list not found`);
    }

    const resMyFeedList: MyFeedListType = {
      id: myFeedList.id,
      title: myFeedList.title,
      description: myFeedList.description,
      createdAt: myFeedList.createdAt,
      updatedAt: myFeedList.updatedAt,
      profile: {
        id: myFeedList.profile.id,
        name: myFeedList.profile.name,
        email: myFeedList.profile.email,
        image: myFeedList.profile.image,
        createdAt: myFeedList.profile.createdAt,
        updatedAt: myFeedList.profile.updatedAt,
      },
      feeds: myFeedList.myFeeds.map((myFeed) => {
        return {
          id: myFeed.feed.id,
          name: myFeed.feed.name,
          siteUrl: myFeed.feed.siteUrl,
          rssUrl: myFeed.feed.rssUrl,
          isTrending: myFeed.feed.isTrending,
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
        };
      }),
    };

    return resMyFeedList;
  } catch (err) {
    throw new Error(`Failed to get my feed list by id: ${err}`);
  }
};

type createMyFeedListDTO = {
  title: string;
  description: string;
  userId: string;
};

export const createMyFeedList = async (dto: createMyFeedListDTO) => {
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
    throw new Error(`Failed to create my feed list: ${err}`);
  }
};
