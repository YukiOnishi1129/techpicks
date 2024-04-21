import {
  MyFeed as PrismaMyFeed,
  Feed as PrismaFeed,
  MyFeedList as PrismaMyFeedList,
} from "@prisma/client";

export type MyFeedType = Omit<PrismaMyFeed, "userId"> & {
  feed: Omit<PrismaFeed, "rssUrl" | "deletedAt">;
  myFeedList: Omit<PrismaMyFeedList, "userId">;
};
