import {
  FavoriteArticle as PrismaFavoriteArticle,
  favoriteArticleFolder as PrismaFavoriteArticleFolder,
} from "@prisma/client";

import { FavoriteArticleType } from "./favoriteArticle";

export type OriginFavoriteArticleFolderType = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

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
