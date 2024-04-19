import {
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
} from "@prisma/client";

export type FeedType = Omit<
  PrismaFeed,
  "platformId" | "categoryId" | "rssUrl" | "deletedAt"
> & {
  category: Omit<PrismaCategory, "deletedAt">;
  platform: Omit<PrismaPlatform, "deletedAt">;
};
