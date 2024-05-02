import {
  Article as PrismaArticle,
  MyFeed as PrismaMyFeed,
  Feed as PrismaFeed,
  myFeedFolder as PrismaMyFeedFolder,
} from "@prisma/client";

export type MyFeedType = Omit<PrismaMyFeed, "userId"> & {
  feed: Omit<PrismaFeed, "rssUrl" | "deletedAt">;
  myFeedFolder: Omit<PrismaMyFeedFolder, "userId">;
  articles: Array<PrismaArticle>;
};
