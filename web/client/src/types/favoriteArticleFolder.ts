import { FavoriteArticle } from "@prisma/client";

export type FavoriteArticleType = Omit<FavoriteArticle, "userId">;
