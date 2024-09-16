import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Article schema */
export type Article = Node & {
  __typename?: 'Article';
  articleUrl: Scalars['String']['output'];
  authorName?: Maybe<Scalars['String']['output']>;
  bookmarkId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  favoriteArticles?: Maybe<Array<FavoriteArticle>>;
  feeds?: Maybe<Array<Feed>>;
  id: Scalars['ID']['output'];
  isBookmarked: Scalars['Boolean']['output'];
  isEng: Scalars['Boolean']['output'];
  isFollowing: Scalars['Boolean']['output'];
  isPrivate: Scalars['Boolean']['output'];
  likeCount?: Maybe<Scalars['Int']['output']>;
  platform?: Maybe<Platform>;
  publishedAt?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  edges: Array<ArticleEdge>;
  pageInfo: PageInfo;
};

export type ArticleEdge = {
  __typename?: 'ArticleEdge';
  cursor: Scalars['String']['output'];
  node: Article;
};

export type ArticleOgp = {
  __typename?: 'ArticleOGP';
  articleUrl: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  faviconUrl: Scalars['String']['output'];
  siteName: Scalars['String']['output'];
  siteUrl: Scalars['String']['output'];
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ArticlesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  feedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  languageStatus?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  tab?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Bookmark schema */
export type Bookmark = Node & {
  __typename?: 'Bookmark';
  articleId: Scalars['String']['output'];
  articleUrl: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEng: Scalars['Boolean']['output'];
  isRead: Scalars['Boolean']['output'];
  platformFaviconUrl: Scalars['String']['output'];
  platformId?: Maybe<Scalars['String']['output']>;
  platformName: Scalars['String']['output'];
  platformUrl: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['Int']['output']>;
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type BookmarkConnection = {
  __typename?: 'BookmarkConnection';
  edges: Array<BookmarkEdge>;
  pageInfo: PageInfo;
};

export type BookmarkEdge = {
  __typename?: 'BookmarkEdge';
  cursor: Scalars['String']['output'];
  node: Bookmark;
};

export type BookmarksInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};

/** Category schema */
export type Category = Node & {
  __typename?: 'Category';
  createdAt: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type CreateBookmarkForUploadArticleInput = {
  articleUrl: Scalars['String']['input'];
  description: Scalars['String']['input'];
  platformFaviconUrl: Scalars['String']['input'];
  platformName: Scalars['String']['input'];
  platformUrl: Scalars['String']['input'];
  thumbnailUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateBookmarkInput = {
  articleId: Scalars['ID']['input'];
  articleUrl: Scalars['String']['input'];
  description: Scalars['String']['input'];
  isEng: Scalars['Boolean']['input'];
  isRead: Scalars['Boolean']['input'];
  platformFaviconUrl: Scalars['String']['input'];
  platformId?: InputMaybe<Scalars['ID']['input']>;
  platformName: Scalars['String']['input'];
  platformUrl: Scalars['String']['input'];
  publishedAt?: InputMaybe<Scalars['Int']['input']>;
  thumbnailUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateFavoriteArticleFolderInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type DeleteBookmarkInput = {
  bookmarkId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

/** Favorite Article schema */
export type FavoriteArticle = Node & {
  __typename?: 'FavoriteArticle';
  articleId?: Maybe<Scalars['String']['output']>;
  articleUrl: Scalars['String']['output'];
  authorName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isEng: Scalars['Boolean']['output'];
  isPrivate: Scalars['Boolean']['output'];
  isRead: Scalars['Boolean']['output'];
  platformFaviconUrl: Scalars['String']['output'];
  platformId?: Maybe<Scalars['String']['output']>;
  platformName: Scalars['String']['output'];
  platformUrl: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

/** Favorite Article Folder schema */
export type FavoriteArticleFolder = Node & {
  __typename?: 'FavoriteArticleFolder';
  createdAt: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  favoriteArticles?: Maybe<Array<FavoriteArticle>>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type FavoriteArticleFolderConnection = {
  __typename?: 'FavoriteArticleFolderConnection';
  edges: Array<FavoriteArticleFolderEdge>;
  pageInfo: PageInfo;
};

export type FavoriteArticleFolderEdge = {
  __typename?: 'FavoriteArticleFolderEdge';
  cursor: Scalars['String']['output'];
  node: FavoriteArticleFolder;
};

export type FavoriteArticleFoldersInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isAllFetch?: InputMaybe<Scalars['Boolean']['input']>;
  isFolderOnly?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Feed schema */
export type Feed = Node & {
  __typename?: 'Feed';
  apiQueryParam?: Maybe<Scalars['String']['output']>;
  category: Category;
  createdAt: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['Int']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  platform: Platform;
  rssUrl: Scalars['String']['output'];
  siteUrl: Scalars['String']['output'];
  thumbnailUrl: Scalars['String']['output'];
  trendPlatformType: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark: Bookmark;
  createBookmarkForUploadArticle: Bookmark;
  createFavoriteArticleFolder: FavoriteArticleFolder;
  deleteBookmark: Scalars['Boolean']['output'];
};


export type MutationCreateBookmarkArgs = {
  createBookmarkInput: CreateBookmarkInput;
};


export type MutationCreateBookmarkForUploadArticleArgs = {
  input: CreateBookmarkForUploadArticleInput;
};


export type MutationCreateFavoriteArticleFolderArgs = {
  input: CreateFavoriteArticleFolderInput;
};


export type MutationDeleteBookmarkArgs = {
  deleteBookmarkInput: DeleteBookmarkInput;
};

/** MyFeedFolder is a folder that contains a list of feeds. */
export type MyFeedFolder = Node & {
  __typename?: 'MyFeedFolder';
  createdAt: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  feeds?: Maybe<Array<Feed>>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Platform schema */
export type Platform = Node & {
  __typename?: 'Platform';
  createdAt: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['Int']['output']>;
  faviconUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEng: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  platformSiteType: Scalars['Int']['output'];
  siteUrl: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
};

/** Profile schema */
export type Profile = Node & {
  __typename?: 'Profile';
  createdAt: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['Int']['output']>;
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  isSuperAdmin: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  articleOpg: ArticleOgp;
  /** Get articles */
  articles: ArticleConnection;
  /** Get bookmarks */
  bookmarks: BookmarkConnection;
  favoriteArticleFolders: FavoriteArticleFolderConnection;
};


export type QueryArticleOpgArgs = {
  articleUrl: Scalars['String']['input'];
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

export type LoggedBaseLayoutFragmentFragment = { __typename?: 'Query', favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> } };

export type LoggedBaseLayoutQueryQueryVariables = Exact<{
  input: FavoriteArticleFoldersInput;
}>;


export type LoggedBaseLayoutQueryQuery = { __typename?: 'Query', favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> } };

export type DeskTopSidebarFragmentFragment = { __typename?: 'Query', favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> } };

export type FavoriteArticleFolderLinkFragmentFragment = { __typename?: 'FavoriteArticleFolder', id: string, title: string };

export type OgpPreviewContentFragmentFragment = { __typename?: 'ArticleOGP', title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, siteName: string, faviconUrl: string };

export type CreateBookmarkMutationMutationVariables = Exact<{
  input: CreateBookmarkInput;
}>;


export type CreateBookmarkMutationMutation = { __typename?: 'Mutation', createBookmark: { __typename?: 'Bookmark', id: string } };

export type DeleteBookmarkMutationMutationVariables = Exact<{
  input: DeleteBookmarkInput;
}>;


export type DeleteBookmarkMutationMutation = { __typename?: 'Mutation', deleteBookmark: boolean };

export type ArticleListQueryQueryVariables = Exact<{
  input: ArticlesInput;
}>;


export type ArticleListQueryQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, description: string, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string, siteUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> } };

export type ArticleOgpFragmentFragment = { __typename?: 'Query', articleOpg: { __typename?: 'ArticleOGP', title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, siteUrl: string, siteName: string, faviconUrl: string } };

export type ArticleOgpQueryQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type ArticleOgpQueryQuery = { __typename?: 'Query', articleOpg: { __typename?: 'ArticleOGP', title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, siteUrl: string, siteName: string, faviconUrl: string } };

export type ArticleCardItemFragmentFragment = { __typename?: 'Article', id: string, title: string, description: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, platform?: { __typename?: 'Platform', id: string, name: string, siteUrl: string, faviconUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null };

export type ArticleCardWrapperFragmentFragment = { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, description: string, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string, siteUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null };

export type ArticleListFragmentFragment = { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, description: string, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string, siteUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> };

export type ArticleDashboardTemplateFragmentFragment = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, description: string, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string, siteUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> } };

export type CreateBookmarkForUploadArticleMutationMutationVariables = Exact<{
  input: CreateBookmarkForUploadArticleInput;
}>;


export type CreateBookmarkForUploadArticleMutationMutation = { __typename?: 'Mutation', createBookmarkForUploadArticle: { __typename?: 'Bookmark', id: string } };

export type BookmarkListQueryQueryVariables = Exact<{
  input: BookmarksInput;
}>;


export type BookmarkListQueryQuery = { __typename?: 'Query', bookmarks: { __typename?: 'BookmarkConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'BookmarkEdge', node: { __typename?: 'Bookmark', id: string, title: string, description: string, articleUrl: string, thumbnailUrl: string, publishedAt?: number | null, articleId: string, platformId?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isRead: boolean, createdAt: number, updatedAt: number } }> } };

export type BookmarkCardItemFragmentFragment = { __typename?: 'Bookmark', id: string, title: string, thumbnailUrl: string, createdAt: number };

export type BookmarkCardWrapperFragmentFragment = { __typename?: 'Bookmark', id: string, title: string, description: string, articleUrl: string, thumbnailUrl: string, publishedAt?: number | null, articleId: string, platformId?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isRead: boolean, createdAt: number, updatedAt: number };

export type CreateBookmarkDialogContentFragmentFragment = { __typename?: 'ArticleOGP', title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, siteUrl: string, siteName: string, faviconUrl: string };

export type BookmarkListFragmentFragment = { __typename?: 'BookmarkConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'BookmarkEdge', node: { __typename?: 'Bookmark', id: string, title: string, description: string, articleUrl: string, thumbnailUrl: string, publishedAt?: number | null, articleId: string, platformId?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isRead: boolean, createdAt: number, updatedAt: number } }> };

export type BookmarkTemplateFragmentFragment = { __typename?: 'Query', bookmarks: { __typename?: 'BookmarkConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'BookmarkEdge', node: { __typename?: 'Bookmark', id: string, title: string, description: string, articleUrl: string, thumbnailUrl: string, publishedAt?: number | null, articleId: string, platformId?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isRead: boolean, createdAt: number, updatedAt: number } }> } };

export type CreateFavoriteArticleFolderMutationMutationVariables = Exact<{
  input: CreateFavoriteArticleFolderInput;
}>;


export type CreateFavoriteArticleFolderMutationMutation = { __typename?: 'Mutation', createFavoriteArticleFolder: { __typename?: 'FavoriteArticleFolder', id: string } };

export type FavoriteArticleFolderListQueryQueryVariables = Exact<{
  input: FavoriteArticleFoldersInput;
}>;


export type FavoriteArticleFolderListQueryQuery = { __typename?: 'Query', favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string, description?: string | null, favoriteArticles?: Array<{ __typename?: 'FavoriteArticle', id: string, title: string, articleUrl: string, thumbnailUrl: string, createdAt: number }> | null } }> } };

export type FavoriteArticleFolderCardFragmentFragment = { __typename?: 'FavoriteArticleFolder', id: string, title: string, description?: string | null, favoriteArticles?: Array<{ __typename?: 'FavoriteArticle', id: string, title: string, articleUrl: string, thumbnailUrl: string, createdAt: number }> | null };

export type FavoriteArticleFolderListFragmentFragment = { __typename?: 'FavoriteArticleFolderConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string, description?: string | null, favoriteArticles?: Array<{ __typename?: 'FavoriteArticle', id: string, title: string, articleUrl: string, thumbnailUrl: string, createdAt: number }> | null } }> };

export type FavoriteArticleFolderListTemplateFragmentFragment = { __typename?: 'Query', favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string, description?: string | null, favoriteArticles?: Array<{ __typename?: 'FavoriteArticle', id: string, title: string, articleUrl: string, thumbnailUrl: string, createdAt: number }> | null } }> } };

export type TrendArticleListFragmentFragment = { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, description: string, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string, siteUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> };

export type TrendArticleListQueryQueryVariables = Exact<{
  input: ArticlesInput;
}>;


export type TrendArticleListQueryQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, description: string, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string, siteUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> } };

export type TrendArticleDashboardTemplateFragmentFragment = { __typename?: 'Query', enArticles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, description: string, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string, siteUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> }, jpArticles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, description: string, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string, siteUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> } };

export type TrendArticleDashboardTemplateQueryQueryVariables = Exact<{
  enInput: ArticlesInput;
  jpInput: ArticlesInput;
}>;


export type TrendArticleDashboardTemplateQueryQuery = { __typename?: 'Query', enArticles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, description: string, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string, siteUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> }, jpArticles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, description: string, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string, siteUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> } };

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
    ${FavoriteArticleFolderLinkFragmentFragmentDoc}`;
export const LoggedBaseLayoutFragmentFragmentDoc = gql`
    fragment LoggedBaseLayoutFragment on Query {
  ...DeskTopSidebarFragment
}
    ${DeskTopSidebarFragmentFragmentDoc}`;
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
    fragment CreateBookmarkDialogContentFragment on ArticleOGP {
  title
  description
  thumbnailUrl
  articleUrl
  siteUrl
  siteName
  faviconUrl
  ...OGPPreviewContentFragment
}
    ${OgpPreviewContentFragmentFragmentDoc}`;
export const ArticleOgpFragmentFragmentDoc = gql`
    fragment ArticleOGPFragment on Query {
  articleOpg(articleUrl: $url) {
    ...CreateBookmarkDialogContentFragment
  }
}
    ${CreateBookmarkDialogContentFragmentFragmentDoc}`;
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
    ${ArticleCardItemFragmentFragmentDoc}`;
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
    ${ArticleCardWrapperFragmentFragmentDoc}`;
export const ArticleDashboardTemplateFragmentFragmentDoc = gql`
    fragment ArticleDashboardTemplateFragment on Query {
  articles(articlesInput: $input) {
    ...ArticleListFragment
  }
}
    ${ArticleListFragmentFragmentDoc}`;
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
    ${BookmarkCardItemFragmentFragmentDoc}`;
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
    ${BookmarkCardWrapperFragmentFragmentDoc}`;
export const BookmarkTemplateFragmentFragmentDoc = gql`
    fragment BookmarkTemplateFragment on Query {
  bookmarks(input: $input) {
    ...BookmarkListFragment
  }
}
    ${BookmarkListFragmentFragmentDoc}`;
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
    ${FavoriteArticleFolderCardFragmentFragmentDoc}`;
export const FavoriteArticleFolderListTemplateFragmentFragmentDoc = gql`
    fragment FavoriteArticleFolderListTemplateFragment on Query {
  favoriteArticleFolders(input: $input) {
    ...FavoriteArticleFolderListFragment
  }
}
    ${FavoriteArticleFolderListFragmentFragmentDoc}`;
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
    ${ArticleCardWrapperFragmentFragmentDoc}`;
export const TrendArticleDashboardTemplateFragmentFragmentDoc = gql`
    fragment TrendArticleDashboardTemplateFragment on Query {
  enArticles: articles(articlesInput: $enInput) {
    ...TrendArticleListFragment
  }
  jpArticles: articles(articlesInput: $jpInput) {
    ...TrendArticleListFragment
  }
}
    ${TrendArticleListFragmentFragmentDoc}`;
export const LoggedBaseLayoutQueryDocument = gql`
    query LoggedBaseLayoutQuery($input: FavoriteArticleFoldersInput!) {
  ...LoggedBaseLayoutFragment
}
    ${LoggedBaseLayoutFragmentFragmentDoc}`;

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
export function useLoggedBaseLayoutQueryQuery(baseOptions: Apollo.QueryHookOptions<LoggedBaseLayoutQueryQuery, LoggedBaseLayoutQueryQueryVariables> & ({ variables: LoggedBaseLayoutQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedBaseLayoutQueryQuery, LoggedBaseLayoutQueryQueryVariables>(LoggedBaseLayoutQueryDocument, options);
      }
export function useLoggedBaseLayoutQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedBaseLayoutQueryQuery, LoggedBaseLayoutQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedBaseLayoutQueryQuery, LoggedBaseLayoutQueryQueryVariables>(LoggedBaseLayoutQueryDocument, options);
        }
export function useLoggedBaseLayoutQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoggedBaseLayoutQueryQuery, LoggedBaseLayoutQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoggedBaseLayoutQueryQuery, LoggedBaseLayoutQueryQueryVariables>(LoggedBaseLayoutQueryDocument, options);
        }
export type LoggedBaseLayoutQueryQueryHookResult = ReturnType<typeof useLoggedBaseLayoutQueryQuery>;
export type LoggedBaseLayoutQueryLazyQueryHookResult = ReturnType<typeof useLoggedBaseLayoutQueryLazyQuery>;
export type LoggedBaseLayoutQuerySuspenseQueryHookResult = ReturnType<typeof useLoggedBaseLayoutQuerySuspenseQuery>;
export type LoggedBaseLayoutQueryQueryResult = Apollo.QueryResult<LoggedBaseLayoutQueryQuery, LoggedBaseLayoutQueryQueryVariables>;
export const CreateBookmarkMutationDocument = gql`
    mutation CreateBookmarkMutation($input: CreateBookmarkInput!) {
  createBookmark(createBookmarkInput: $input) {
    id
  }
}
    `;
export type CreateBookmarkMutationMutationFn = Apollo.MutationFunction<CreateBookmarkMutationMutation, CreateBookmarkMutationMutationVariables>;

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
export function useCreateBookmarkMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookmarkMutationMutation, CreateBookmarkMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookmarkMutationMutation, CreateBookmarkMutationMutationVariables>(CreateBookmarkMutationDocument, options);
      }
export type CreateBookmarkMutationMutationHookResult = ReturnType<typeof useCreateBookmarkMutationMutation>;
export type CreateBookmarkMutationMutationResult = Apollo.MutationResult<CreateBookmarkMutationMutation>;
export type CreateBookmarkMutationMutationOptions = Apollo.BaseMutationOptions<CreateBookmarkMutationMutation, CreateBookmarkMutationMutationVariables>;
export const DeleteBookmarkMutationDocument = gql`
    mutation DeleteBookmarkMutation($input: DeleteBookmarkInput!) {
  deleteBookmark(deleteBookmarkInput: $input)
}
    `;
export type DeleteBookmarkMutationMutationFn = Apollo.MutationFunction<DeleteBookmarkMutationMutation, DeleteBookmarkMutationMutationVariables>;

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
export function useDeleteBookmarkMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookmarkMutationMutation, DeleteBookmarkMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookmarkMutationMutation, DeleteBookmarkMutationMutationVariables>(DeleteBookmarkMutationDocument, options);
      }
export type DeleteBookmarkMutationMutationHookResult = ReturnType<typeof useDeleteBookmarkMutationMutation>;
export type DeleteBookmarkMutationMutationResult = Apollo.MutationResult<DeleteBookmarkMutationMutation>;
export type DeleteBookmarkMutationMutationOptions = Apollo.BaseMutationOptions<DeleteBookmarkMutationMutation, DeleteBookmarkMutationMutationVariables>;
export const ArticleListQueryDocument = gql`
    query ArticleListQuery($input: ArticlesInput!) {
  ...ArticleDashboardTemplateFragment
}
    ${ArticleDashboardTemplateFragmentFragmentDoc}`;

/**
 * __useArticleListQueryQuery__
 *
 * To run a query within a React component, call `useArticleListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleListQueryQuery(baseOptions: Apollo.QueryHookOptions<ArticleListQueryQuery, ArticleListQueryQueryVariables> & ({ variables: ArticleListQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleListQueryQuery, ArticleListQueryQueryVariables>(ArticleListQueryDocument, options);
      }
export function useArticleListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleListQueryQuery, ArticleListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleListQueryQuery, ArticleListQueryQueryVariables>(ArticleListQueryDocument, options);
        }
export function useArticleListQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ArticleListQueryQuery, ArticleListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArticleListQueryQuery, ArticleListQueryQueryVariables>(ArticleListQueryDocument, options);
        }
export type ArticleListQueryQueryHookResult = ReturnType<typeof useArticleListQueryQuery>;
export type ArticleListQueryLazyQueryHookResult = ReturnType<typeof useArticleListQueryLazyQuery>;
export type ArticleListQuerySuspenseQueryHookResult = ReturnType<typeof useArticleListQuerySuspenseQuery>;
export type ArticleListQueryQueryResult = Apollo.QueryResult<ArticleListQueryQuery, ArticleListQueryQueryVariables>;
export const ArticleOgpQueryDocument = gql`
    query ArticleOGPQuery($url: String!) {
  ...ArticleOGPFragment
}
    ${ArticleOgpFragmentFragmentDoc}`;

/**
 * __useArticleOgpQueryQuery__
 *
 * To run a query within a React component, call `useArticleOgpQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleOgpQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleOgpQueryQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useArticleOgpQueryQuery(baseOptions: Apollo.QueryHookOptions<ArticleOgpQueryQuery, ArticleOgpQueryQueryVariables> & ({ variables: ArticleOgpQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleOgpQueryQuery, ArticleOgpQueryQueryVariables>(ArticleOgpQueryDocument, options);
      }
export function useArticleOgpQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleOgpQueryQuery, ArticleOgpQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleOgpQueryQuery, ArticleOgpQueryQueryVariables>(ArticleOgpQueryDocument, options);
        }
export function useArticleOgpQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ArticleOgpQueryQuery, ArticleOgpQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArticleOgpQueryQuery, ArticleOgpQueryQueryVariables>(ArticleOgpQueryDocument, options);
        }
export type ArticleOgpQueryQueryHookResult = ReturnType<typeof useArticleOgpQueryQuery>;
export type ArticleOgpQueryLazyQueryHookResult = ReturnType<typeof useArticleOgpQueryLazyQuery>;
export type ArticleOgpQuerySuspenseQueryHookResult = ReturnType<typeof useArticleOgpQuerySuspenseQuery>;
export type ArticleOgpQueryQueryResult = Apollo.QueryResult<ArticleOgpQueryQuery, ArticleOgpQueryQueryVariables>;
export const CreateBookmarkForUploadArticleMutationDocument = gql`
    mutation CreateBookmarkForUploadArticleMutation($input: CreateBookmarkForUploadArticleInput!) {
  createBookmarkForUploadArticle(input: $input) {
    id
  }
}
    `;
export type CreateBookmarkForUploadArticleMutationMutationFn = Apollo.MutationFunction<CreateBookmarkForUploadArticleMutationMutation, CreateBookmarkForUploadArticleMutationMutationVariables>;

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
export function useCreateBookmarkForUploadArticleMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookmarkForUploadArticleMutationMutation, CreateBookmarkForUploadArticleMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookmarkForUploadArticleMutationMutation, CreateBookmarkForUploadArticleMutationMutationVariables>(CreateBookmarkForUploadArticleMutationDocument, options);
      }
export type CreateBookmarkForUploadArticleMutationMutationHookResult = ReturnType<typeof useCreateBookmarkForUploadArticleMutationMutation>;
export type CreateBookmarkForUploadArticleMutationMutationResult = Apollo.MutationResult<CreateBookmarkForUploadArticleMutationMutation>;
export type CreateBookmarkForUploadArticleMutationMutationOptions = Apollo.BaseMutationOptions<CreateBookmarkForUploadArticleMutationMutation, CreateBookmarkForUploadArticleMutationMutationVariables>;
export const BookmarkListQueryDocument = gql`
    query BookmarkListQuery($input: BookmarksInput!) {
  ...BookmarkTemplateFragment
}
    ${BookmarkTemplateFragmentFragmentDoc}`;

/**
 * __useBookmarkListQueryQuery__
 *
 * To run a query within a React component, call `useBookmarkListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarkListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarkListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBookmarkListQueryQuery(baseOptions: Apollo.QueryHookOptions<BookmarkListQueryQuery, BookmarkListQueryQueryVariables> & ({ variables: BookmarkListQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookmarkListQueryQuery, BookmarkListQueryQueryVariables>(BookmarkListQueryDocument, options);
      }
export function useBookmarkListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookmarkListQueryQuery, BookmarkListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookmarkListQueryQuery, BookmarkListQueryQueryVariables>(BookmarkListQueryDocument, options);
        }
export function useBookmarkListQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BookmarkListQueryQuery, BookmarkListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BookmarkListQueryQuery, BookmarkListQueryQueryVariables>(BookmarkListQueryDocument, options);
        }
export type BookmarkListQueryQueryHookResult = ReturnType<typeof useBookmarkListQueryQuery>;
export type BookmarkListQueryLazyQueryHookResult = ReturnType<typeof useBookmarkListQueryLazyQuery>;
export type BookmarkListQuerySuspenseQueryHookResult = ReturnType<typeof useBookmarkListQuerySuspenseQuery>;
export type BookmarkListQueryQueryResult = Apollo.QueryResult<BookmarkListQueryQuery, BookmarkListQueryQueryVariables>;
export const CreateFavoriteArticleFolderMutationDocument = gql`
    mutation CreateFavoriteArticleFolderMutation($input: CreateFavoriteArticleFolderInput!) {
  createFavoriteArticleFolder(input: $input) {
    id
  }
}
    `;
export type CreateFavoriteArticleFolderMutationMutationFn = Apollo.MutationFunction<CreateFavoriteArticleFolderMutationMutation, CreateFavoriteArticleFolderMutationMutationVariables>;

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
export function useCreateFavoriteArticleFolderMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateFavoriteArticleFolderMutationMutation, CreateFavoriteArticleFolderMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFavoriteArticleFolderMutationMutation, CreateFavoriteArticleFolderMutationMutationVariables>(CreateFavoriteArticleFolderMutationDocument, options);
      }
export type CreateFavoriteArticleFolderMutationMutationHookResult = ReturnType<typeof useCreateFavoriteArticleFolderMutationMutation>;
export type CreateFavoriteArticleFolderMutationMutationResult = Apollo.MutationResult<CreateFavoriteArticleFolderMutationMutation>;
export type CreateFavoriteArticleFolderMutationMutationOptions = Apollo.BaseMutationOptions<CreateFavoriteArticleFolderMutationMutation, CreateFavoriteArticleFolderMutationMutationVariables>;
export const FavoriteArticleFolderListQueryDocument = gql`
    query FavoriteArticleFolderListQuery($input: FavoriteArticleFoldersInput!) {
  ...FavoriteArticleFolderListTemplateFragment
}
    ${FavoriteArticleFolderListTemplateFragmentFragmentDoc}`;

/**
 * __useFavoriteArticleFolderListQueryQuery__
 *
 * To run a query within a React component, call `useFavoriteArticleFolderListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoriteArticleFolderListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoriteArticleFolderListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFavoriteArticleFolderListQueryQuery(baseOptions: Apollo.QueryHookOptions<FavoriteArticleFolderListQueryQuery, FavoriteArticleFolderListQueryQueryVariables> & ({ variables: FavoriteArticleFolderListQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavoriteArticleFolderListQueryQuery, FavoriteArticleFolderListQueryQueryVariables>(FavoriteArticleFolderListQueryDocument, options);
      }
export function useFavoriteArticleFolderListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavoriteArticleFolderListQueryQuery, FavoriteArticleFolderListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavoriteArticleFolderListQueryQuery, FavoriteArticleFolderListQueryQueryVariables>(FavoriteArticleFolderListQueryDocument, options);
        }
export function useFavoriteArticleFolderListQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FavoriteArticleFolderListQueryQuery, FavoriteArticleFolderListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FavoriteArticleFolderListQueryQuery, FavoriteArticleFolderListQueryQueryVariables>(FavoriteArticleFolderListQueryDocument, options);
        }
export type FavoriteArticleFolderListQueryQueryHookResult = ReturnType<typeof useFavoriteArticleFolderListQueryQuery>;
export type FavoriteArticleFolderListQueryLazyQueryHookResult = ReturnType<typeof useFavoriteArticleFolderListQueryLazyQuery>;
export type FavoriteArticleFolderListQuerySuspenseQueryHookResult = ReturnType<typeof useFavoriteArticleFolderListQuerySuspenseQuery>;
export type FavoriteArticleFolderListQueryQueryResult = Apollo.QueryResult<FavoriteArticleFolderListQueryQuery, FavoriteArticleFolderListQueryQueryVariables>;
export const TrendArticleListQueryDocument = gql`
    query TrendArticleListQuery($input: ArticlesInput!) {
  articles(articlesInput: $input) {
    ...TrendArticleListFragment
  }
}
    ${TrendArticleListFragmentFragmentDoc}`;

/**
 * __useTrendArticleListQueryQuery__
 *
 * To run a query within a React component, call `useTrendArticleListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrendArticleListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrendArticleListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrendArticleListQueryQuery(baseOptions: Apollo.QueryHookOptions<TrendArticleListQueryQuery, TrendArticleListQueryQueryVariables> & ({ variables: TrendArticleListQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrendArticleListQueryQuery, TrendArticleListQueryQueryVariables>(TrendArticleListQueryDocument, options);
      }
export function useTrendArticleListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrendArticleListQueryQuery, TrendArticleListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrendArticleListQueryQuery, TrendArticleListQueryQueryVariables>(TrendArticleListQueryDocument, options);
        }
export function useTrendArticleListQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TrendArticleListQueryQuery, TrendArticleListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TrendArticleListQueryQuery, TrendArticleListQueryQueryVariables>(TrendArticleListQueryDocument, options);
        }
export type TrendArticleListQueryQueryHookResult = ReturnType<typeof useTrendArticleListQueryQuery>;
export type TrendArticleListQueryLazyQueryHookResult = ReturnType<typeof useTrendArticleListQueryLazyQuery>;
export type TrendArticleListQuerySuspenseQueryHookResult = ReturnType<typeof useTrendArticleListQuerySuspenseQuery>;
export type TrendArticleListQueryQueryResult = Apollo.QueryResult<TrendArticleListQueryQuery, TrendArticleListQueryQueryVariables>;
export const TrendArticleDashboardTemplateQueryDocument = gql`
    query TrendArticleDashboardTemplateQuery($enInput: ArticlesInput!, $jpInput: ArticlesInput!) {
  enArticles: articles(articlesInput: $enInput) {
    ...TrendArticleListFragment
  }
  jpArticles: articles(articlesInput: $jpInput) {
    ...TrendArticleListFragment
  }
  ...TrendArticleDashboardTemplateFragment
}
    ${TrendArticleListFragmentFragmentDoc}
${TrendArticleDashboardTemplateFragmentFragmentDoc}`;

/**
 * __useTrendArticleDashboardTemplateQueryQuery__
 *
 * To run a query within a React component, call `useTrendArticleDashboardTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrendArticleDashboardTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrendArticleDashboardTemplateQueryQuery({
 *   variables: {
 *      enInput: // value for 'enInput'
 *      jpInput: // value for 'jpInput'
 *   },
 * });
 */
export function useTrendArticleDashboardTemplateQueryQuery(baseOptions: Apollo.QueryHookOptions<TrendArticleDashboardTemplateQueryQuery, TrendArticleDashboardTemplateQueryQueryVariables> & ({ variables: TrendArticleDashboardTemplateQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrendArticleDashboardTemplateQueryQuery, TrendArticleDashboardTemplateQueryQueryVariables>(TrendArticleDashboardTemplateQueryDocument, options);
      }
export function useTrendArticleDashboardTemplateQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrendArticleDashboardTemplateQueryQuery, TrendArticleDashboardTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrendArticleDashboardTemplateQueryQuery, TrendArticleDashboardTemplateQueryQueryVariables>(TrendArticleDashboardTemplateQueryDocument, options);
        }
export function useTrendArticleDashboardTemplateQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TrendArticleDashboardTemplateQueryQuery, TrendArticleDashboardTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TrendArticleDashboardTemplateQueryQuery, TrendArticleDashboardTemplateQueryQueryVariables>(TrendArticleDashboardTemplateQueryDocument, options);
        }
export type TrendArticleDashboardTemplateQueryQueryHookResult = ReturnType<typeof useTrendArticleDashboardTemplateQueryQuery>;
export type TrendArticleDashboardTemplateQueryLazyQueryHookResult = ReturnType<typeof useTrendArticleDashboardTemplateQueryLazyQuery>;
export type TrendArticleDashboardTemplateQuerySuspenseQueryHookResult = ReturnType<typeof useTrendArticleDashboardTemplateQuerySuspenseQuery>;
export type TrendArticleDashboardTemplateQueryQueryResult = Apollo.QueryResult<TrendArticleDashboardTemplateQueryQuery, TrendArticleDashboardTemplateQueryQueryVariables>;