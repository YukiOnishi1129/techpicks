import {
  FavoriteArticleType,
  OriginFavoriteArticleType,
} from "./favoriteArticle";

export type OriginFavoriteArticleFolderType = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type FavoriteArticleFolderType = OriginFavoriteArticleFolderType & {
  favoriteArticles: Array<OriginFavoriteArticleType>;
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
