import {
  TrendArticle as PrismaTrendArticle,
  Article as PrismaArticle,
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
} from "@prisma/client";

export type TrendArticleType = Omit<PrismaTrendArticle, "platformId"> & {
  title: PrismaArticle["title"];
  description: PrismaArticle["description"];
  articleUrl: PrismaArticle["articleUrl"];
  publishedAt: PrismaArticle["publishedAt"];
  authorName: PrismaArticle["authorName"];
  tags: PrismaArticle["tags"];
  thumbnailURL: PrismaArticle["thumbnailURL"];
  isPrivate: PrismaArticle["isPrivate"];
  platform: Omit<PrismaPlatform, "createdAt" | "updatedAt" | "deletedAt">;
  feeds: Array<
    Omit<
      PrismaFeed & {
        category: PrismaCategory;
      },
      | "platformId"
      | "categoryId"
      | "createdAt"
      | "updatedAt"
      | "deletedAt"
      | "rssUrl"
    >
  >;
  isBookmarked: boolean;
  bookmarkId?: string;
};
