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
            isTrending: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        myFeedList: {
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
      myFeedListId: data.myFeedListId,
      feedId: data.feedId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      feed: data.feed,
      myFeedList: {
        id: data.myFeedList.id,
        title: data.myFeedList.title,
        description: data.myFeedList.description,
        createdAt: data.myFeedList.createdAt,
        updatedAt: data.myFeedList.updatedAt,
      },
    };

    return myFeedData;
  } catch (err) {
    throw new Error(`Failed to get my feed: ${err}`);
  }
};

export const getMyFeedCountByMyFeedListIdAndFeedId = async ({
  feedId,
  myFeedListId,
  userId,
}: {
  feedId: string;
  myFeedListId: string;
  userId: string;
}) => {
  try {
    const data = await prisma.myFeed.count({
      where: {
        feedId: feedId,
        myFeedListId: myFeedListId,
        userId: userId,
      },
    });
    return data;
  } catch (err) {
    throw new Error(`Failed to get my feed count: ${err}`);
  }
};

type createMyFeedDTO = {
  userId: string;
  myFeedListId: string;
  feedId: string;
};

export const createMyFeed = async (dto: createMyFeedDTO) => {
  try {
    const uuid = uuidv4();
    const data = await prisma.myFeed.create({
      data: {
        id: uuid,
        userId: dto.userId,
        myFeedListId: dto.myFeedListId,
        feedId: dto.feedId,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to create my feed list: ${err}`);
  }
};

type deleteMyFeedDTO = {
  feedId: string;
  userId: string;
};

export const deleteMyFeed = async ({ feedId, userId }: deleteMyFeedDTO) => {
  try {
    const data = await prisma.myFeed.delete({
      where: {
        id: feedId,
        userId: userId,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to delete my feed: ${err}`);
  }
};
