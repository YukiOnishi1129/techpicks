import { FavoriteArticle as PrismaFavoriteArticle } from "@prisma/client";

export type FavoriteArticleType = Omit<PrismaFavoriteArticle, "userId">;
