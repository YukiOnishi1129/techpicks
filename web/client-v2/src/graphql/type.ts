import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

/** Article schema */
export type Article = Node & {
  __typename?: "Article";
  articleUrl: Scalars["String"]["output"];
  authorName?: Maybe<Scalars["String"]["output"]>;
  bookmarkId?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["Int"]["output"];
  description: Scalars["String"]["output"];
  favoriteArticles?: Maybe<Array<FavoriteArticle>>;
  feeds?: Maybe<Array<Feed>>;
  id: Scalars["ID"]["output"];
  isBookmarked: Scalars["Boolean"]["output"];
  isEng: Scalars["Boolean"]["output"];
  isFollowing: Scalars["Boolean"]["output"];
  isPrivate: Scalars["Boolean"]["output"];
  likeCount?: Maybe<Scalars["Int"]["output"]>;
  platform?: Maybe<Platform>;
  publishedAt?: Maybe<Scalars["Int"]["output"]>;
  tags?: Maybe<Scalars["String"]["output"]>;
  thumbnailUrl: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["Int"]["output"];
};

export type ArticleConnection = {
  __typename?: "ArticleConnection";
  edges: Array<ArticleEdge>;
  pageInfo: PageInfo;
};

export type ArticleEdge = {
  __typename?: "ArticleEdge";
  cursor: Scalars["String"]["output"];
  node: Article;
};

export type ArticleOgp = {
  __typename?: "ArticleOGP";
  articleUrl: Scalars["String"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  faviconUrl: Scalars["String"]["output"];
  siteName: Scalars["String"]["output"];
  siteUrl: Scalars["String"]["output"];
  thumbnailUrl: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type ArticlesInput = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  feedIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  languageStatus?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  tab?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

/** Bookmark schema */
export type Bookmark = Node & {
  __typename?: "Bookmark";
  articleId: Scalars["String"]["output"];
  articleUrl: Scalars["String"]["output"];
  createdAt: Scalars["Int"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isEng: Scalars["Boolean"]["output"];
  isRead: Scalars["Boolean"]["output"];
  platformFaviconUrl: Scalars["String"]["output"];
  platformId?: Maybe<Scalars["String"]["output"]>;
  platformName: Scalars["String"]["output"];
  platformUrl: Scalars["String"]["output"];
  publishedAt?: Maybe<Scalars["Int"]["output"]>;
  thumbnailUrl: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["Int"]["output"];
};

export type BookmarkConnection = {
  __typename?: "BookmarkConnection";
  edges: Array<BookmarkEdge>;
  pageInfo: PageInfo;
};

export type BookmarkEdge = {
  __typename?: "BookmarkEdge";
  cursor: Scalars["String"]["output"];
  node: Bookmark;
};

export type BookmarksInput = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  userId: Scalars["String"]["input"];
};

/** Category schema */
export type Category = Node & {
  __typename?: "Category";
  createdAt: Scalars["Int"]["output"];
  deletedAt?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  type: Scalars["Int"]["output"];
  updatedAt: Scalars["Int"]["output"];
};

export type CreateBookmarkForUploadArticleInput = {
  articleUrl: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  platformFaviconUrl: Scalars["String"]["input"];
  platformName: Scalars["String"]["input"];
  platformUrl: Scalars["String"]["input"];
  thumbnailUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateBookmarkInput = {
  articleId: Scalars["ID"]["input"];
  articleUrl: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  isEng: Scalars["Boolean"]["input"];
  isRead: Scalars["Boolean"]["input"];
  platformFaviconUrl: Scalars["String"]["input"];
  platformId?: InputMaybe<Scalars["ID"]["input"]>;
  platformName: Scalars["String"]["input"];
  platformUrl: Scalars["String"]["input"];
  publishedAt?: InputMaybe<Scalars["Int"]["input"]>;
  thumbnailUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

export type CreateFavoriteArticleFolderInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type CreateFavoriteArticleInput = {
  articleId: Scalars["ID"]["input"];
  articleUrl: Scalars["String"]["input"];
  authorName?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  favoriteArticleFolderId: Scalars["ID"]["input"];
  isEng: Scalars["Boolean"]["input"];
  isPrivate: Scalars["Boolean"]["input"];
  isRead: Scalars["Boolean"]["input"];
  platformFaviconUrl: Scalars["String"]["input"];
  platformId?: InputMaybe<Scalars["ID"]["input"]>;
  platformName: Scalars["String"]["input"];
  platformUrl: Scalars["String"]["input"];
  publishedAt?: InputMaybe<Scalars["Int"]["input"]>;
  tags?: InputMaybe<Scalars["String"]["input"]>;
  thumbnailUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type DeleteBookmarkInput = {
  bookmarkId: Scalars["ID"]["input"];
  userId: Scalars["ID"]["input"];
};

export type DeleteFavoriteArticleFolderInput = {
  id: Scalars["ID"]["input"];
};

export type DeleteFavoriteArticleInput = {
  id: Scalars["ID"]["input"];
};

/** Favorite Article schema */
export type FavoriteArticle = Node & {
  __typename?: "FavoriteArticle";
  articleId?: Maybe<Scalars["String"]["output"]>;
  articleUrl: Scalars["String"]["output"];
  authorName?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["Int"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  isEng: Scalars["Boolean"]["output"];
  isPrivate: Scalars["Boolean"]["output"];
  isRead: Scalars["Boolean"]["output"];
  platformFaviconUrl: Scalars["String"]["output"];
  platformId?: Maybe<Scalars["String"]["output"]>;
  platformName: Scalars["String"]["output"];
  platformUrl: Scalars["String"]["output"];
  publishedAt?: Maybe<Scalars["Int"]["output"]>;
  tags?: Maybe<Scalars["String"]["output"]>;
  thumbnailUrl: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["Int"]["output"];
  userId: Scalars["String"]["output"];
};

/** Favorite Article Folder schema */
export type FavoriteArticleFolder = Node & {
  __typename?: "FavoriteArticleFolder";
  createdAt: Scalars["Int"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  favoriteArticles?: Maybe<Array<FavoriteArticle>>;
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["Int"]["output"];
  userId: Scalars["String"]["output"];
};

export type FavoriteArticleFolderConnection = {
  __typename?: "FavoriteArticleFolderConnection";
  edges: Array<FavoriteArticleFolderEdge>;
  pageInfo: PageInfo;
};

export type FavoriteArticleFolderEdge = {
  __typename?: "FavoriteArticleFolderEdge";
  cursor: Scalars["String"]["output"];
  node: FavoriteArticleFolder;
};

export type FavoriteArticleFoldersInput = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  isAllFetch?: InputMaybe<Scalars["Boolean"]["input"]>;
  isFolderOnly?: InputMaybe<Scalars["Boolean"]["input"]>;
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

/** Feed schema */
export type Feed = Node & {
  __typename?: "Feed";
  apiQueryParam?: Maybe<Scalars["String"]["output"]>;
  category: Category;
  createdAt: Scalars["Int"]["output"];
  deletedAt?: Maybe<Scalars["Int"]["output"]>;
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  platform: Platform;
  rssUrl: Scalars["String"]["output"];
  siteUrl: Scalars["String"]["output"];
  thumbnailUrl: Scalars["String"]["output"];
  trendPlatformType: Scalars["Int"]["output"];
  updatedAt: Scalars["Int"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createBookmark: Bookmark;
  createBookmarkForUploadArticle: Bookmark;
  createFavoriteArticle: FavoriteArticle;
  createFavoriteArticleFolder: FavoriteArticleFolder;
  deleteBookmark: Scalars["Boolean"]["output"];
  deleteFavoriteArticle: Scalars["Boolean"]["output"];
  deleteFavoriteArticleFolder: Scalars["Boolean"]["output"];
  updateFavoriteArticleFolder: FavoriteArticleFolder;
};

export type MutationCreateBookmarkArgs = {
  createBookmarkInput: CreateBookmarkInput;
};

export type MutationCreateBookmarkForUploadArticleArgs = {
  input: CreateBookmarkForUploadArticleInput;
};

export type MutationCreateFavoriteArticleArgs = {
  input: CreateFavoriteArticleInput;
};

export type MutationCreateFavoriteArticleFolderArgs = {
  input: CreateFavoriteArticleFolderInput;
};

export type MutationDeleteBookmarkArgs = {
  deleteBookmarkInput: DeleteBookmarkInput;
};

export type MutationDeleteFavoriteArticleArgs = {
  input: DeleteFavoriteArticleInput;
};

export type MutationDeleteFavoriteArticleFolderArgs = {
  input: DeleteFavoriteArticleFolderInput;
};

export type MutationUpdateFavoriteArticleFolderArgs = {
  input: UpdateFavoriteArticleFolderInput;
};

/** MyFeedFolder is a folder that contains a list of feeds. */
export type MyFeedFolder = Node & {
  __typename?: "MyFeedFolder";
  createdAt: Scalars["Int"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  feeds?: Maybe<Array<Feed>>;
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["Int"]["output"];
  userId: Scalars["String"]["output"];
};

export type Node = {
  id: Scalars["ID"]["output"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

/** Platform schema */
export type Platform = Node & {
  __typename?: "Platform";
  createdAt: Scalars["Int"]["output"];
  deletedAt?: Maybe<Scalars["Int"]["output"]>;
  faviconUrl: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isEng: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  platformSiteType: Scalars["Int"]["output"];
  siteUrl: Scalars["String"]["output"];
  updatedAt: Scalars["Int"]["output"];
};

/** Profile schema */
export type Profile = Node & {
  __typename?: "Profile";
  createdAt: Scalars["Int"]["output"];
  deletedAt?: Maybe<Scalars["Int"]["output"]>;
  email: Scalars["String"]["output"];
  emailVerified?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  image: Scalars["String"]["output"];
  isSuperAdmin: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  articleOpg: ArticleOgp;
  /** Get articles */
  articles: ArticleConnection;
  /** Get bookmarks */
  bookmarks: BookmarkConnection;
  favoriteArticleFolders: FavoriteArticleFolderConnection;
};

export type QueryArticleOpgArgs = {
  articleUrl: Scalars["String"]["input"];
};

export type QueryArticlesArgs = {
  articlesInput: ArticlesInput;
};

export type QueryBookmarksArgs = {
  input: BookmarksInput;
};

export type QueryFavoriteArticleFoldersArgs = {
  input?: InputMaybe<FavoriteArticleFoldersInput>;
};

export type UpdateFavoriteArticleFolderInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  title: Scalars["String"]["input"];
};

export type LoggedBaseLayoutFragmentFragment = {
  __typename?: "Query";
  favoriteArticleFolders: {
    __typename?: "FavoriteArticleFolderConnection";
    edges: Array<{
      __typename?: "FavoriteArticleFolderEdge";
      node: { __typename?: "FavoriteArticleFolder"; id: string; title: string };
    }>;
  };
};

export type LoggedBaseLayoutQueryQueryVariables = Exact<{
  input: FavoriteArticleFoldersInput;
}>;

export type LoggedBaseLayoutQueryQuery = {
  __typename?: "Query";
  favoriteArticleFolders: {
    __typename?: "FavoriteArticleFolderConnection";
    edges: Array<{
      __typename?: "FavoriteArticleFolderEdge";
      node: { __typename?: "FavoriteArticleFolder"; id: string; title: string };
    }>;
  };
};

export type DeskTopSidebarFragmentFragment = {
  __typename?: "Query";
  favoriteArticleFolders: {
    __typename?: "FavoriteArticleFolderConnection";
    edges: Array<{
      __typename?: "FavoriteArticleFolderEdge";
      node: { __typename?: "FavoriteArticleFolder"; id: string; title: string };
    }>;
  };
};

export type FavoriteArticleFolderLinkFragmentFragment = {
  __typename?: "FavoriteArticleFolder";
  id: string;
  title: string;
};

export type CreateBookmarkMutationMutationVariables = Exact<{
  input: CreateBookmarkInput;
}>;

export type CreateBookmarkMutationMutation = {
  __typename?: "Mutation";
  createBookmark: { __typename?: "Bookmark"; id: string };
};

export type DeleteBookmarkMutationMutationVariables = Exact<{
  input: DeleteBookmarkInput;
}>;

export type DeleteBookmarkMutationMutation = {
  __typename?: "Mutation";
  deleteBookmark: boolean;
};

export type ArticleCardItemFragmentFragment = {
  __typename?: "Article";
  id: string;
  title: string;
  description: string;
  articleUrl: string;
  publishedAt?: number | null;
  thumbnailUrl: string;
  isEng: boolean;
  isPrivate: boolean;
  isBookmarked: boolean;
  bookmarkId?: string | null;
  likeCount?: number | null;
  platform?: {
    __typename?: "Platform";
    id: string;
    name: string;
    siteUrl: string;
    faviconUrl: string;
  } | null;
  feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
};

export type ArticleCardWrapperFragmentFragment = {
  __typename?: "Article";
  id: string;
  title: string;
  articleUrl: string;
  publishedAt?: number | null;
  thumbnailUrl: string;
  isEng: boolean;
  isPrivate: boolean;
  isBookmarked: boolean;
  bookmarkId?: string | null;
  likeCount?: number | null;
  description: string;
  platform?: {
    __typename?: "Platform";
    id: string;
    name: string;
    faviconUrl: string;
    siteUrl: string;
  } | null;
  feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
};

export type ArticleListFragmentFragment = {
  __typename?: "ArticleConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
  };
  edges: Array<{
    __typename?: "ArticleEdge";
    node: {
      __typename?: "Article";
      id: string;
      title: string;
      articleUrl: string;
      publishedAt?: number | null;
      thumbnailUrl: string;
      isEng: boolean;
      isPrivate: boolean;
      isBookmarked: boolean;
      bookmarkId?: string | null;
      likeCount?: number | null;
      description: string;
      platform?: {
        __typename?: "Platform";
        id: string;
        name: string;
        faviconUrl: string;
        siteUrl: string;
      } | null;
      feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
    };
  }>;
};

export type GetArticleListQueryQueryVariables = Exact<{
  input: ArticlesInput;
}>;

export type GetArticleListQueryQuery = {
  __typename?: "Query";
  articles: {
    __typename?: "ArticleConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "ArticleEdge";
      node: {
        __typename?: "Article";
        id: string;
        title: string;
        articleUrl: string;
        publishedAt?: number | null;
        thumbnailUrl: string;
        isEng: boolean;
        isPrivate: boolean;
        isBookmarked: boolean;
        bookmarkId?: string | null;
        likeCount?: number | null;
        description: string;
        platform?: {
          __typename?: "Platform";
          id: string;
          name: string;
          faviconUrl: string;
          siteUrl: string;
        } | null;
        feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
      };
    }>;
  };
};

export type ArticleDashboardTemplateFragmentFragment = {
  __typename?: "Query";
  enArticles: {
    __typename?: "ArticleConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "ArticleEdge";
      node: {
        __typename?: "Article";
        id: string;
        title: string;
        articleUrl: string;
        publishedAt?: number | null;
        thumbnailUrl: string;
        isEng: boolean;
        isPrivate: boolean;
        isBookmarked: boolean;
        bookmarkId?: string | null;
        likeCount?: number | null;
        description: string;
        platform?: {
          __typename?: "Platform";
          id: string;
          name: string;
          faviconUrl: string;
          siteUrl: string;
        } | null;
        feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
      };
    }>;
  };
  jpArticles: {
    __typename?: "ArticleConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "ArticleEdge";
      node: {
        __typename?: "Article";
        id: string;
        title: string;
        articleUrl: string;
        publishedAt?: number | null;
        thumbnailUrl: string;
        isEng: boolean;
        isPrivate: boolean;
        isBookmarked: boolean;
        bookmarkId?: string | null;
        likeCount?: number | null;
        description: string;
        platform?: {
          __typename?: "Platform";
          id: string;
          name: string;
          faviconUrl: string;
          siteUrl: string;
        } | null;
        feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
      };
    }>;
  };
};

export type GetArticleDashboardTemplateQueryQueryVariables = Exact<{
  enInput: ArticlesInput;
  jpInput: ArticlesInput;
}>;

export type GetArticleDashboardTemplateQueryQuery = {
  __typename?: "Query";
  enArticles: {
    __typename?: "ArticleConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "ArticleEdge";
      node: {
        __typename?: "Article";
        id: string;
        title: string;
        articleUrl: string;
        publishedAt?: number | null;
        thumbnailUrl: string;
        isEng: boolean;
        isPrivate: boolean;
        isBookmarked: boolean;
        bookmarkId?: string | null;
        likeCount?: number | null;
        description: string;
        platform?: {
          __typename?: "Platform";
          id: string;
          name: string;
          faviconUrl: string;
          siteUrl: string;
        } | null;
        feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
      };
    }>;
  };
  jpArticles: {
    __typename?: "ArticleConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "ArticleEdge";
      node: {
        __typename?: "Article";
        id: string;
        title: string;
        articleUrl: string;
        publishedAt?: number | null;
        thumbnailUrl: string;
        isEng: boolean;
        isPrivate: boolean;
        isBookmarked: boolean;
        bookmarkId?: string | null;
        likeCount?: number | null;
        description: string;
        platform?: {
          __typename?: "Platform";
          id: string;
          name: string;
          faviconUrl: string;
          siteUrl: string;
        } | null;
        feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
      };
    }>;
  };
};

export type CreateBookmarkForUploadArticleMutationMutationVariables = Exact<{
  input: CreateBookmarkForUploadArticleInput;
}>;

export type CreateBookmarkForUploadArticleMutationMutation = {
  __typename?: "Mutation";
  createBookmarkForUploadArticle: { __typename?: "Bookmark"; id: string };
};

export type BookmarkCardItemFragmentFragment = {
  __typename?: "Bookmark";
  id: string;
  title: string;
  thumbnailUrl: string;
  createdAt: number;
};

export type BookmarkCardWrapperFragmentFragment = {
  __typename?: "Bookmark";
  id: string;
  title: string;
  description: string;
  articleUrl: string;
  thumbnailUrl: string;
  publishedAt?: number | null;
  articleId: string;
  platformId?: string | null;
  platformName: string;
  platformUrl: string;
  platformFaviconUrl: string;
  isEng: boolean;
  isRead: boolean;
  createdAt: number;
  updatedAt: number;
};

export type CreateBookmarkDialogContentFragmentFragment = {
  __typename?: "Query";
  articleOpg: {
    __typename?: "ArticleOGP";
    title: string;
    description?: string | null;
    thumbnailUrl: string;
    articleUrl: string;
    siteUrl: string;
    siteName: string;
    faviconUrl: string;
  };
};

export type GetCreateBookmarkDialogArticleOgpQueryQueryVariables = Exact<{
  url: Scalars["String"]["input"];
}>;

export type GetCreateBookmarkDialogArticleOgpQueryQuery = {
  __typename?: "Query";
  articleOpg: {
    __typename?: "ArticleOGP";
    title: string;
    description?: string | null;
    thumbnailUrl: string;
    articleUrl: string;
    siteUrl: string;
    siteName: string;
    faviconUrl: string;
  };
};

export type BookmarkListFragmentFragment = {
  __typename?: "BookmarkConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
  };
  edges: Array<{
    __typename?: "BookmarkEdge";
    node: {
      __typename?: "Bookmark";
      id: string;
      title: string;
      description: string;
      articleUrl: string;
      thumbnailUrl: string;
      publishedAt?: number | null;
      articleId: string;
      platformId?: string | null;
      platformName: string;
      platformUrl: string;
      platformFaviconUrl: string;
      isEng: boolean;
      isRead: boolean;
      createdAt: number;
      updatedAt: number;
    };
  }>;
};

export type GetBookmarkListQueryQueryVariables = Exact<{
  input: BookmarksInput;
}>;

export type GetBookmarkListQueryQuery = {
  __typename?: "Query";
  bookmarks: {
    __typename?: "BookmarkConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "BookmarkEdge";
      node: {
        __typename?: "Bookmark";
        id: string;
        title: string;
        description: string;
        articleUrl: string;
        thumbnailUrl: string;
        publishedAt?: number | null;
        articleId: string;
        platformId?: string | null;
        platformName: string;
        platformUrl: string;
        platformFaviconUrl: string;
        isEng: boolean;
        isRead: boolean;
        createdAt: number;
        updatedAt: number;
      };
    }>;
  };
};

export type BookmarkTemplateFragmentFragment = {
  __typename?: "Query";
  bookmarks: {
    __typename?: "BookmarkConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "BookmarkEdge";
      node: {
        __typename?: "Bookmark";
        id: string;
        title: string;
        description: string;
        articleUrl: string;
        thumbnailUrl: string;
        publishedAt?: number | null;
        articleId: string;
        platformId?: string | null;
        platformName: string;
        platformUrl: string;
        platformFaviconUrl: string;
        isEng: boolean;
        isRead: boolean;
        createdAt: number;
        updatedAt: number;
      };
    }>;
  };
};

export type GetBookmarkTemplateQueryQueryVariables = Exact<{
  input: BookmarksInput;
}>;

export type GetBookmarkTemplateQueryQuery = {
  __typename?: "Query";
  bookmarks: {
    __typename?: "BookmarkConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "BookmarkEdge";
      node: {
        __typename?: "Bookmark";
        id: string;
        title: string;
        description: string;
        articleUrl: string;
        thumbnailUrl: string;
        publishedAt?: number | null;
        articleId: string;
        platformId?: string | null;
        platformName: string;
        platformUrl: string;
        platformFaviconUrl: string;
        isEng: boolean;
        isRead: boolean;
        createdAt: number;
        updatedAt: number;
      };
    }>;
  };
};

export type CreateFavoriteArticleFolderMutationMutationVariables = Exact<{
  input: CreateFavoriteArticleFolderInput;
}>;

export type CreateFavoriteArticleFolderMutationMutation = {
  __typename?: "Mutation";
  createFavoriteArticleFolder: {
    __typename?: "FavoriteArticleFolder";
    id: string;
  };
};

export type CreateFavoriteArticleMutationMutationVariables = Exact<{
  input: CreateFavoriteArticleInput;
}>;

export type CreateFavoriteArticleMutationMutation = {
  __typename?: "Mutation";
  createFavoriteArticle: { __typename?: "FavoriteArticle"; id: string };
};

export type DeleteFavoriteArticleFolderMutationMutationVariables = Exact<{
  input: DeleteFavoriteArticleFolderInput;
}>;

export type DeleteFavoriteArticleFolderMutationMutation = {
  __typename?: "Mutation";
  deleteFavoriteArticleFolder: boolean;
};

export type DeleteFavoriteArticleMutationMutationVariables = Exact<{
  input: DeleteFavoriteArticleInput;
}>;

export type DeleteFavoriteArticleMutationMutation = {
  __typename?: "Mutation";
  deleteFavoriteArticle: boolean;
};

export type UpdateFavoriteArticleFolderMutationMutationVariables = Exact<{
  input: UpdateFavoriteArticleFolderInput;
}>;

export type UpdateFavoriteArticleFolderMutationMutation = {
  __typename?: "Mutation";
  updateFavoriteArticleFolder: {
    __typename?: "FavoriteArticleFolder";
    id: string;
  };
};

export type FavoriteArticleFolderCardFragmentFragment = {
  __typename?: "FavoriteArticleFolder";
  id: string;
  title: string;
  description?: string | null;
  favoriteArticles?: Array<{
    __typename?: "FavoriteArticle";
    id: string;
    title: string;
    articleUrl: string;
    thumbnailUrl: string;
    createdAt: number;
  }> | null;
};

export type FavoriteArticleFolderListFragmentFragment = {
  __typename?: "FavoriteArticleFolderConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
  };
  edges: Array<{
    __typename?: "FavoriteArticleFolderEdge";
    node: {
      __typename?: "FavoriteArticleFolder";
      id: string;
      title: string;
      description?: string | null;
      favoriteArticles?: Array<{
        __typename?: "FavoriteArticle";
        id: string;
        title: string;
        articleUrl: string;
        thumbnailUrl: string;
        createdAt: number;
      }> | null;
    };
  }>;
};

export type GetFavoriteArticleFolderListQueryQueryVariables = Exact<{
  input: FavoriteArticleFoldersInput;
}>;

export type GetFavoriteArticleFolderListQueryQuery = {
  __typename?: "Query";
  favoriteArticleFolders: {
    __typename?: "FavoriteArticleFolderConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "FavoriteArticleFolderEdge";
      node: {
        __typename?: "FavoriteArticleFolder";
        id: string;
        title: string;
        description?: string | null;
        favoriteArticles?: Array<{
          __typename?: "FavoriteArticle";
          id: string;
          title: string;
          articleUrl: string;
          thumbnailUrl: string;
          createdAt: number;
        }> | null;
      };
    }>;
  };
};

export type FavoriteArticleFolderListTemplateFragmentFragment = {
  __typename?: "Query";
  favoriteArticleFolders: {
    __typename?: "FavoriteArticleFolderConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "FavoriteArticleFolderEdge";
      node: {
        __typename?: "FavoriteArticleFolder";
        id: string;
        title: string;
        description?: string | null;
        favoriteArticles?: Array<{
          __typename?: "FavoriteArticle";
          id: string;
          title: string;
          articleUrl: string;
          thumbnailUrl: string;
          createdAt: number;
        }> | null;
      };
    }>;
  };
};

export type GetFavoriteArticleFolderListTemplateQueryQueryVariables = Exact<{
  input: FavoriteArticleFoldersInput;
}>;

export type GetFavoriteArticleFolderListTemplateQueryQuery = {
  __typename?: "Query";
  favoriteArticleFolders: {
    __typename?: "FavoriteArticleFolderConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "FavoriteArticleFolderEdge";
      node: {
        __typename?: "FavoriteArticleFolder";
        id: string;
        title: string;
        description?: string | null;
        favoriteArticles?: Array<{
          __typename?: "FavoriteArticle";
          id: string;
          title: string;
          articleUrl: string;
          thumbnailUrl: string;
          createdAt: number;
        }> | null;
      };
    }>;
  };
};

export type OgpPreviewContentFragmentFragment = {
  __typename?: "ArticleOGP";
  title: string;
  description?: string | null;
  thumbnailUrl: string;
  articleUrl: string;
  siteName: string;
  faviconUrl: string;
};

export type TrendArticleListFragmentFragment = {
  __typename?: "ArticleConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
  };
  edges: Array<{
    __typename?: "ArticleEdge";
    node: {
      __typename?: "Article";
      id: string;
      title: string;
      articleUrl: string;
      publishedAt?: number | null;
      thumbnailUrl: string;
      isEng: boolean;
      isPrivate: boolean;
      isBookmarked: boolean;
      bookmarkId?: string | null;
      likeCount?: number | null;
      description: string;
      platform?: {
        __typename?: "Platform";
        id: string;
        name: string;
        faviconUrl: string;
        siteUrl: string;
      } | null;
      feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
    };
  }>;
};

export type GetTrendArticleListQueryQueryVariables = Exact<{
  input: ArticlesInput;
}>;

export type GetTrendArticleListQueryQuery = {
  __typename?: "Query";
  articles: {
    __typename?: "ArticleConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "ArticleEdge";
      node: {
        __typename?: "Article";
        id: string;
        title: string;
        articleUrl: string;
        publishedAt?: number | null;
        thumbnailUrl: string;
        isEng: boolean;
        isPrivate: boolean;
        isBookmarked: boolean;
        bookmarkId?: string | null;
        likeCount?: number | null;
        description: string;
        platform?: {
          __typename?: "Platform";
          id: string;
          name: string;
          faviconUrl: string;
          siteUrl: string;
        } | null;
        feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
      };
    }>;
  };
};

export type TrendArticleDashboardTemplateFragmentFragment = {
  __typename?: "Query";
  enArticles: {
    __typename?: "ArticleConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "ArticleEdge";
      node: {
        __typename?: "Article";
        id: string;
        title: string;
        articleUrl: string;
        publishedAt?: number | null;
        thumbnailUrl: string;
        isEng: boolean;
        isPrivate: boolean;
        isBookmarked: boolean;
        bookmarkId?: string | null;
        likeCount?: number | null;
        description: string;
        platform?: {
          __typename?: "Platform";
          id: string;
          name: string;
          faviconUrl: string;
          siteUrl: string;
        } | null;
        feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
      };
    }>;
  };
  jpArticles: {
    __typename?: "ArticleConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "ArticleEdge";
      node: {
        __typename?: "Article";
        id: string;
        title: string;
        articleUrl: string;
        publishedAt?: number | null;
        thumbnailUrl: string;
        isEng: boolean;
        isPrivate: boolean;
        isBookmarked: boolean;
        bookmarkId?: string | null;
        likeCount?: number | null;
        description: string;
        platform?: {
          __typename?: "Platform";
          id: string;
          name: string;
          faviconUrl: string;
          siteUrl: string;
        } | null;
        feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
      };
    }>;
  };
};

export type GetTrendArticleDashboardTemplateQueryQueryVariables = Exact<{
  enInput: ArticlesInput;
  jpInput: ArticlesInput;
}>;

export type GetTrendArticleDashboardTemplateQueryQuery = {
  __typename?: "Query";
  enArticles: {
    __typename?: "ArticleConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "ArticleEdge";
      node: {
        __typename?: "Article";
        id: string;
        title: string;
        articleUrl: string;
        publishedAt?: number | null;
        thumbnailUrl: string;
        isEng: boolean;
        isPrivate: boolean;
        isBookmarked: boolean;
        bookmarkId?: string | null;
        likeCount?: number | null;
        description: string;
        platform?: {
          __typename?: "Platform";
          id: string;
          name: string;
          faviconUrl: string;
          siteUrl: string;
        } | null;
        feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
      };
    }>;
  };
  jpArticles: {
    __typename?: "ArticleConnection";
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: "ArticleEdge";
      node: {
        __typename?: "Article";
        id: string;
        title: string;
        articleUrl: string;
        publishedAt?: number | null;
        thumbnailUrl: string;
        isEng: boolean;
        isPrivate: boolean;
        isBookmarked: boolean;
        bookmarkId?: string | null;
        likeCount?: number | null;
        description: string;
        platform?: {
          __typename?: "Platform";
          id: string;
          name: string;
          faviconUrl: string;
          siteUrl: string;
        } | null;
        feeds?: Array<{ __typename?: "Feed"; id: string; name: string }> | null;
      };
    }>;
  };
};

export const FavoriteArticleFolderLinkFragmentFragmentDoc = gql`
  fragment FavoriteArticleFolderLinkFragment on FavoriteArticleFolder {
    id
    title
  }
`;
export const DeskTopSidebarFragmentFragmentDoc = gql`
  fragment DeskTopSidebarFragment on Query {
    favoriteArticleFolders(input: $input) {
      edges {
        node {
          ...FavoriteArticleFolderLinkFragment
        }
      }
    }
  }
  ${FavoriteArticleFolderLinkFragmentFragmentDoc}
`;
export const LoggedBaseLayoutFragmentFragmentDoc = gql`
  fragment LoggedBaseLayoutFragment on Query {
    ...DeskTopSidebarFragment
  }
  ${DeskTopSidebarFragmentFragmentDoc}
`;
export const ArticleCardItemFragmentFragmentDoc = gql`
  fragment ArticleCardItemFragment on Article {
    id
    platform {
      id
      name
      siteUrl
      faviconUrl
    }
    title
    description
    articleUrl
    publishedAt
    thumbnailUrl
    isEng
    isPrivate
    isBookmarked
    bookmarkId
    likeCount
    feeds {
      id
      name
    }
  }
`;
export const ArticleCardWrapperFragmentFragmentDoc = gql`
  fragment ArticleCardWrapperFragment on Article {
    id
    platform {
      id
      name
      faviconUrl
    }
    title
    articleUrl
    publishedAt
    thumbnailUrl
    isEng
    isPrivate
    isBookmarked
    bookmarkId
    likeCount
    ...ArticleCardItemFragment
  }
  ${ArticleCardItemFragmentFragmentDoc}
`;
export const ArticleListFragmentFragmentDoc = gql`
  fragment ArticleListFragment on ArticleConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        platform {
          id
          name
          faviconUrl
        }
        title
        articleUrl
        publishedAt
        thumbnailUrl
        isEng
        isPrivate
        isBookmarked
        bookmarkId
        likeCount
        ...ArticleCardWrapperFragment
      }
    }
  }
  ${ArticleCardWrapperFragmentFragmentDoc}
`;
export const ArticleDashboardTemplateFragmentFragmentDoc = gql`
  fragment ArticleDashboardTemplateFragment on Query {
    enArticles: articles(articlesInput: $enInput) {
      ...ArticleListFragment
    }
    jpArticles: articles(articlesInput: $jpInput) {
      ...ArticleListFragment
    }
  }
  ${ArticleListFragmentFragmentDoc}
`;
export const OgpPreviewContentFragmentFragmentDoc = gql`
  fragment OGPPreviewContentFragment on ArticleOGP {
    title
    description
    thumbnailUrl
    articleUrl
    siteName
    faviconUrl
  }
`;
export const CreateBookmarkDialogContentFragmentFragmentDoc = gql`
  fragment CreateBookmarkDialogContentFragment on Query {
    articleOpg(articleUrl: $url) {
      title
      description
      thumbnailUrl
      articleUrl
      siteUrl
      siteName
      faviconUrl
      ...OGPPreviewContentFragment
    }
  }
  ${OgpPreviewContentFragmentFragmentDoc}
`;
export const BookmarkCardItemFragmentFragmentDoc = gql`
  fragment BookmarkCardItemFragment on Bookmark {
    id
    title
    thumbnailUrl
    createdAt
  }
`;
export const BookmarkCardWrapperFragmentFragmentDoc = gql`
  fragment BookmarkCardWrapperFragment on Bookmark {
    id
    title
    description
    articleUrl
    thumbnailUrl
    publishedAt
    articleId
    platformId
    platformName
    platformUrl
    platformFaviconUrl
    isEng
    isRead
    createdAt
    updatedAt
    ...BookmarkCardItemFragment
  }
  ${BookmarkCardItemFragmentFragmentDoc}
`;
export const BookmarkListFragmentFragmentDoc = gql`
  fragment BookmarkListFragment on BookmarkConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        title
        description
        articleUrl
        thumbnailUrl
        publishedAt
        articleId
        platformId
        platformName
        platformUrl
        platformFaviconUrl
        isEng
        isRead
        createdAt
        updatedAt
        ...BookmarkCardWrapperFragment
      }
    }
  }
  ${BookmarkCardWrapperFragmentFragmentDoc}
`;
export const BookmarkTemplateFragmentFragmentDoc = gql`
  fragment BookmarkTemplateFragment on Query {
    bookmarks(input: $input) {
      ...BookmarkListFragment
    }
  }
  ${BookmarkListFragmentFragmentDoc}
`;
export const FavoriteArticleFolderCardFragmentFragmentDoc = gql`
  fragment FavoriteArticleFolderCardFragment on FavoriteArticleFolder {
    id
    title
    description
    favoriteArticles {
      id
      title
      articleUrl
      thumbnailUrl
      createdAt
    }
  }
`;
export const FavoriteArticleFolderListFragmentFragmentDoc = gql`
  fragment FavoriteArticleFolderListFragment on FavoriteArticleFolderConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        ...FavoriteArticleFolderCardFragment
      }
    }
  }
  ${FavoriteArticleFolderCardFragmentFragmentDoc}
`;
export const FavoriteArticleFolderListTemplateFragmentFragmentDoc = gql`
  fragment FavoriteArticleFolderListTemplateFragment on Query {
    favoriteArticleFolders(input: $input) {
      ...FavoriteArticleFolderListFragment
    }
  }
  ${FavoriteArticleFolderListFragmentFragmentDoc}
`;
export const TrendArticleListFragmentFragmentDoc = gql`
  fragment TrendArticleListFragment on ArticleConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        platform {
          id
          name
          faviconUrl
        }
        title
        articleUrl
        publishedAt
        thumbnailUrl
        isEng
        isPrivate
        isBookmarked
        bookmarkId
        likeCount
        ...ArticleCardWrapperFragment
      }
    }
  }
  ${ArticleCardWrapperFragmentFragmentDoc}
`;
export const TrendArticleDashboardTemplateFragmentFragmentDoc = gql`
  fragment TrendArticleDashboardTemplateFragment on Query {
    enArticles: articles(articlesInput: $enInput) {
      ...TrendArticleListFragment
    }
    jpArticles: articles(articlesInput: $jpInput) {
      ...TrendArticleListFragment
    }
  }
  ${TrendArticleListFragmentFragmentDoc}
`;
export const LoggedBaseLayoutQueryDocument = gql`
  query LoggedBaseLayoutQuery($input: FavoriteArticleFoldersInput!) {
    ...LoggedBaseLayoutFragment
  }
  ${LoggedBaseLayoutFragmentFragmentDoc}
`;

/**
 * __useLoggedBaseLayoutQueryQuery__
 *
 * To run a query within a React component, call `useLoggedBaseLayoutQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedBaseLayoutQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedBaseLayoutQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoggedBaseLayoutQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    LoggedBaseLayoutQueryQuery,
    LoggedBaseLayoutQueryQueryVariables
  > &
    (
      | { variables: LoggedBaseLayoutQueryQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    LoggedBaseLayoutQueryQuery,
    LoggedBaseLayoutQueryQueryVariables
  >(LoggedBaseLayoutQueryDocument, options);
}
export function useLoggedBaseLayoutQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LoggedBaseLayoutQueryQuery,
    LoggedBaseLayoutQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LoggedBaseLayoutQueryQuery,
    LoggedBaseLayoutQueryQueryVariables
  >(LoggedBaseLayoutQueryDocument, options);
}
export function useLoggedBaseLayoutQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    LoggedBaseLayoutQueryQuery,
    LoggedBaseLayoutQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    LoggedBaseLayoutQueryQuery,
    LoggedBaseLayoutQueryQueryVariables
  >(LoggedBaseLayoutQueryDocument, options);
}
export type LoggedBaseLayoutQueryQueryHookResult = ReturnType<
  typeof useLoggedBaseLayoutQueryQuery
>;
export type LoggedBaseLayoutQueryLazyQueryHookResult = ReturnType<
  typeof useLoggedBaseLayoutQueryLazyQuery
>;
export type LoggedBaseLayoutQuerySuspenseQueryHookResult = ReturnType<
  typeof useLoggedBaseLayoutQuerySuspenseQuery
>;
export type LoggedBaseLayoutQueryQueryResult = Apollo.QueryResult<
  LoggedBaseLayoutQueryQuery,
  LoggedBaseLayoutQueryQueryVariables
>;
export const CreateBookmarkMutationDocument = gql`
  mutation CreateBookmarkMutation($input: CreateBookmarkInput!) {
    createBookmark(createBookmarkInput: $input) {
      id
    }
  }
`;
export type CreateBookmarkMutationMutationFn = Apollo.MutationFunction<
  CreateBookmarkMutationMutation,
  CreateBookmarkMutationMutationVariables
>;

/**
 * __useCreateBookmarkMutationMutation__
 *
 * To run a mutation, you first call `useCreateBookmarkMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookmarkMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookmarkMutationMutation, { data, loading, error }] = useCreateBookmarkMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookmarkMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBookmarkMutationMutation,
    CreateBookmarkMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateBookmarkMutationMutation,
    CreateBookmarkMutationMutationVariables
  >(CreateBookmarkMutationDocument, options);
}
export type CreateBookmarkMutationMutationHookResult = ReturnType<
  typeof useCreateBookmarkMutationMutation
>;
export type CreateBookmarkMutationMutationResult =
  Apollo.MutationResult<CreateBookmarkMutationMutation>;
export type CreateBookmarkMutationMutationOptions = Apollo.BaseMutationOptions<
  CreateBookmarkMutationMutation,
  CreateBookmarkMutationMutationVariables
>;
export const DeleteBookmarkMutationDocument = gql`
  mutation DeleteBookmarkMutation($input: DeleteBookmarkInput!) {
    deleteBookmark(deleteBookmarkInput: $input)
  }
`;
export type DeleteBookmarkMutationMutationFn = Apollo.MutationFunction<
  DeleteBookmarkMutationMutation,
  DeleteBookmarkMutationMutationVariables
>;

/**
 * __useDeleteBookmarkMutationMutation__
 *
 * To run a mutation, you first call `useDeleteBookmarkMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookmarkMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookmarkMutationMutation, { data, loading, error }] = useDeleteBookmarkMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteBookmarkMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteBookmarkMutationMutation,
    DeleteBookmarkMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteBookmarkMutationMutation,
    DeleteBookmarkMutationMutationVariables
  >(DeleteBookmarkMutationDocument, options);
}
export type DeleteBookmarkMutationMutationHookResult = ReturnType<
  typeof useDeleteBookmarkMutationMutation
>;
export type DeleteBookmarkMutationMutationResult =
  Apollo.MutationResult<DeleteBookmarkMutationMutation>;
export type DeleteBookmarkMutationMutationOptions = Apollo.BaseMutationOptions<
  DeleteBookmarkMutationMutation,
  DeleteBookmarkMutationMutationVariables
>;
export const GetArticleListQueryDocument = gql`
  query GetArticleListQuery($input: ArticlesInput!) {
    articles(articlesInput: $input) {
      ...ArticleListFragment
    }
  }
  ${ArticleListFragmentFragmentDoc}
`;

/**
 * __useGetArticleListQueryQuery__
 *
 * To run a query within a React component, call `useGetArticleListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetArticleListQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetArticleListQueryQuery,
    GetArticleListQueryQueryVariables
  > &
    (
      | { variables: GetArticleListQueryQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetArticleListQueryQuery,
    GetArticleListQueryQueryVariables
  >(GetArticleListQueryDocument, options);
}
export function useGetArticleListQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetArticleListQueryQuery,
    GetArticleListQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetArticleListQueryQuery,
    GetArticleListQueryQueryVariables
  >(GetArticleListQueryDocument, options);
}
export function useGetArticleListQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetArticleListQueryQuery,
    GetArticleListQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetArticleListQueryQuery,
    GetArticleListQueryQueryVariables
  >(GetArticleListQueryDocument, options);
}
export type GetArticleListQueryQueryHookResult = ReturnType<
  typeof useGetArticleListQueryQuery
>;
export type GetArticleListQueryLazyQueryHookResult = ReturnType<
  typeof useGetArticleListQueryLazyQuery
>;
export type GetArticleListQuerySuspenseQueryHookResult = ReturnType<
  typeof useGetArticleListQuerySuspenseQuery
>;
export type GetArticleListQueryQueryResult = Apollo.QueryResult<
  GetArticleListQueryQuery,
  GetArticleListQueryQueryVariables
>;
export const GetArticleDashboardTemplateQueryDocument = gql`
  query GetArticleDashboardTemplateQuery(
    $enInput: ArticlesInput!
    $jpInput: ArticlesInput!
  ) {
    ...ArticleDashboardTemplateFragment
  }
  ${ArticleDashboardTemplateFragmentFragmentDoc}
`;

/**
 * __useGetArticleDashboardTemplateQueryQuery__
 *
 * To run a query within a React component, call `useGetArticleDashboardTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleDashboardTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleDashboardTemplateQueryQuery({
 *   variables: {
 *      enInput: // value for 'enInput'
 *      jpInput: // value for 'jpInput'
 *   },
 * });
 */
export function useGetArticleDashboardTemplateQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetArticleDashboardTemplateQueryQuery,
    GetArticleDashboardTemplateQueryQueryVariables
  > &
    (
      | {
          variables: GetArticleDashboardTemplateQueryQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetArticleDashboardTemplateQueryQuery,
    GetArticleDashboardTemplateQueryQueryVariables
  >(GetArticleDashboardTemplateQueryDocument, options);
}
export function useGetArticleDashboardTemplateQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetArticleDashboardTemplateQueryQuery,
    GetArticleDashboardTemplateQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetArticleDashboardTemplateQueryQuery,
    GetArticleDashboardTemplateQueryQueryVariables
  >(GetArticleDashboardTemplateQueryDocument, options);
}
export function useGetArticleDashboardTemplateQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetArticleDashboardTemplateQueryQuery,
    GetArticleDashboardTemplateQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetArticleDashboardTemplateQueryQuery,
    GetArticleDashboardTemplateQueryQueryVariables
  >(GetArticleDashboardTemplateQueryDocument, options);
}
export type GetArticleDashboardTemplateQueryQueryHookResult = ReturnType<
  typeof useGetArticleDashboardTemplateQueryQuery
>;
export type GetArticleDashboardTemplateQueryLazyQueryHookResult = ReturnType<
  typeof useGetArticleDashboardTemplateQueryLazyQuery
>;
export type GetArticleDashboardTemplateQuerySuspenseQueryHookResult =
  ReturnType<typeof useGetArticleDashboardTemplateQuerySuspenseQuery>;
export type GetArticleDashboardTemplateQueryQueryResult = Apollo.QueryResult<
  GetArticleDashboardTemplateQueryQuery,
  GetArticleDashboardTemplateQueryQueryVariables
>;
export const CreateBookmarkForUploadArticleMutationDocument = gql`
  mutation CreateBookmarkForUploadArticleMutation(
    $input: CreateBookmarkForUploadArticleInput!
  ) {
    createBookmarkForUploadArticle(input: $input) {
      id
    }
  }
`;
export type CreateBookmarkForUploadArticleMutationMutationFn =
  Apollo.MutationFunction<
    CreateBookmarkForUploadArticleMutationMutation,
    CreateBookmarkForUploadArticleMutationMutationVariables
  >;

/**
 * __useCreateBookmarkForUploadArticleMutationMutation__
 *
 * To run a mutation, you first call `useCreateBookmarkForUploadArticleMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookmarkForUploadArticleMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookmarkForUploadArticleMutationMutation, { data, loading, error }] = useCreateBookmarkForUploadArticleMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookmarkForUploadArticleMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBookmarkForUploadArticleMutationMutation,
    CreateBookmarkForUploadArticleMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateBookmarkForUploadArticleMutationMutation,
    CreateBookmarkForUploadArticleMutationMutationVariables
  >(CreateBookmarkForUploadArticleMutationDocument, options);
}
export type CreateBookmarkForUploadArticleMutationMutationHookResult =
  ReturnType<typeof useCreateBookmarkForUploadArticleMutationMutation>;
export type CreateBookmarkForUploadArticleMutationMutationResult =
  Apollo.MutationResult<CreateBookmarkForUploadArticleMutationMutation>;
export type CreateBookmarkForUploadArticleMutationMutationOptions =
  Apollo.BaseMutationOptions<
    CreateBookmarkForUploadArticleMutationMutation,
    CreateBookmarkForUploadArticleMutationMutationVariables
  >;
export const GetCreateBookmarkDialogArticleOgpQueryDocument = gql`
  query GetCreateBookmarkDialogArticleOGPQuery($url: String!) {
    ...CreateBookmarkDialogContentFragment
  }
  ${CreateBookmarkDialogContentFragmentFragmentDoc}
`;

/**
 * __useGetCreateBookmarkDialogArticleOgpQueryQuery__
 *
 * To run a query within a React component, call `useGetCreateBookmarkDialogArticleOgpQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreateBookmarkDialogArticleOgpQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreateBookmarkDialogArticleOgpQueryQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetCreateBookmarkDialogArticleOgpQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCreateBookmarkDialogArticleOgpQueryQuery,
    GetCreateBookmarkDialogArticleOgpQueryQueryVariables
  > &
    (
      | {
          variables: GetCreateBookmarkDialogArticleOgpQueryQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCreateBookmarkDialogArticleOgpQueryQuery,
    GetCreateBookmarkDialogArticleOgpQueryQueryVariables
  >(GetCreateBookmarkDialogArticleOgpQueryDocument, options);
}
export function useGetCreateBookmarkDialogArticleOgpQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCreateBookmarkDialogArticleOgpQueryQuery,
    GetCreateBookmarkDialogArticleOgpQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCreateBookmarkDialogArticleOgpQueryQuery,
    GetCreateBookmarkDialogArticleOgpQueryQueryVariables
  >(GetCreateBookmarkDialogArticleOgpQueryDocument, options);
}
export function useGetCreateBookmarkDialogArticleOgpQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetCreateBookmarkDialogArticleOgpQueryQuery,
    GetCreateBookmarkDialogArticleOgpQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCreateBookmarkDialogArticleOgpQueryQuery,
    GetCreateBookmarkDialogArticleOgpQueryQueryVariables
  >(GetCreateBookmarkDialogArticleOgpQueryDocument, options);
}
export type GetCreateBookmarkDialogArticleOgpQueryQueryHookResult = ReturnType<
  typeof useGetCreateBookmarkDialogArticleOgpQueryQuery
>;
export type GetCreateBookmarkDialogArticleOgpQueryLazyQueryHookResult =
  ReturnType<typeof useGetCreateBookmarkDialogArticleOgpQueryLazyQuery>;
export type GetCreateBookmarkDialogArticleOgpQuerySuspenseQueryHookResult =
  ReturnType<typeof useGetCreateBookmarkDialogArticleOgpQuerySuspenseQuery>;
export type GetCreateBookmarkDialogArticleOgpQueryQueryResult =
  Apollo.QueryResult<
    GetCreateBookmarkDialogArticleOgpQueryQuery,
    GetCreateBookmarkDialogArticleOgpQueryQueryVariables
  >;
export const GetBookmarkListQueryDocument = gql`
  query GetBookmarkListQuery($input: BookmarksInput!) {
    bookmarks(input: $input) {
      ...BookmarkListFragment
    }
  }
  ${BookmarkListFragmentFragmentDoc}
`;

/**
 * __useGetBookmarkListQueryQuery__
 *
 * To run a query within a React component, call `useGetBookmarkListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookmarkListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookmarkListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetBookmarkListQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBookmarkListQueryQuery,
    GetBookmarkListQueryQueryVariables
  > &
    (
      | { variables: GetBookmarkListQueryQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetBookmarkListQueryQuery,
    GetBookmarkListQueryQueryVariables
  >(GetBookmarkListQueryDocument, options);
}
export function useGetBookmarkListQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBookmarkListQueryQuery,
    GetBookmarkListQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetBookmarkListQueryQuery,
    GetBookmarkListQueryQueryVariables
  >(GetBookmarkListQueryDocument, options);
}
export function useGetBookmarkListQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetBookmarkListQueryQuery,
    GetBookmarkListQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetBookmarkListQueryQuery,
    GetBookmarkListQueryQueryVariables
  >(GetBookmarkListQueryDocument, options);
}
export type GetBookmarkListQueryQueryHookResult = ReturnType<
  typeof useGetBookmarkListQueryQuery
>;
export type GetBookmarkListQueryLazyQueryHookResult = ReturnType<
  typeof useGetBookmarkListQueryLazyQuery
>;
export type GetBookmarkListQuerySuspenseQueryHookResult = ReturnType<
  typeof useGetBookmarkListQuerySuspenseQuery
>;
export type GetBookmarkListQueryQueryResult = Apollo.QueryResult<
  GetBookmarkListQueryQuery,
  GetBookmarkListQueryQueryVariables
>;
export const GetBookmarkTemplateQueryDocument = gql`
  query GetBookmarkTemplateQuery($input: BookmarksInput!) {
    ...BookmarkTemplateFragment
  }
  ${BookmarkTemplateFragmentFragmentDoc}
`;

/**
 * __useGetBookmarkTemplateQueryQuery__
 *
 * To run a query within a React component, call `useGetBookmarkTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookmarkTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookmarkTemplateQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetBookmarkTemplateQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBookmarkTemplateQueryQuery,
    GetBookmarkTemplateQueryQueryVariables
  > &
    (
      | { variables: GetBookmarkTemplateQueryQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetBookmarkTemplateQueryQuery,
    GetBookmarkTemplateQueryQueryVariables
  >(GetBookmarkTemplateQueryDocument, options);
}
export function useGetBookmarkTemplateQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBookmarkTemplateQueryQuery,
    GetBookmarkTemplateQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetBookmarkTemplateQueryQuery,
    GetBookmarkTemplateQueryQueryVariables
  >(GetBookmarkTemplateQueryDocument, options);
}
export function useGetBookmarkTemplateQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetBookmarkTemplateQueryQuery,
    GetBookmarkTemplateQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetBookmarkTemplateQueryQuery,
    GetBookmarkTemplateQueryQueryVariables
  >(GetBookmarkTemplateQueryDocument, options);
}
export type GetBookmarkTemplateQueryQueryHookResult = ReturnType<
  typeof useGetBookmarkTemplateQueryQuery
>;
export type GetBookmarkTemplateQueryLazyQueryHookResult = ReturnType<
  typeof useGetBookmarkTemplateQueryLazyQuery
>;
export type GetBookmarkTemplateQuerySuspenseQueryHookResult = ReturnType<
  typeof useGetBookmarkTemplateQuerySuspenseQuery
>;
export type GetBookmarkTemplateQueryQueryResult = Apollo.QueryResult<
  GetBookmarkTemplateQueryQuery,
  GetBookmarkTemplateQueryQueryVariables
>;
export const CreateFavoriteArticleFolderMutationDocument = gql`
  mutation CreateFavoriteArticleFolderMutation(
    $input: CreateFavoriteArticleFolderInput!
  ) {
    createFavoriteArticleFolder(input: $input) {
      id
    }
  }
`;
export type CreateFavoriteArticleFolderMutationMutationFn =
  Apollo.MutationFunction<
    CreateFavoriteArticleFolderMutationMutation,
    CreateFavoriteArticleFolderMutationMutationVariables
  >;

/**
 * __useCreateFavoriteArticleFolderMutationMutation__
 *
 * To run a mutation, you first call `useCreateFavoriteArticleFolderMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFavoriteArticleFolderMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFavoriteArticleFolderMutationMutation, { data, loading, error }] = useCreateFavoriteArticleFolderMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFavoriteArticleFolderMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFavoriteArticleFolderMutationMutation,
    CreateFavoriteArticleFolderMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateFavoriteArticleFolderMutationMutation,
    CreateFavoriteArticleFolderMutationMutationVariables
  >(CreateFavoriteArticleFolderMutationDocument, options);
}
export type CreateFavoriteArticleFolderMutationMutationHookResult = ReturnType<
  typeof useCreateFavoriteArticleFolderMutationMutation
>;
export type CreateFavoriteArticleFolderMutationMutationResult =
  Apollo.MutationResult<CreateFavoriteArticleFolderMutationMutation>;
export type CreateFavoriteArticleFolderMutationMutationOptions =
  Apollo.BaseMutationOptions<
    CreateFavoriteArticleFolderMutationMutation,
    CreateFavoriteArticleFolderMutationMutationVariables
  >;
export const CreateFavoriteArticleMutationDocument = gql`
  mutation CreateFavoriteArticleMutation($input: CreateFavoriteArticleInput!) {
    createFavoriteArticle(input: $input) {
      id
    }
  }
`;
export type CreateFavoriteArticleMutationMutationFn = Apollo.MutationFunction<
  CreateFavoriteArticleMutationMutation,
  CreateFavoriteArticleMutationMutationVariables
>;

/**
 * __useCreateFavoriteArticleMutationMutation__
 *
 * To run a mutation, you first call `useCreateFavoriteArticleMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFavoriteArticleMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFavoriteArticleMutationMutation, { data, loading, error }] = useCreateFavoriteArticleMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFavoriteArticleMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFavoriteArticleMutationMutation,
    CreateFavoriteArticleMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateFavoriteArticleMutationMutation,
    CreateFavoriteArticleMutationMutationVariables
  >(CreateFavoriteArticleMutationDocument, options);
}
export type CreateFavoriteArticleMutationMutationHookResult = ReturnType<
  typeof useCreateFavoriteArticleMutationMutation
>;
export type CreateFavoriteArticleMutationMutationResult =
  Apollo.MutationResult<CreateFavoriteArticleMutationMutation>;
export type CreateFavoriteArticleMutationMutationOptions =
  Apollo.BaseMutationOptions<
    CreateFavoriteArticleMutationMutation,
    CreateFavoriteArticleMutationMutationVariables
  >;
export const DeleteFavoriteArticleFolderMutationDocument = gql`
  mutation DeleteFavoriteArticleFolderMutation(
    $input: DeleteFavoriteArticleFolderInput!
  ) {
    deleteFavoriteArticleFolder(input: $input)
  }
`;
export type DeleteFavoriteArticleFolderMutationMutationFn =
  Apollo.MutationFunction<
    DeleteFavoriteArticleFolderMutationMutation,
    DeleteFavoriteArticleFolderMutationMutationVariables
  >;

/**
 * __useDeleteFavoriteArticleFolderMutationMutation__
 *
 * To run a mutation, you first call `useDeleteFavoriteArticleFolderMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFavoriteArticleFolderMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFavoriteArticleFolderMutationMutation, { data, loading, error }] = useDeleteFavoriteArticleFolderMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteFavoriteArticleFolderMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteFavoriteArticleFolderMutationMutation,
    DeleteFavoriteArticleFolderMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteFavoriteArticleFolderMutationMutation,
    DeleteFavoriteArticleFolderMutationMutationVariables
  >(DeleteFavoriteArticleFolderMutationDocument, options);
}
export type DeleteFavoriteArticleFolderMutationMutationHookResult = ReturnType<
  typeof useDeleteFavoriteArticleFolderMutationMutation
>;
export type DeleteFavoriteArticleFolderMutationMutationResult =
  Apollo.MutationResult<DeleteFavoriteArticleFolderMutationMutation>;
export type DeleteFavoriteArticleFolderMutationMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteFavoriteArticleFolderMutationMutation,
    DeleteFavoriteArticleFolderMutationMutationVariables
  >;
export const DeleteFavoriteArticleMutationDocument = gql`
  mutation DeleteFavoriteArticleMutation($input: DeleteFavoriteArticleInput!) {
    deleteFavoriteArticle(input: $input)
  }
`;
export type DeleteFavoriteArticleMutationMutationFn = Apollo.MutationFunction<
  DeleteFavoriteArticleMutationMutation,
  DeleteFavoriteArticleMutationMutationVariables
>;

/**
 * __useDeleteFavoriteArticleMutationMutation__
 *
 * To run a mutation, you first call `useDeleteFavoriteArticleMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFavoriteArticleMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFavoriteArticleMutationMutation, { data, loading, error }] = useDeleteFavoriteArticleMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteFavoriteArticleMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteFavoriteArticleMutationMutation,
    DeleteFavoriteArticleMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteFavoriteArticleMutationMutation,
    DeleteFavoriteArticleMutationMutationVariables
  >(DeleteFavoriteArticleMutationDocument, options);
}
export type DeleteFavoriteArticleMutationMutationHookResult = ReturnType<
  typeof useDeleteFavoriteArticleMutationMutation
>;
export type DeleteFavoriteArticleMutationMutationResult =
  Apollo.MutationResult<DeleteFavoriteArticleMutationMutation>;
export type DeleteFavoriteArticleMutationMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteFavoriteArticleMutationMutation,
    DeleteFavoriteArticleMutationMutationVariables
  >;
export const UpdateFavoriteArticleFolderMutationDocument = gql`
  mutation UpdateFavoriteArticleFolderMutation(
    $input: UpdateFavoriteArticleFolderInput!
  ) {
    updateFavoriteArticleFolder(input: $input) {
      id
    }
  }
`;
export type UpdateFavoriteArticleFolderMutationMutationFn =
  Apollo.MutationFunction<
    UpdateFavoriteArticleFolderMutationMutation,
    UpdateFavoriteArticleFolderMutationMutationVariables
  >;

/**
 * __useUpdateFavoriteArticleFolderMutationMutation__
 *
 * To run a mutation, you first call `useUpdateFavoriteArticleFolderMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFavoriteArticleFolderMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFavoriteArticleFolderMutationMutation, { data, loading, error }] = useUpdateFavoriteArticleFolderMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFavoriteArticleFolderMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFavoriteArticleFolderMutationMutation,
    UpdateFavoriteArticleFolderMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateFavoriteArticleFolderMutationMutation,
    UpdateFavoriteArticleFolderMutationMutationVariables
  >(UpdateFavoriteArticleFolderMutationDocument, options);
}
export type UpdateFavoriteArticleFolderMutationMutationHookResult = ReturnType<
  typeof useUpdateFavoriteArticleFolderMutationMutation
>;
export type UpdateFavoriteArticleFolderMutationMutationResult =
  Apollo.MutationResult<UpdateFavoriteArticleFolderMutationMutation>;
export type UpdateFavoriteArticleFolderMutationMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateFavoriteArticleFolderMutationMutation,
    UpdateFavoriteArticleFolderMutationMutationVariables
  >;
export const GetFavoriteArticleFolderListQueryDocument = gql`
  query GetFavoriteArticleFolderListQuery(
    $input: FavoriteArticleFoldersInput!
  ) {
    favoriteArticleFolders(input: $input) {
      ...FavoriteArticleFolderListFragment
    }
  }
  ${FavoriteArticleFolderListFragmentFragmentDoc}
`;

/**
 * __useGetFavoriteArticleFolderListQueryQuery__
 *
 * To run a query within a React component, call `useGetFavoriteArticleFolderListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavoriteArticleFolderListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavoriteArticleFolderListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFavoriteArticleFolderListQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFavoriteArticleFolderListQueryQuery,
    GetFavoriteArticleFolderListQueryQueryVariables
  > &
    (
      | {
          variables: GetFavoriteArticleFolderListQueryQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFavoriteArticleFolderListQueryQuery,
    GetFavoriteArticleFolderListQueryQueryVariables
  >(GetFavoriteArticleFolderListQueryDocument, options);
}
export function useGetFavoriteArticleFolderListQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFavoriteArticleFolderListQueryQuery,
    GetFavoriteArticleFolderListQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFavoriteArticleFolderListQueryQuery,
    GetFavoriteArticleFolderListQueryQueryVariables
  >(GetFavoriteArticleFolderListQueryDocument, options);
}
export function useGetFavoriteArticleFolderListQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetFavoriteArticleFolderListQueryQuery,
    GetFavoriteArticleFolderListQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetFavoriteArticleFolderListQueryQuery,
    GetFavoriteArticleFolderListQueryQueryVariables
  >(GetFavoriteArticleFolderListQueryDocument, options);
}
export type GetFavoriteArticleFolderListQueryQueryHookResult = ReturnType<
  typeof useGetFavoriteArticleFolderListQueryQuery
>;
export type GetFavoriteArticleFolderListQueryLazyQueryHookResult = ReturnType<
  typeof useGetFavoriteArticleFolderListQueryLazyQuery
>;
export type GetFavoriteArticleFolderListQuerySuspenseQueryHookResult =
  ReturnType<typeof useGetFavoriteArticleFolderListQuerySuspenseQuery>;
export type GetFavoriteArticleFolderListQueryQueryResult = Apollo.QueryResult<
  GetFavoriteArticleFolderListQueryQuery,
  GetFavoriteArticleFolderListQueryQueryVariables
>;
export const GetFavoriteArticleFolderListTemplateQueryDocument = gql`
  query GetFavoriteArticleFolderListTemplateQuery(
    $input: FavoriteArticleFoldersInput!
  ) {
    ...FavoriteArticleFolderListTemplateFragment
  }
  ${FavoriteArticleFolderListTemplateFragmentFragmentDoc}
`;

/**
 * __useGetFavoriteArticleFolderListTemplateQueryQuery__
 *
 * To run a query within a React component, call `useGetFavoriteArticleFolderListTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavoriteArticleFolderListTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavoriteArticleFolderListTemplateQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFavoriteArticleFolderListTemplateQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFavoriteArticleFolderListTemplateQueryQuery,
    GetFavoriteArticleFolderListTemplateQueryQueryVariables
  > &
    (
      | {
          variables: GetFavoriteArticleFolderListTemplateQueryQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFavoriteArticleFolderListTemplateQueryQuery,
    GetFavoriteArticleFolderListTemplateQueryQueryVariables
  >(GetFavoriteArticleFolderListTemplateQueryDocument, options);
}
export function useGetFavoriteArticleFolderListTemplateQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFavoriteArticleFolderListTemplateQueryQuery,
    GetFavoriteArticleFolderListTemplateQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFavoriteArticleFolderListTemplateQueryQuery,
    GetFavoriteArticleFolderListTemplateQueryQueryVariables
  >(GetFavoriteArticleFolderListTemplateQueryDocument, options);
}
export function useGetFavoriteArticleFolderListTemplateQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetFavoriteArticleFolderListTemplateQueryQuery,
    GetFavoriteArticleFolderListTemplateQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetFavoriteArticleFolderListTemplateQueryQuery,
    GetFavoriteArticleFolderListTemplateQueryQueryVariables
  >(GetFavoriteArticleFolderListTemplateQueryDocument, options);
}
export type GetFavoriteArticleFolderListTemplateQueryQueryHookResult =
  ReturnType<typeof useGetFavoriteArticleFolderListTemplateQueryQuery>;
export type GetFavoriteArticleFolderListTemplateQueryLazyQueryHookResult =
  ReturnType<typeof useGetFavoriteArticleFolderListTemplateQueryLazyQuery>;
export type GetFavoriteArticleFolderListTemplateQuerySuspenseQueryHookResult =
  ReturnType<typeof useGetFavoriteArticleFolderListTemplateQuerySuspenseQuery>;
export type GetFavoriteArticleFolderListTemplateQueryQueryResult =
  Apollo.QueryResult<
    GetFavoriteArticleFolderListTemplateQueryQuery,
    GetFavoriteArticleFolderListTemplateQueryQueryVariables
  >;
export const GetTrendArticleListQueryDocument = gql`
  query GetTrendArticleListQuery($input: ArticlesInput!) {
    articles(articlesInput: $input) {
      ...TrendArticleListFragment
    }
  }
  ${TrendArticleListFragmentFragmentDoc}
`;

/**
 * __useGetTrendArticleListQueryQuery__
 *
 * To run a query within a React component, call `useGetTrendArticleListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrendArticleListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrendArticleListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTrendArticleListQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTrendArticleListQueryQuery,
    GetTrendArticleListQueryQueryVariables
  > &
    (
      | { variables: GetTrendArticleListQueryQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetTrendArticleListQueryQuery,
    GetTrendArticleListQueryQueryVariables
  >(GetTrendArticleListQueryDocument, options);
}
export function useGetTrendArticleListQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTrendArticleListQueryQuery,
    GetTrendArticleListQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTrendArticleListQueryQuery,
    GetTrendArticleListQueryQueryVariables
  >(GetTrendArticleListQueryDocument, options);
}
export function useGetTrendArticleListQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetTrendArticleListQueryQuery,
    GetTrendArticleListQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetTrendArticleListQueryQuery,
    GetTrendArticleListQueryQueryVariables
  >(GetTrendArticleListQueryDocument, options);
}
export type GetTrendArticleListQueryQueryHookResult = ReturnType<
  typeof useGetTrendArticleListQueryQuery
>;
export type GetTrendArticleListQueryLazyQueryHookResult = ReturnType<
  typeof useGetTrendArticleListQueryLazyQuery
>;
export type GetTrendArticleListQuerySuspenseQueryHookResult = ReturnType<
  typeof useGetTrendArticleListQuerySuspenseQuery
>;
export type GetTrendArticleListQueryQueryResult = Apollo.QueryResult<
  GetTrendArticleListQueryQuery,
  GetTrendArticleListQueryQueryVariables
>;
export const GetTrendArticleDashboardTemplateQueryDocument = gql`
  query GetTrendArticleDashboardTemplateQuery(
    $enInput: ArticlesInput!
    $jpInput: ArticlesInput!
  ) {
    ...TrendArticleDashboardTemplateFragment
  }
  ${TrendArticleDashboardTemplateFragmentFragmentDoc}
`;

/**
 * __useGetTrendArticleDashboardTemplateQueryQuery__
 *
 * To run a query within a React component, call `useGetTrendArticleDashboardTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrendArticleDashboardTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrendArticleDashboardTemplateQueryQuery({
 *   variables: {
 *      enInput: // value for 'enInput'
 *      jpInput: // value for 'jpInput'
 *   },
 * });
 */
export function useGetTrendArticleDashboardTemplateQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTrendArticleDashboardTemplateQueryQuery,
    GetTrendArticleDashboardTemplateQueryQueryVariables
  > &
    (
      | {
          variables: GetTrendArticleDashboardTemplateQueryQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetTrendArticleDashboardTemplateQueryQuery,
    GetTrendArticleDashboardTemplateQueryQueryVariables
  >(GetTrendArticleDashboardTemplateQueryDocument, options);
}
export function useGetTrendArticleDashboardTemplateQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTrendArticleDashboardTemplateQueryQuery,
    GetTrendArticleDashboardTemplateQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTrendArticleDashboardTemplateQueryQuery,
    GetTrendArticleDashboardTemplateQueryQueryVariables
  >(GetTrendArticleDashboardTemplateQueryDocument, options);
}
export function useGetTrendArticleDashboardTemplateQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetTrendArticleDashboardTemplateQueryQuery,
    GetTrendArticleDashboardTemplateQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetTrendArticleDashboardTemplateQueryQuery,
    GetTrendArticleDashboardTemplateQueryQueryVariables
  >(GetTrendArticleDashboardTemplateQueryDocument, options);
}
export type GetTrendArticleDashboardTemplateQueryQueryHookResult = ReturnType<
  typeof useGetTrendArticleDashboardTemplateQueryQuery
>;
export type GetTrendArticleDashboardTemplateQueryLazyQueryHookResult =
  ReturnType<typeof useGetTrendArticleDashboardTemplateQueryLazyQuery>;
export type GetTrendArticleDashboardTemplateQuerySuspenseQueryHookResult =
  ReturnType<typeof useGetTrendArticleDashboardTemplateQuerySuspenseQuery>;
export type GetTrendArticleDashboardTemplateQueryQueryResult =
  Apollo.QueryResult<
    GetTrendArticleDashboardTemplateQueryQuery,
    GetTrendArticleDashboardTemplateQueryQueryVariables
  >;
