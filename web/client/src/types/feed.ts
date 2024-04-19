import {
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
  Article as PrismaArticle,
} from "@prisma/client";

export type FeedType = Omit<
  PrismaFeed,
  "platformId" | "categoryId" | "rssUrl" | "deletedAt"
> & {
  category: Omit<PrismaCategory, "deletedAt">;
  platform: Omit<PrismaPlatform, "deletedAt">;
  articles?: Array<Omit<PrismaArticle, "platformId">>;
};
