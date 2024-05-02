"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/prisma";

import { MyFeedType } from "@/types/myFeed";
// eslint-disable-next-line import/named

type GetMyFeedById = {
  id: string;
  userId: string;
};

export const getMyFeedById = async ({ id, userId }: GetMyFeedById) => {
  try {
    const data = await prisma.myFeed.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        feed: {
          select: {
            id: true,
            name: true,
            description: true,
            thumbnailUrl: true,
            platformId: true,
            categoryId: true,
            siteUrl: true,
            apiQueryParam: true,
            trendPlatformType: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        myFeedFolder: {
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!data) return;

    const myFeedData: MyFeedType = {
      id: data.id,
      myFeedFolderId: data.myFeedFolderId,
      feedId: data.feedId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      feed: {
        id: data.feed.id,
        name: data.feed.name,
        description: data.feed.description,
        thumbnailUrl: data.feed.thumbnailUrl,
        platformId: data.feed.platformId,
        categoryId: data.feed.categoryId,
        siteUrl: data.feed.siteUrl,
        apiQueryParam: data.feed.apiQueryParam,
        trendPlatformType: data.feed.trendPlatformType,
        createdAt: data.feed.createdAt,
        updatedAt: data.feed.updatedAt,
      },
      myFeedList: {
        id: data.myFeedFolder.id,
        title: data.myFeedFolder.title,
        description: data.myFeedFolder.description,
        createdAt: data.myFeedFolder.createdAt,
        updatedAt: data.myFeedFolder.updatedAt,
      },
    };

    return myFeedData;
  } catch (err) {
    throw new Error(`Failed to get my feed: ${err}`);
  }
};

export const getMyFeedCountByMyFeedFolderIdAndFeedId = async ({
  feedId,
  myFeedFolderId,
  userId,
}: {
  feedId: string;
  myFeedFolderId: string;
  userId: string;
}) => {
  try {
    const data = await prisma.myFeed.count({
      where: {
        feedId: feedId,
        myFeedFolderId: myFeedFolderId,
        userId: userId,
      },
    });
    return data;
  } catch (err) {
    throw new Error(`Failed to get my feed count: ${err}`);
  }
};

export type CreateMyFeedDTO = {
  userId: string;
  myFeedFolderId: string;
  feedId: string;
};

export const createMyFeed = async (dto: CreateMyFeedDTO) => {
  try {
    const uuid = uuidv4();
    const data = await prisma.myFeed.create({
      data: {
        id: uuid,
        userId: dto.userId,
        myFeedFolderId: dto.myFeedFolderId,
        feedId: dto.feedId,
      },
    });
    return data;
  } catch (err) {
    throw new Error(`Failed to create my feed list: ${err}`);
  }
};

export const bulkCreateMyFeed = async (myFeedList: CreateMyFeedDTO[]) => {
  try {
    const data = await prisma.myFeed.createMany({
      data: myFeedList.map((myFeed) => {
        return {
          id: uuidv4(),
          userId: myFeed.userId,
          myFeedFolderId: myFeed.myFeedFolderId,
          feedId: myFeed.feedId,
        };
      }),
    });
    return data;
  } catch (err) {
    throw new Error(`Failed to bulk create my feed list: ${err}`);
  }
};

type deleteMyFeedDTO = {
  id: string;
  userId: string;
};

export const deleteMyFeed = async ({ id, userId }: deleteMyFeedDTO) => {
  try {
    const data = await prisma.myFeed.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to delete my feed: ${err}`);
  }
};

export const bulkDeleteMyFeed = async (myFeedIds: string[]) => {
  try {
    const data = await prisma.myFeed.deleteMany({
      where: {
        id: {
          in: myFeedIds,
        },
      },
    });
    return data.count;
  } catch (err) {
    throw new Error(`Failed to bulk delete my feed: ${err}`);
  }
};
