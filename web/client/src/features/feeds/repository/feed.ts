"use server";

import prisma from "@/lib/prisma";

import { FeedType } from "@/types/feed";

const LIMIT = 20;

export type GetFeedParams = {
  offset?: number;
};

export const getFeed = async ({ offset = 1 }: GetFeedParams) => {
  try {
    const res = await prisma.feed.findMany({
      take: 20,
      skip: (offset - 1) * LIMIT,
      where: {
        deletedAt: null,
      },
      orderBy: [
        {
          platform: {
            platformType: "asc",
          },
        },
        {
          platform: {
            isEng: "asc",
          },
        },
        {
          platform: {
            name: "asc",
          },
        },
        {
          category: {
            type: "asc",
          },
        },
        {
          category: {
            name: "asc",
          },
        },
      ],
      include: {
        category: true,
        platform: true,
      },
    });

    const feeds: Array<FeedType> = res.map((feed) => {
      const resFeed: FeedType = {
        id: feed.id,
        name: feed.name,
        description: feed.description,
        thumbnailUrl: feed.thumbnailUrl,
        siteUrl: feed.siteUrl,
        isTrending: feed.isTrending,
        createdAt: feed.createdAt,
        updatedAt: feed.updatedAt,
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
        feedArticleRelatoins: {
          select: {
            article: {
              select: {
                id: true,
                title: true,
                description: true,
                articleUrl: true,
                publishedAt: true,
                thumbnailURL: true,
                isPrivate: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });

    if (!res) throw new Error(`My feed list not found`);
    const resFeed: FeedType = {
      id: res.id,
      name: res.name,
      description: res.description,
      thumbnailUrl: res.thumbnailUrl,
      siteUrl: res.siteUrl,
      isTrending: res.isTrending,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      category: res.category,
      platform: res.platform,
      articles: res.feedArticleRelatoins.map((feedArticleRelatoins) => {
        return {
          id: feedArticleRelatoins.article.id,
          title: feedArticleRelatoins.article.title,
          description: feedArticleRelatoins.article.description,
          articleUrl: feedArticleRelatoins.article.articleUrl,
          publishedAt: feedArticleRelatoins.article.publishedAt,
          thumbnailURL: feedArticleRelatoins.article.thumbnailURL,
          isPrivate: feedArticleRelatoins.article.isPrivate,
          createdAt: feedArticleRelatoins.article.createdAt,
          updatedAt: feedArticleRelatoins.article.updatedAt,
        };
      }),
    };

    return resFeed;
  } catch (err) {
    throw new Error(`Failed to get feed by id: ${err}`);
  }
};
