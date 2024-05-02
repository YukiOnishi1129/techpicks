import {
  MyFeed as PrismaMyFeed,
  Feed as PrismaFeed,
  myFeedFolder as PrismaMyFeedFolder,
} from "@prisma/client";

export type MyFeedType = Omit<PrismaMyFeed, "userId"> & {
  feed: Omit<PrismaFeed, "rssUrl" | "deletedAt">;
  myFeedList: Omit<PrismaMyFeedFolder, "userId">;
};
