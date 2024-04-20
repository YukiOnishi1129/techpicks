"use server";

// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

export const getMyFeedCountByMyFeedListId = async ({
  myFeedListId,
  userId,
}: {
  myFeedListId: string;
  userId: string;
}) => {
  try {
    const data = await prisma.myFeed.count({
      where: {
        myFeedListId: myFeedListId,
        userId: userId,
      },
    });
    return data;
  } catch (err) {
    throw new Error(`Failed to get my feed count: ${err}`);
  }
};

type createMyFeed = {
  userId: string;
  myFeedListId: string;
  feedId: string;
};

export const createMyFeed = async (dto: createMyFeed) => {
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
