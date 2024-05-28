import {
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
  Article as PrismaArticle,
  MyFeed as PrismaMyFeed,
} from "@prisma/client";

export type OriginFeedType = {
  id: string;
  platformId: string;
  categoryId: string;
  name: string;
  description: string;
  rssUrl: string;
  siteUrl: string;
  thumbnailUrl: string;
  trendPlatformType: number;
  apiQueryParam?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type FeedType = Omit<
  PrismaFeed,
  "platformId" | "categoryId" | "rssUrl" | "deletedAt"
> & {
  category: Omit<PrismaCategory, "deletedAt">;
  platform: Omit<PrismaPlatform, "deletedAt">;
  articles?: Array<Omit<PrismaArticle, "platformId">>;
  myFeeds?: Array<PrismaMyFeed>;
  isFollowing?: boolean;
};
