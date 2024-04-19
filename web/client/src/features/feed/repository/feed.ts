"use server";

import prisma from "@/lib/prisma";

import { FeedType } from "@/types/feed";

export const getFeed = async () => {
  try {
    const res = await prisma.feed.findMany({
      orderBy: {
        platform: {
          platformType: "asc",
          isEng: "asc",
          name: "asc",
        },
        category: {
          type: "asc",
          name: "asc",
        },
      },
      include: {
        category: true,
        platform: true,
      },
    });

    const feeds: Array<FeedType> = res.map((feed) => {
      const resFeed: FeedType = {
        ...feed,
        category: feed.category,
        platform: feed.platform,
      };
      return resFeed;
    });

    return feeds;
  } catch (err) {
    throw new Error("Failed to get feed");
  }
};
