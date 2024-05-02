import {
  FavoriteArticle as PrismaFavoriteArticle,
  favoriteArticleFolder as PrismaFavoriteArticleFolder,
} from "@prisma/client";

export type FavoriteArticleFolderType = Omit<
  PrismaFavoriteArticleFolder,
  "userId"
> & {
  favoriteArticles: Array<Omit<PrismaFavoriteArticle, "userId">>;
};
