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

export const getFeedById = async (id: string) => {
  try {
    const res = await prisma.feed.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        platform: true,
      },
    });

    if (!res) throw new Error(`My feed list not found`);
    const resFeed: FeedType = {
      id: res.id,
      name: res.name,
      siteUrl: res.siteUrl,
      isTrending: res.isTrending,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      category: res.category,
      platform: res.platform,
    };

    return resFeed;
  } catch (err) {
    throw new Error(`Failed to get feed by id: ${err}`);
  }
};
