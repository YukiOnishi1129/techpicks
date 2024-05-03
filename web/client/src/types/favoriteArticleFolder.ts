import {
  FavoriteArticle as PrismaFavoriteArticle,
  favoriteArticleFolder as PrismaFavoriteArticleFolder,
} from "@prisma/client";

import { FavoriteArticleType } from "./favoriteArticle";

export type FavoriteArticleFolderType = Omit<
  PrismaFavoriteArticleFolder,
  "userId"
> & {
  favoriteArticles: Array<
    Omit<PrismaFavoriteArticle, "userId" | "createdAt" | "updatedAt">
  >;
};

export type FetchFavoriteArticlesAPIResponse = {
  data: {
    favoriteArticles: Array<FavoriteArticleType>;
    message: string;
  };
  status: number;
};

export type FetchFavoriteArticlesByFavoriteArticleFolderIdAPIArg = {
  favoriteArticleFolderId: string;
  offset?: string;
  keyword?: string;
};

export type FetchFavoriteArticleAPIResponse = {
  data: {
    favoriteArticle?: FavoriteArticleType;
    message: string;
  };
  status: number;
};
