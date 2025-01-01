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
  favoriteArticleFolderIds: Array<Scalars['String']['output']>;
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
  favoriteArticleFolderIds: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isEng: Scalars['Boolean']['output'];
  isFollowing: Scalars['Boolean']['output'];
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

export type CreateFavoriteArticleForUploadArticleInput = {
  articleUrl: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  favoriteArticleFolderId: Scalars['ID']['input'];
  platformFaviconUrl: Scalars['String']['input'];
  platformName: Scalars['String']['input'];
  platformUrl: Scalars['String']['input'];
  thumbnailUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateFavoriteArticleInput = {
  articleId: Scalars['ID']['input'];
  articleUrl: Scalars['String']['input'];
  authorName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  favoriteArticleFolderId: Scalars['ID']['input'];
  isEng: Scalars['Boolean']['input'];
  isPrivate: Scalars['Boolean']['input'];
  isRead: Scalars['Boolean']['input'];
  platformFaviconUrl: Scalars['String']['input'];
  platformId?: InputMaybe<Scalars['ID']['input']>;
  platformName: Scalars['String']['input'];
  platformUrl: Scalars['String']['input'];
  publishedAt?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateMyFeedFolderInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  feedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type DeleteBookmarkInput = {
  bookmarkId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type DeleteFavoriteArticleByArticleIdInput = {
  articleId: Scalars['ID']['input'];
  favoriteArticleFolderId: Scalars['ID']['input'];
};

export type DeleteFavoriteArticleFolderInput = {
  id: Scalars['ID']['input'];
};

export type DeleteFavoriteArticleInput = {
  id: Scalars['ID']['input'];
};

export type DeleteMyFeedFolderInput = {
  myFeedFolderId: Scalars['ID']['input'];
  userId: Scalars['String']['input'];
};

export type FavoriteAllFolderArticleConnection = {
  __typename?: 'FavoriteAllFolderArticleConnection';
  edges: Array<FavoriteAllFolderArticleEdge>;
  pageInfo: PageInfo;
};

export type FavoriteAllFolderArticleEdge = {
  __typename?: 'FavoriteAllFolderArticleEdge';
  cursor: Scalars['String']['output'];
  favoriteArticleFolders: Array<FavoriteArticleFolder>;
  node: FavoriteArticle;
};

export type FavoriteAllFolderArticlesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Favorite Article schema */
export type FavoriteArticle = Node & {
  __typename?: 'FavoriteArticle';
  articleId: Scalars['String']['output'];
  articleUrl: Scalars['String']['output'];
  authorName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  favoriteArticleFolderId: Scalars['String']['output'];
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

export type FavoriteArticleConnection = {
  __typename?: 'FavoriteArticleConnection';
  edges: Array<FavoriteArticleEdge>;
  pageInfo: PageInfo;
};

export type FavoriteArticleEdge = {
  __typename?: 'FavoriteArticleEdge';
  cursor: Scalars['String']['output'];
  node: FavoriteArticle;
};

/** Favorite Article Folder schema */
export type FavoriteArticleFolder = Node & {
  __typename?: 'FavoriteArticleFolder';
  createdAt: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  favoriteArticles: Array<FavoriteArticle>;
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

export type FavoriteArticleFolderInput = {
  id: Scalars['ID']['input'];
  isFolderOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FavoriteArticleFoldersInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isAllFetch?: InputMaybe<Scalars['Boolean']['input']>;
  isFavoriteArticleAllFetch?: InputMaybe<Scalars['Boolean']['input']>;
  isFolderOnly?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type FavoriteArticlesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  folderId?: InputMaybe<Scalars['ID']['input']>;
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
  myFeedIds?: Maybe<Array<Scalars['String']['output']>>;
  name: Scalars['String']['output'];
  platform: Platform;
  rssUrl: Scalars['String']['output'];
  siteUrl: Scalars['String']['output'];
  thumbnailUrl: Scalars['String']['output'];
  trendPlatformType: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type FeedConnection = {
  __typename?: 'FeedConnection';
  edges: Array<FeedEdge>;
  pageInfo: PageInfo;
};

export type FeedEdge = {
  __typename?: 'FeedEdge';
  cursor: Scalars['String']['output'];
  node: Feed;
};

export type FeedInput = {
  id: Scalars['ID']['input'];
};

export type FeedsInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  platformId?: InputMaybe<Scalars['String']['input']>;
  platformSiteType?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark: Bookmark;
  createBookmarkForUploadArticle: Bookmark;
  createFavoriteArticle: FavoriteArticle;
  createFavoriteArticleFolder: FavoriteArticleFolder;
  createFavoriteArticleForUploadArticle: FavoriteArticle;
  createMyFeedFolder: MyFeedFolder;
  deleteBookmark: Scalars['Boolean']['output'];
  deleteFavoriteArticle: Scalars['Boolean']['output'];
  deleteFavoriteArticleByArticleId: Scalars['Boolean']['output'];
  deleteFavoriteArticleFolder: Scalars['Boolean']['output'];
  deleteMyFeedFolder: Scalars['Boolean']['output'];
  updateFavoriteArticleFolder: FavoriteArticleFolder;
  updateMyFeedFolder: MyFeedFolder;
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


export type MutationCreateFavoriteArticleForUploadArticleArgs = {
  input: CreateFavoriteArticleForUploadArticleInput;
};


export type MutationCreateMyFeedFolderArgs = {
  createMyFeedFolderInput: CreateMyFeedFolderInput;
};


export type MutationDeleteBookmarkArgs = {
  deleteBookmarkInput: DeleteBookmarkInput;
};


export type MutationDeleteFavoriteArticleArgs = {
  input: DeleteFavoriteArticleInput;
};


export type MutationDeleteFavoriteArticleByArticleIdArgs = {
  input: DeleteFavoriteArticleByArticleIdInput;
};


export type MutationDeleteFavoriteArticleFolderArgs = {
  input: DeleteFavoriteArticleFolderInput;
};


export type MutationDeleteMyFeedFolderArgs = {
  deleteMyFeedFolderInput: DeleteMyFeedFolderInput;
};


export type MutationUpdateFavoriteArticleFolderArgs = {
  input: UpdateFavoriteArticleFolderInput;
};


export type MutationUpdateMyFeedFolderArgs = {
  updateMyFeedFolderInput: UpdateMyFeedFolderInput;
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

export type MyFeedFolderConnection = {
  __typename?: 'MyFeedFolderConnection';
  edges: Array<MyFeedFolderEdge>;
  pageInfo: PageInfo;
};

export type MyFeedFolderEdge = {
  __typename?: 'MyFeedFolderEdge';
  cursor: Scalars['String']['output'];
  node: MyFeedFolder;
};

export type MyFeedFolderInput = {
  id: Scalars['String']['input'];
};

export type MyFeedFoldersInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
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
  favoriteAllFolderArticles: FavoriteAllFolderArticleConnection;
  favoriteArticleFolder: FavoriteArticleFolder;
  favoriteArticleFolders: FavoriteArticleFolderConnection;
  favoriteArticles: FavoriteArticleConnection;
  feed: Feed;
  /** Get feeds */
  feeds: FeedConnection;
  myFeedFolder: MyFeedFolder;
  /** Get my feed folders */
  myFeedFolders: MyFeedFolderConnection;
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


export type QueryFavoriteAllFolderArticlesArgs = {
  input?: InputMaybe<FavoriteAllFolderArticlesInput>;
};


export type QueryFavoriteArticleFolderArgs = {
  input: FavoriteArticleFolderInput;
};


export type QueryFavoriteArticleFoldersArgs = {
  input?: InputMaybe<FavoriteArticleFoldersInput>;
};


export type QueryFavoriteArticlesArgs = {
  input?: InputMaybe<FavoriteArticlesInput>;
};


export type QueryFeedArgs = {
  feedInput?: InputMaybe<FeedInput>;
};


export type QueryFeedsArgs = {
  feedsInput: FeedsInput;
};


export type QueryMyFeedFolderArgs = {
  myFeedFolderInput: MyFeedFolderInput;
};


export type QueryMyFeedFoldersArgs = {
  myFeedFoldersInput: MyFeedFoldersInput;
};

export type UpdateFavoriteArticleFolderInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type UpdateMyFeedFolderInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  feedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  myFeedFolderId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GetLoggedBaseLayoutQueryQueryVariables = Exact<{
  input: FavoriteArticleFoldersInput;
}>;


export type GetLoggedBaseLayoutQueryQuery = { __typename?: 'Query', favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> } };

export type FavoriteArticleFolderLinkFragmentFragment = { __typename?: 'FavoriteArticleFolder', id: string, title: string };

export type ArticleCardItemFragmentFragment = { __typename?: 'Article', id: string, title: string, description: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, platform?: { __typename?: 'Platform', id: string, name: string, siteUrl: string, faviconUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null };

export type ArticleCardWrapperFragmentFragment = { __typename: 'Article', id: string, title: string, description: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, isFollowing: boolean, favoriteArticleFolderIds: Array<string>, platform?: { __typename?: 'Platform', id: string, name: string, siteUrl: string, faviconUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null };

export type FavoriteFolderArticleCardWrapperFragmentFragment = { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> };

export type ArticleListQueryQueryVariables = Exact<{
  input: ArticlesInput;
}>;


export type ArticleListQueryQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename: 'Article', id: string, title: string, description: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, isFollowing: boolean, favoriteArticleFolderIds: Array<string>, platform?: { __typename?: 'Platform', id: string, name: string, siteUrl: string, faviconUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> } };

export type ArticleDashboardTemplateQueryQueryVariables = Exact<{
  input: ArticlesInput;
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput;
}>;


export type ArticleDashboardTemplateQueryQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename: 'Article', id: string, title: string, description: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, isFollowing: boolean, favoriteArticleFolderIds: Array<string>, platform?: { __typename?: 'Platform', id: string, name: string, siteUrl: string, faviconUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> }, favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> } };

export type UseArticleManageBookmarkFragmentFragment = { __typename?: 'Article', id: string, title: string, description: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, platform?: { __typename?: 'Platform', id: string, name: string, siteUrl: string, faviconUrl: string } | null };

export type UseArticleManageFavoriteArticleFragmentFragment = { __typename: 'Article', id: string, title: string, description: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, isFollowing: boolean, favoriteArticleFolderIds: Array<string>, platform?: { __typename?: 'Platform', id: string, name: string, siteUrl: string, faviconUrl: string } | null };

export type FavoriteFolderUseArticleManageFavoriteArticleFragmentFragment = { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> };

export type CreateBookmarkForUploadArticleMutationMutationVariables = Exact<{
  input: CreateBookmarkForUploadArticleInput;
}>;


export type CreateBookmarkForUploadArticleMutationMutation = { __typename?: 'Mutation', createBookmarkForUploadArticle: { __typename?: 'Bookmark', id: string } };

export type BookmarkCardItemFragmentFragment = { __typename?: 'Bookmark', id: string, title: string, articleUrl: string, thumbnailUrl: string, createdAt: number };

export type BookmarkCardWrapperFragmentFragment = { __typename?: 'Bookmark', id: string, title: string, description: string, articleUrl: string, thumbnailUrl: string, publishedAt?: number | null, articleId: string, platformId?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isRead: boolean, createdAt: number, updatedAt: number, isFollowing: boolean, favoriteArticleFolderIds: Array<string> };

export type FavoriteFolderBookmarkCardWrapperFragmentFragment = { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> };

export type CreateBookmarkDialogContentFragmentFragment = { __typename?: 'Query', articleOpg: { __typename?: 'ArticleOGP', title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, siteUrl: string, siteName: string, faviconUrl: string } };

export type GetCreateBookmarkDialogArticleOgpQueryQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type GetCreateBookmarkDialogArticleOgpQueryQuery = { __typename?: 'Query', articleOpg: { __typename?: 'ArticleOGP', title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, siteUrl: string, siteName: string, faviconUrl: string } };

export type BookmarkListQueryQueryVariables = Exact<{
  input: BookmarksInput;
}>;


export type BookmarkListQueryQuery = { __typename?: 'Query', bookmarks: { __typename?: 'BookmarkConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'BookmarkEdge', node: { __typename?: 'Bookmark', id: string, title: string, description: string, articleUrl: string, thumbnailUrl: string, publishedAt?: number | null, articleId: string, platformId?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isRead: boolean, createdAt: number, updatedAt: number, isFollowing: boolean, favoriteArticleFolderIds: Array<string> } }> } };

export type BookmarkTemplateQueryQueryVariables = Exact<{
  input: BookmarksInput;
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput;
}>;


export type BookmarkTemplateQueryQuery = { __typename?: 'Query', bookmarks: { __typename?: 'BookmarkConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'BookmarkEdge', node: { __typename?: 'Bookmark', id: string, title: string, description: string, articleUrl: string, thumbnailUrl: string, publishedAt?: number | null, articleId: string, platformId?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isRead: boolean, createdAt: number, updatedAt: number, isFollowing: boolean, favoriteArticleFolderIds: Array<string> } }> }, favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> } };

export type UseBookmarkMangeFavoriteArticleFragment = { __typename?: 'Bookmark', id: string, title: string, description: string, articleUrl: string, thumbnailUrl: string, publishedAt?: number | null, articleId: string, platformId?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isRead: boolean, createdAt: number, updatedAt: number, isFollowing: boolean, favoriteArticleFolderIds: Array<string> };

export type FavoriteFolderUseBookmarkManageFavoriteArticleFragmentFragment = { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> };

export type CreateBookmarkMutationMutationVariables = Exact<{
  input: CreateBookmarkInput;
}>;


export type CreateBookmarkMutationMutation = { __typename?: 'Mutation', createBookmark: { __typename?: 'Bookmark', id: string } };

export type DeleteBookmarkMutationMutationVariables = Exact<{
  input: DeleteBookmarkInput;
}>;


export type DeleteBookmarkMutationMutation = { __typename?: 'Mutation', deleteBookmark: boolean };

export type CreateFavoriteArticleForUploadArticleMutationMutationVariables = Exact<{
  input: CreateFavoriteArticleForUploadArticleInput;
}>;


export type CreateFavoriteArticleForUploadArticleMutationMutation = { __typename?: 'Mutation', createFavoriteArticleForUploadArticle: { __typename?: 'FavoriteArticle', id: string } };

export type AllFolderFavoriteArticleCardItemFragmentFragment = { __typename?: 'FavoriteAllFolderArticleEdge', node: { __typename?: 'FavoriteArticle', id: string, title: string, articleUrl: string, thumbnailUrl: string, createdAt: number }, favoriteArticleFolders: Array<{ __typename?: 'FavoriteArticleFolder', id: string, title: string }> };

export type AllFolderFavoriteArticleCardWrapperFragmentFragment = { __typename?: 'FavoriteAllFolderArticleEdge', node: { __typename?: 'FavoriteArticle', id: string, title: string, articleUrl: string, thumbnailUrl: string, platformId?: string | null, platformUrl: string, platformName: string, platformFaviconUrl: string, createdAt: number }, favoriteArticleFolders: Array<{ __typename?: 'FavoriteArticleFolder', id: string, title: string }> };

export type FavoriteFolderAllFolderArticleCardWrapperFragmentFragment = { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string, favoriteArticles: Array<{ __typename?: 'FavoriteArticle', id: string, articleId: string }> } }> };

export type FavoriteArticleCardItemFragmentFragment = { __typename?: 'FavoriteArticle', id: string, articleId: string, platformId?: string | null, favoriteArticleFolderId: string, userId: string, title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isPrivate: boolean, isRead: boolean, createdAt: number, updatedAt: number };

export type FavoriteArticleCardWrapperFragmentFragment = { __typename?: 'FavoriteArticle', id: string, articleId: string, platformId?: string | null, favoriteArticleFolderId: string, userId: string, title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isPrivate: boolean, isRead: boolean, createdAt: number, updatedAt: number };

export type FavoriteFolderFavoriteArticleCardWrapperFragmentFragment = { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string, favoriteArticles: Array<{ __typename?: 'FavoriteArticle', id: string, articleId: string }> } }> };

export type FavoriteArticleFolderCardFragmentFragment = { __typename?: 'FavoriteArticleFolder', id: string, title: string, description?: string | null, favoriteArticles: Array<{ __typename?: 'FavoriteArticle', id: string, title: string, articleUrl: string, thumbnailUrl: string, createdAt: number }> };

export type CreateFavoriteArticleDialogContentFragmentFragment = { __typename?: 'Query', articleOpg: { __typename?: 'ArticleOGP', title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, siteUrl: string, siteName: string, faviconUrl: string } };

export type GetCreateFavoriteArticleDialogOgpQueryQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type GetCreateFavoriteArticleDialogOgpQueryQuery = { __typename?: 'Query', articleOpg: { __typename?: 'ArticleOGP', title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, siteUrl: string, siteName: string, faviconUrl: string } };

export type CopyTargetFavoriteArticleFolderItemFragmentFragment = { __typename?: 'FavoriteArticleFolder', id: string, title: string, favoriteArticles: Array<{ __typename?: 'FavoriteArticle', id: string, articleId: string }> };

export type CopyFavoriteArticleDropdownMenuContentFragmentFragment = { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string, favoriteArticles: Array<{ __typename?: 'FavoriteArticle', id: string, articleId: string }> } }> };

export type FollowTargetFavoriteArticleFolderItemFragmentFragment = { __typename?: 'FavoriteArticleFolder', id: string, title: string };

export type FollowFavoriteArticleDropdownMenuContentFragmentFragment = { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> };

export type AllFolderFavoriteArticleListQueryQueryVariables = Exact<{
  input: FavoriteAllFolderArticlesInput;
}>;


export type AllFolderFavoriteArticleListQueryQuery = { __typename?: 'Query', favoriteAllFolderArticles: { __typename?: 'FavoriteAllFolderArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'FavoriteAllFolderArticleEdge', node: { __typename?: 'FavoriteArticle', id: string, title: string, articleUrl: string, thumbnailUrl: string, platformId?: string | null, platformUrl: string, platformName: string, platformFaviconUrl: string, createdAt: number }, favoriteArticleFolders: Array<{ __typename?: 'FavoriteArticleFolder', id: string, title: string }> }> } };

export type FavoriteArticleFolderListQueryQueryVariables = Exact<{
  input: FavoriteArticleFoldersInput;
}>;


export type FavoriteArticleFolderListQueryQuery = { __typename?: 'Query', favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string, description?: string | null, favoriteArticles: Array<{ __typename?: 'FavoriteArticle', id: string, title: string, articleUrl: string, thumbnailUrl: string, createdAt: number }> } }> } };

export type FavoriteArticleListQueryQueryVariables = Exact<{
  input: FavoriteArticlesInput;
}>;


export type FavoriteArticleListQueryQuery = { __typename?: 'Query', favoriteArticles: { __typename?: 'FavoriteArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'FavoriteArticleEdge', node: { __typename?: 'FavoriteArticle', id: string, articleId: string, platformId?: string | null, favoriteArticleFolderId: string, userId: string, title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isPrivate: boolean, isRead: boolean, createdAt: number, updatedAt: number } }> } };

export type AllFolderFavoriteArticleListTemplateQueryQueryVariables = Exact<{
  favoriteAllFolderArticlesInput: FavoriteAllFolderArticlesInput;
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput;
}>;


export type AllFolderFavoriteArticleListTemplateQueryQuery = { __typename?: 'Query', favoriteAllFolderArticles: { __typename?: 'FavoriteAllFolderArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'FavoriteAllFolderArticleEdge', node: { __typename?: 'FavoriteArticle', id: string, title: string, articleUrl: string, thumbnailUrl: string, platformId?: string | null, platformUrl: string, platformName: string, platformFaviconUrl: string, createdAt: number }, favoriteArticleFolders: Array<{ __typename?: 'FavoriteArticleFolder', id: string, title: string }> }> }, favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string, favoriteArticles: Array<{ __typename?: 'FavoriteArticle', id: string, articleId: string }> } }> } };

export type FavoriteArticleFolderListTemplateQueryQueryVariables = Exact<{
  input: FavoriteArticleFoldersInput;
}>;


export type FavoriteArticleFolderListTemplateQueryQuery = { __typename?: 'Query', favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string, description?: string | null, favoriteArticles: Array<{ __typename?: 'FavoriteArticle', id: string, title: string, articleUrl: string, thumbnailUrl: string, createdAt: number }> } }> } };

export type FavoriteArticleListByFolderIdTemplateQueryQueryVariables = Exact<{
  input: FavoriteArticlesInput;
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput;
}>;


export type FavoriteArticleListByFolderIdTemplateQueryQuery = { __typename?: 'Query', favoriteArticles: { __typename?: 'FavoriteArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'FavoriteArticleEdge', node: { __typename?: 'FavoriteArticle', id: string, articleId: string, platformId?: string | null, favoriteArticleFolderId: string, userId: string, title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isPrivate: boolean, isRead: boolean, createdAt: number, updatedAt: number } }> }, favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string, favoriteArticles: Array<{ __typename?: 'FavoriteArticle', id: string, articleId: string }> } }> } };

export type GetServerFavoriteArticleListByFolderIdTemplateQueryVariables = Exact<{
  favoriteArticleFolderInput: FavoriteArticleFolderInput;
}>;


export type GetServerFavoriteArticleListByFolderIdTemplateQuery = { __typename?: 'Query', favoriteArticleFolder: { __typename?: 'FavoriteArticleFolder', id: string, title: string } };

export type UseManageFavoriteArticleFragment = { __typename?: 'FavoriteArticle', id: string, articleId: string, platformId?: string | null, favoriteArticleFolderId: string, userId: string, title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, platformName: string, platformUrl: string, platformFaviconUrl: string, isEng: boolean, isPrivate: boolean, isRead: boolean, createdAt: number, updatedAt: number };

export type FavoriteFolderUseManageFavoriteArticleFragmentFragment = { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> };

export type CreateFavoriteArticleFolderMutationMutationVariables = Exact<{
  input: CreateFavoriteArticleFolderInput;
}>;


export type CreateFavoriteArticleFolderMutationMutation = { __typename?: 'Mutation', createFavoriteArticleFolder: { __typename?: 'FavoriteArticleFolder', id: string, title: string } };

export type CreateFavoriteArticleMutationMutationVariables = Exact<{
  input: CreateFavoriteArticleInput;
}>;


export type CreateFavoriteArticleMutationMutation = { __typename?: 'Mutation', createFavoriteArticle: { __typename?: 'FavoriteArticle', id: string, favoriteArticleFolderId: string } };

export type DeleteFavoriteArticleByArticleIdMutationMutationVariables = Exact<{
  input: DeleteFavoriteArticleByArticleIdInput;
}>;


export type DeleteFavoriteArticleByArticleIdMutationMutation = { __typename?: 'Mutation', deleteFavoriteArticleByArticleId: boolean };

export type DeleteFavoriteArticleFolderMutationMutationVariables = Exact<{
  input: DeleteFavoriteArticleFolderInput;
}>;


export type DeleteFavoriteArticleFolderMutationMutation = { __typename?: 'Mutation', deleteFavoriteArticleFolder: boolean };

export type UpdateFavoriteArticleFolderMutationMutationVariables = Exact<{
  input: UpdateFavoriteArticleFolderInput;
}>;


export type UpdateFavoriteArticleFolderMutationMutation = { __typename?: 'Mutation', updateFavoriteArticleFolder: { __typename?: 'FavoriteArticleFolder', id: string } };

export type FeedCardItemFragmentFragment = { __typename?: 'Feed', id: string, name: string, description: string, siteUrl: string, thumbnailUrl: string, platform: { __typename?: 'Platform', id: string, faviconUrl: string } };

export type FeedCardWrapperFragmentFragment = { __typename?: 'Feed', id: string, myFeedIds?: Array<string> | null, name: string, description: string, siteUrl: string, thumbnailUrl: string, platform: { __typename?: 'Platform', id: string, faviconUrl: string } };

export type FeedArticleListQueryQueryVariables = Exact<{
  input: ArticlesInput;
}>;


export type FeedArticleListQueryQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename: 'Article', id: string, title: string, description: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, isFollowing: boolean, favoriteArticleFolderIds: Array<string>, platform?: { __typename?: 'Platform', id: string, name: string, siteUrl: string, faviconUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> } };

export type FeedListQueryQueryVariables = Exact<{
  input: FeedsInput;
}>;


export type FeedListQueryQuery = { __typename?: 'Query', feeds: { __typename?: 'FeedConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'FeedEdge', node: { __typename?: 'Feed', id: string, myFeedIds?: Array<string> | null, name: string, description: string, siteUrl: string, thumbnailUrl: string, platform: { __typename?: 'Platform', id: string, faviconUrl: string } } }> } };

export type FeedArticleListTemplateQueryQueryVariables = Exact<{
  input: ArticlesInput;
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput;
}>;


export type FeedArticleListTemplateQueryQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename: 'Article', id: string, title: string, description: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, isFollowing: boolean, favoriteArticleFolderIds: Array<string>, platform?: { __typename?: 'Platform', id: string, name: string, siteUrl: string, faviconUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> }, favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> } };

export type GetServerFeedArticleTemplateQueryQueryVariables = Exact<{
  input: FeedInput;
}>;


export type GetServerFeedArticleTemplateQueryQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', id: string, name: string } };

export type FeedListTemplateQueryQueryVariables = Exact<{
  input: FeedsInput;
}>;


export type FeedListTemplateQueryQuery = { __typename?: 'Query', feeds: { __typename?: 'FeedConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'FeedEdge', node: { __typename?: 'Feed', id: string, myFeedIds?: Array<string> | null, name: string, description: string, siteUrl: string, thumbnailUrl: string, platform: { __typename?: 'Platform', id: string, faviconUrl: string } } }> } };

export type CreateMyFeedFolderMutationMutationVariables = Exact<{
  input: CreateMyFeedFolderInput;
}>;


export type CreateMyFeedFolderMutationMutation = { __typename?: 'Mutation', createMyFeedFolder: { __typename?: 'MyFeedFolder', id: string } };

export type MyFeedFolderListQueryQueryVariables = Exact<{
  myFeedFoldersInput: MyFeedFoldersInput;
}>;


export type MyFeedFolderListQueryQuery = { __typename?: 'Query', myFeedFolders: { __typename?: 'MyFeedFolderConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'MyFeedFolderEdge', node: { __typename?: 'MyFeedFolder', id: string } }> } };

export type MyFeedFolderListTemplateQueryQueryVariables = Exact<{
  myFeedFoldersInput: MyFeedFoldersInput;
}>;


export type MyFeedFolderListTemplateQueryQuery = { __typename?: 'Query', myFeedFolders: { __typename?: 'MyFeedFolderConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'MyFeedFolderEdge', node: { __typename?: 'MyFeedFolder', id: string } }> } };

export type OgpPreviewContentFragmentFragment = { __typename?: 'ArticleOGP', title: string, description?: string | null, thumbnailUrl: string, articleUrl: string, siteName: string, faviconUrl: string };

export type TrendArticleListQueryQueryVariables = Exact<{
  input: ArticlesInput;
}>;


export type TrendArticleListQueryQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename: 'Article', id: string, title: string, description: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, isFollowing: boolean, favoriteArticleFolderIds: Array<string>, platform?: { __typename?: 'Platform', id: string, name: string, siteUrl: string, faviconUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> } };

export type TrendArticleDashboardTemplateQueryQueryVariables = Exact<{
  input: ArticlesInput;
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput;
}>;


export type TrendArticleDashboardTemplateQueryQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename: 'Article', id: string, title: string, description: string, articleUrl: string, publishedAt?: number | null, authorName?: string | null, tags?: string | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, isFollowing: boolean, favoriteArticleFolderIds: Array<string>, platform?: { __typename?: 'Platform', id: string, name: string, siteUrl: string, faviconUrl: string } | null, feeds?: Array<{ __typename?: 'Feed', id: string, name: string }> | null } }> }, favoriteArticleFolders: { __typename?: 'FavoriteArticleFolderConnection', edges: Array<{ __typename?: 'FavoriteArticleFolderEdge', node: { __typename?: 'FavoriteArticleFolder', id: string, title: string } }> } };

export const FavoriteArticleFolderLinkFragmentFragmentDoc = gql`
    fragment FavoriteArticleFolderLinkFragment on FavoriteArticleFolder {
  id
  title
}
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
export const UseArticleManageBookmarkFragmentFragmentDoc = gql`
    fragment UseArticleManageBookmarkFragment on Article {
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
}
    `;
export const UseArticleManageFavoriteArticleFragmentFragmentDoc = gql`
    fragment UseArticleManageFavoriteArticleFragment on Article {
  __typename
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
  authorName
  tags
  thumbnailUrl
  isEng
  isPrivate
  isBookmarked
  bookmarkId
  likeCount
  isFollowing
  favoriteArticleFolderIds
}
    `;
export const ArticleCardWrapperFragmentFragmentDoc = gql`
    fragment ArticleCardWrapperFragment on Article {
  __typename
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
  authorName
  tags
  thumbnailUrl
  isEng
  isPrivate
  isBookmarked
  bookmarkId
  likeCount
  isFollowing
  favoriteArticleFolderIds
  ...ArticleCardItemFragment
  ...UseArticleManageBookmarkFragment
  ...UseArticleManageFavoriteArticleFragment
}
    ${ArticleCardItemFragmentFragmentDoc}
${UseArticleManageBookmarkFragmentFragmentDoc}
${UseArticleManageFavoriteArticleFragmentFragmentDoc}`;
export const FollowTargetFavoriteArticleFolderItemFragmentFragmentDoc = gql`
    fragment FollowTargetFavoriteArticleFolderItemFragment on FavoriteArticleFolder {
  id
  title
}
    `;
export const FollowFavoriteArticleDropdownMenuContentFragmentFragmentDoc = gql`
    fragment FollowFavoriteArticleDropdownMenuContentFragment on FavoriteArticleFolderConnection {
  edges {
    node {
      ...FollowTargetFavoriteArticleFolderItemFragment
    }
  }
}
    ${FollowTargetFavoriteArticleFolderItemFragmentFragmentDoc}`;
export const FavoriteFolderUseArticleManageFavoriteArticleFragmentFragmentDoc = gql`
    fragment FavoriteFolderUseArticleManageFavoriteArticleFragment on FavoriteArticleFolderConnection {
  edges {
    node {
      id
      title
    }
  }
}
    `;
export const FavoriteFolderArticleCardWrapperFragmentFragmentDoc = gql`
    fragment FavoriteFolderArticleCardWrapperFragment on FavoriteArticleFolderConnection {
  edges {
    node {
      id
      title
    }
  }
  ...FollowFavoriteArticleDropdownMenuContentFragment
  ...FavoriteFolderUseArticleManageFavoriteArticleFragment
}
    ${FollowFavoriteArticleDropdownMenuContentFragmentFragmentDoc}
${FavoriteFolderUseArticleManageFavoriteArticleFragmentFragmentDoc}`;
export const BookmarkCardItemFragmentFragmentDoc = gql`
    fragment BookmarkCardItemFragment on Bookmark {
  id
  title
  articleUrl
  thumbnailUrl
  createdAt
}
    `;
export const UseBookmarkMangeFavoriteArticleFragmentDoc = gql`
    fragment UseBookmarkMangeFavoriteArticle on Bookmark {
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
  isFollowing
  favoriteArticleFolderIds
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
  isFollowing
  favoriteArticleFolderIds
  ...BookmarkCardItemFragment
  ...UseBookmarkMangeFavoriteArticle
}
    ${BookmarkCardItemFragmentFragmentDoc}
${UseBookmarkMangeFavoriteArticleFragmentDoc}`;
export const FavoriteFolderUseBookmarkManageFavoriteArticleFragmentFragmentDoc = gql`
    fragment FavoriteFolderUseBookmarkManageFavoriteArticleFragment on FavoriteArticleFolderConnection {
  edges {
    node {
      id
      title
    }
  }
}
    `;
export const FavoriteFolderBookmarkCardWrapperFragmentFragmentDoc = gql`
    fragment FavoriteFolderBookmarkCardWrapperFragment on FavoriteArticleFolderConnection {
  edges {
    node {
      id
      title
    }
  }
  ...FollowFavoriteArticleDropdownMenuContentFragment
  ...FavoriteFolderUseBookmarkManageFavoriteArticleFragment
}
    ${FollowFavoriteArticleDropdownMenuContentFragmentFragmentDoc}
${FavoriteFolderUseBookmarkManageFavoriteArticleFragmentFragmentDoc}`;
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
    ${OgpPreviewContentFragmentFragmentDoc}`;
export const AllFolderFavoriteArticleCardItemFragmentFragmentDoc = gql`
    fragment AllFolderFavoriteArticleCardItemFragment on FavoriteAllFolderArticleEdge {
  node {
    id
    title
    articleUrl
    thumbnailUrl
    createdAt
  }
  favoriteArticleFolders {
    id
    title
  }
}
    `;
export const AllFolderFavoriteArticleCardWrapperFragmentFragmentDoc = gql`
    fragment AllFolderFavoriteArticleCardWrapperFragment on FavoriteAllFolderArticleEdge {
  node {
    id
    title
    articleUrl
    thumbnailUrl
    platformId
    platformUrl
    platformName
    platformFaviconUrl
  }
  ...AllFolderFavoriteArticleCardItemFragment
}
    ${AllFolderFavoriteArticleCardItemFragmentFragmentDoc}`;
export const FavoriteFolderAllFolderArticleCardWrapperFragmentFragmentDoc = gql`
    fragment FavoriteFolderAllFolderArticleCardWrapperFragment on FavoriteArticleFolderConnection {
  edges {
    node {
      id
      title
      favoriteArticles {
        id
        articleId
      }
    }
  }
}
    `;
export const FavoriteArticleCardItemFragmentFragmentDoc = gql`
    fragment FavoriteArticleCardItemFragment on FavoriteArticle {
  id
  articleId
  platformId
  favoriteArticleFolderId
  userId
  title
  description
  thumbnailUrl
  articleUrl
  publishedAt
  authorName
  tags
  platformName
  platformUrl
  platformFaviconUrl
  isEng
  isPrivate
  isRead
  createdAt
  updatedAt
}
    `;
export const UseManageFavoriteArticleFragmentDoc = gql`
    fragment UseManageFavoriteArticle on FavoriteArticle {
  id
  articleId
  platformId
  favoriteArticleFolderId
  userId
  title
  description
  thumbnailUrl
  articleUrl
  publishedAt
  authorName
  tags
  platformName
  platformUrl
  platformFaviconUrl
  isEng
  isPrivate
  isRead
  createdAt
  updatedAt
}
    `;
export const FavoriteArticleCardWrapperFragmentFragmentDoc = gql`
    fragment FavoriteArticleCardWrapperFragment on FavoriteArticle {
  id
  articleId
  platformId
  favoriteArticleFolderId
  userId
  title
  description
  thumbnailUrl
  articleUrl
  publishedAt
  authorName
  tags
  platformName
  platformUrl
  platformFaviconUrl
  isEng
  isPrivate
  isRead
  createdAt
  updatedAt
  ...FavoriteArticleCardItemFragment
  ...UseManageFavoriteArticle
}
    ${FavoriteArticleCardItemFragmentFragmentDoc}
${UseManageFavoriteArticleFragmentDoc}`;
export const CopyTargetFavoriteArticleFolderItemFragmentFragmentDoc = gql`
    fragment CopyTargetFavoriteArticleFolderItemFragment on FavoriteArticleFolder {
  id
  title
  favoriteArticles {
    id
    articleId
  }
}
    `;
export const CopyFavoriteArticleDropdownMenuContentFragmentFragmentDoc = gql`
    fragment CopyFavoriteArticleDropdownMenuContentFragment on FavoriteArticleFolderConnection {
  edges {
    node {
      id
      title
      ...CopyTargetFavoriteArticleFolderItemFragment
    }
  }
}
    ${CopyTargetFavoriteArticleFolderItemFragmentFragmentDoc}`;
export const FavoriteFolderUseManageFavoriteArticleFragmentFragmentDoc = gql`
    fragment FavoriteFolderUseManageFavoriteArticleFragment on FavoriteArticleFolderConnection {
  edges {
    node {
      id
      title
    }
  }
}
    `;
export const FavoriteFolderFavoriteArticleCardWrapperFragmentFragmentDoc = gql`
    fragment FavoriteFolderFavoriteArticleCardWrapperFragment on FavoriteArticleFolderConnection {
  edges {
    node {
      id
      title
      favoriteArticles {
        id
        articleId
      }
    }
  }
  ...CopyFavoriteArticleDropdownMenuContentFragment
  ...FavoriteFolderUseManageFavoriteArticleFragment
}
    ${CopyFavoriteArticleDropdownMenuContentFragmentFragmentDoc}
${FavoriteFolderUseManageFavoriteArticleFragmentFragmentDoc}`;
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
export const CreateFavoriteArticleDialogContentFragmentFragmentDoc = gql`
    fragment CreateFavoriteArticleDialogContentFragment on Query {
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
    ${OgpPreviewContentFragmentFragmentDoc}`;
export const FeedCardItemFragmentFragmentDoc = gql`
    fragment FeedCardItemFragment on Feed {
  id
  platform {
    id
    faviconUrl
  }
  name
  description
  siteUrl
  thumbnailUrl
}
    `;
export const FeedCardWrapperFragmentFragmentDoc = gql`
    fragment FeedCardWrapperFragment on Feed {
  id
  platform {
    id
  }
  myFeedIds
  ...FeedCardItemFragment
}
    ${FeedCardItemFragmentFragmentDoc}`;
export const GetLoggedBaseLayoutQueryDocument = gql`
    query GetLoggedBaseLayoutQuery($input: FavoriteArticleFoldersInput!) {
  favoriteArticleFolders(input: $input) {
    edges {
      node {
        ...FavoriteArticleFolderLinkFragment
      }
    }
  }
}
    ${FavoriteArticleFolderLinkFragmentFragmentDoc}`;

/**
 * __useGetLoggedBaseLayoutQueryQuery__
 *
 * To run a query within a React component, call `useGetLoggedBaseLayoutQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoggedBaseLayoutQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoggedBaseLayoutQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLoggedBaseLayoutQueryQuery(baseOptions: Apollo.QueryHookOptions<GetLoggedBaseLayoutQueryQuery, GetLoggedBaseLayoutQueryQueryVariables> & ({ variables: GetLoggedBaseLayoutQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoggedBaseLayoutQueryQuery, GetLoggedBaseLayoutQueryQueryVariables>(GetLoggedBaseLayoutQueryDocument, options);
      }
export function useGetLoggedBaseLayoutQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoggedBaseLayoutQueryQuery, GetLoggedBaseLayoutQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoggedBaseLayoutQueryQuery, GetLoggedBaseLayoutQueryQueryVariables>(GetLoggedBaseLayoutQueryDocument, options);
        }
export function useGetLoggedBaseLayoutQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLoggedBaseLayoutQueryQuery, GetLoggedBaseLayoutQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLoggedBaseLayoutQueryQuery, GetLoggedBaseLayoutQueryQueryVariables>(GetLoggedBaseLayoutQueryDocument, options);
        }
export type GetLoggedBaseLayoutQueryQueryHookResult = ReturnType<typeof useGetLoggedBaseLayoutQueryQuery>;
export type GetLoggedBaseLayoutQueryLazyQueryHookResult = ReturnType<typeof useGetLoggedBaseLayoutQueryLazyQuery>;
export type GetLoggedBaseLayoutQuerySuspenseQueryHookResult = ReturnType<typeof useGetLoggedBaseLayoutQuerySuspenseQuery>;
export type GetLoggedBaseLayoutQueryQueryResult = Apollo.QueryResult<GetLoggedBaseLayoutQueryQuery, GetLoggedBaseLayoutQueryQueryVariables>;
export const ArticleListQueryDocument = gql`
    query ArticleListQuery($input: ArticlesInput!) {
  articles(articlesInput: $input) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        ...ArticleCardWrapperFragment
      }
    }
  }
}
    ${ArticleCardWrapperFragmentFragmentDoc}`;

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
export const ArticleDashboardTemplateQueryDocument = gql`
    query ArticleDashboardTemplateQuery($input: ArticlesInput!, $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!) {
  articles(articlesInput: $input) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        ...ArticleCardWrapperFragment
      }
    }
  }
  favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
    ...FavoriteFolderArticleCardWrapperFragment
  }
}
    ${ArticleCardWrapperFragmentFragmentDoc}
${FavoriteFolderArticleCardWrapperFragmentFragmentDoc}`;

/**
 * __useArticleDashboardTemplateQueryQuery__
 *
 * To run a query within a React component, call `useArticleDashboardTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleDashboardTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleDashboardTemplateQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *      favoriteArticleFoldersInput: // value for 'favoriteArticleFoldersInput'
 *   },
 * });
 */
export function useArticleDashboardTemplateQueryQuery(baseOptions: Apollo.QueryHookOptions<ArticleDashboardTemplateQueryQuery, ArticleDashboardTemplateQueryQueryVariables> & ({ variables: ArticleDashboardTemplateQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleDashboardTemplateQueryQuery, ArticleDashboardTemplateQueryQueryVariables>(ArticleDashboardTemplateQueryDocument, options);
      }
export function useArticleDashboardTemplateQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleDashboardTemplateQueryQuery, ArticleDashboardTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleDashboardTemplateQueryQuery, ArticleDashboardTemplateQueryQueryVariables>(ArticleDashboardTemplateQueryDocument, options);
        }
export function useArticleDashboardTemplateQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ArticleDashboardTemplateQueryQuery, ArticleDashboardTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArticleDashboardTemplateQueryQuery, ArticleDashboardTemplateQueryQueryVariables>(ArticleDashboardTemplateQueryDocument, options);
        }
export type ArticleDashboardTemplateQueryQueryHookResult = ReturnType<typeof useArticleDashboardTemplateQueryQuery>;
export type ArticleDashboardTemplateQueryLazyQueryHookResult = ReturnType<typeof useArticleDashboardTemplateQueryLazyQuery>;
export type ArticleDashboardTemplateQuerySuspenseQueryHookResult = ReturnType<typeof useArticleDashboardTemplateQuerySuspenseQuery>;
export type ArticleDashboardTemplateQueryQueryResult = Apollo.QueryResult<ArticleDashboardTemplateQueryQuery, ArticleDashboardTemplateQueryQueryVariables>;
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
export const GetCreateBookmarkDialogArticleOgpQueryDocument = gql`
    query GetCreateBookmarkDialogArticleOGPQuery($url: String!) {
  ...CreateBookmarkDialogContentFragment
}
    ${CreateBookmarkDialogContentFragmentFragmentDoc}`;

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
export function useGetCreateBookmarkDialogArticleOgpQueryQuery(baseOptions: Apollo.QueryHookOptions<GetCreateBookmarkDialogArticleOgpQueryQuery, GetCreateBookmarkDialogArticleOgpQueryQueryVariables> & ({ variables: GetCreateBookmarkDialogArticleOgpQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCreateBookmarkDialogArticleOgpQueryQuery, GetCreateBookmarkDialogArticleOgpQueryQueryVariables>(GetCreateBookmarkDialogArticleOgpQueryDocument, options);
      }
export function useGetCreateBookmarkDialogArticleOgpQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCreateBookmarkDialogArticleOgpQueryQuery, GetCreateBookmarkDialogArticleOgpQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCreateBookmarkDialogArticleOgpQueryQuery, GetCreateBookmarkDialogArticleOgpQueryQueryVariables>(GetCreateBookmarkDialogArticleOgpQueryDocument, options);
        }
export function useGetCreateBookmarkDialogArticleOgpQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCreateBookmarkDialogArticleOgpQueryQuery, GetCreateBookmarkDialogArticleOgpQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCreateBookmarkDialogArticleOgpQueryQuery, GetCreateBookmarkDialogArticleOgpQueryQueryVariables>(GetCreateBookmarkDialogArticleOgpQueryDocument, options);
        }
export type GetCreateBookmarkDialogArticleOgpQueryQueryHookResult = ReturnType<typeof useGetCreateBookmarkDialogArticleOgpQueryQuery>;
export type GetCreateBookmarkDialogArticleOgpQueryLazyQueryHookResult = ReturnType<typeof useGetCreateBookmarkDialogArticleOgpQueryLazyQuery>;
export type GetCreateBookmarkDialogArticleOgpQuerySuspenseQueryHookResult = ReturnType<typeof useGetCreateBookmarkDialogArticleOgpQuerySuspenseQuery>;
export type GetCreateBookmarkDialogArticleOgpQueryQueryResult = Apollo.QueryResult<GetCreateBookmarkDialogArticleOgpQueryQuery, GetCreateBookmarkDialogArticleOgpQueryQueryVariables>;
export const BookmarkListQueryDocument = gql`
    query BookmarkListQuery($input: BookmarksInput!) {
  bookmarks(input: $input) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        ...BookmarkCardWrapperFragment
      }
    }
  }
}
    ${BookmarkCardWrapperFragmentFragmentDoc}`;

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
export const BookmarkTemplateQueryDocument = gql`
    query BookmarkTemplateQuery($input: BookmarksInput!, $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!) {
  bookmarks(input: $input) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        ...BookmarkCardWrapperFragment
      }
    }
  }
  favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
    ...FavoriteFolderBookmarkCardWrapperFragment
  }
}
    ${BookmarkCardWrapperFragmentFragmentDoc}
${FavoriteFolderBookmarkCardWrapperFragmentFragmentDoc}`;

/**
 * __useBookmarkTemplateQueryQuery__
 *
 * To run a query within a React component, call `useBookmarkTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarkTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarkTemplateQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *      favoriteArticleFoldersInput: // value for 'favoriteArticleFoldersInput'
 *   },
 * });
 */
export function useBookmarkTemplateQueryQuery(baseOptions: Apollo.QueryHookOptions<BookmarkTemplateQueryQuery, BookmarkTemplateQueryQueryVariables> & ({ variables: BookmarkTemplateQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookmarkTemplateQueryQuery, BookmarkTemplateQueryQueryVariables>(BookmarkTemplateQueryDocument, options);
      }
export function useBookmarkTemplateQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookmarkTemplateQueryQuery, BookmarkTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookmarkTemplateQueryQuery, BookmarkTemplateQueryQueryVariables>(BookmarkTemplateQueryDocument, options);
        }
export function useBookmarkTemplateQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BookmarkTemplateQueryQuery, BookmarkTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BookmarkTemplateQueryQuery, BookmarkTemplateQueryQueryVariables>(BookmarkTemplateQueryDocument, options);
        }
export type BookmarkTemplateQueryQueryHookResult = ReturnType<typeof useBookmarkTemplateQueryQuery>;
export type BookmarkTemplateQueryLazyQueryHookResult = ReturnType<typeof useBookmarkTemplateQueryLazyQuery>;
export type BookmarkTemplateQuerySuspenseQueryHookResult = ReturnType<typeof useBookmarkTemplateQuerySuspenseQuery>;
export type BookmarkTemplateQueryQueryResult = Apollo.QueryResult<BookmarkTemplateQueryQuery, BookmarkTemplateQueryQueryVariables>;
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
export const CreateFavoriteArticleForUploadArticleMutationDocument = gql`
    mutation CreateFavoriteArticleForUploadArticleMutation($input: CreateFavoriteArticleForUploadArticleInput!) {
  createFavoriteArticleForUploadArticle(input: $input) {
    id
  }
}
    `;
export type CreateFavoriteArticleForUploadArticleMutationMutationFn = Apollo.MutationFunction<CreateFavoriteArticleForUploadArticleMutationMutation, CreateFavoriteArticleForUploadArticleMutationMutationVariables>;

/**
 * __useCreateFavoriteArticleForUploadArticleMutationMutation__
 *
 * To run a mutation, you first call `useCreateFavoriteArticleForUploadArticleMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFavoriteArticleForUploadArticleMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFavoriteArticleForUploadArticleMutationMutation, { data, loading, error }] = useCreateFavoriteArticleForUploadArticleMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFavoriteArticleForUploadArticleMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateFavoriteArticleForUploadArticleMutationMutation, CreateFavoriteArticleForUploadArticleMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFavoriteArticleForUploadArticleMutationMutation, CreateFavoriteArticleForUploadArticleMutationMutationVariables>(CreateFavoriteArticleForUploadArticleMutationDocument, options);
      }
export type CreateFavoriteArticleForUploadArticleMutationMutationHookResult = ReturnType<typeof useCreateFavoriteArticleForUploadArticleMutationMutation>;
export type CreateFavoriteArticleForUploadArticleMutationMutationResult = Apollo.MutationResult<CreateFavoriteArticleForUploadArticleMutationMutation>;
export type CreateFavoriteArticleForUploadArticleMutationMutationOptions = Apollo.BaseMutationOptions<CreateFavoriteArticleForUploadArticleMutationMutation, CreateFavoriteArticleForUploadArticleMutationMutationVariables>;
export const GetCreateFavoriteArticleDialogOgpQueryDocument = gql`
    query GetCreateFavoriteArticleDialogOGPQuery($url: String!) {
  ...CreateFavoriteArticleDialogContentFragment
}
    ${CreateFavoriteArticleDialogContentFragmentFragmentDoc}`;

/**
 * __useGetCreateFavoriteArticleDialogOgpQueryQuery__
 *
 * To run a query within a React component, call `useGetCreateFavoriteArticleDialogOgpQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreateFavoriteArticleDialogOgpQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreateFavoriteArticleDialogOgpQueryQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetCreateFavoriteArticleDialogOgpQueryQuery(baseOptions: Apollo.QueryHookOptions<GetCreateFavoriteArticleDialogOgpQueryQuery, GetCreateFavoriteArticleDialogOgpQueryQueryVariables> & ({ variables: GetCreateFavoriteArticleDialogOgpQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCreateFavoriteArticleDialogOgpQueryQuery, GetCreateFavoriteArticleDialogOgpQueryQueryVariables>(GetCreateFavoriteArticleDialogOgpQueryDocument, options);
      }
export function useGetCreateFavoriteArticleDialogOgpQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCreateFavoriteArticleDialogOgpQueryQuery, GetCreateFavoriteArticleDialogOgpQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCreateFavoriteArticleDialogOgpQueryQuery, GetCreateFavoriteArticleDialogOgpQueryQueryVariables>(GetCreateFavoriteArticleDialogOgpQueryDocument, options);
        }
export function useGetCreateFavoriteArticleDialogOgpQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCreateFavoriteArticleDialogOgpQueryQuery, GetCreateFavoriteArticleDialogOgpQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCreateFavoriteArticleDialogOgpQueryQuery, GetCreateFavoriteArticleDialogOgpQueryQueryVariables>(GetCreateFavoriteArticleDialogOgpQueryDocument, options);
        }
export type GetCreateFavoriteArticleDialogOgpQueryQueryHookResult = ReturnType<typeof useGetCreateFavoriteArticleDialogOgpQueryQuery>;
export type GetCreateFavoriteArticleDialogOgpQueryLazyQueryHookResult = ReturnType<typeof useGetCreateFavoriteArticleDialogOgpQueryLazyQuery>;
export type GetCreateFavoriteArticleDialogOgpQuerySuspenseQueryHookResult = ReturnType<typeof useGetCreateFavoriteArticleDialogOgpQuerySuspenseQuery>;
export type GetCreateFavoriteArticleDialogOgpQueryQueryResult = Apollo.QueryResult<GetCreateFavoriteArticleDialogOgpQueryQuery, GetCreateFavoriteArticleDialogOgpQueryQueryVariables>;
export const AllFolderFavoriteArticleListQueryDocument = gql`
    query AllFolderFavoriteArticleListQuery($input: FavoriteAllFolderArticlesInput!) {
  favoriteAllFolderArticles(input: $input) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
      }
      ...AllFolderFavoriteArticleCardWrapperFragment
    }
  }
}
    ${AllFolderFavoriteArticleCardWrapperFragmentFragmentDoc}`;

/**
 * __useAllFolderFavoriteArticleListQueryQuery__
 *
 * To run a query within a React component, call `useAllFolderFavoriteArticleListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllFolderFavoriteArticleListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllFolderFavoriteArticleListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAllFolderFavoriteArticleListQueryQuery(baseOptions: Apollo.QueryHookOptions<AllFolderFavoriteArticleListQueryQuery, AllFolderFavoriteArticleListQueryQueryVariables> & ({ variables: AllFolderFavoriteArticleListQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllFolderFavoriteArticleListQueryQuery, AllFolderFavoriteArticleListQueryQueryVariables>(AllFolderFavoriteArticleListQueryDocument, options);
      }
export function useAllFolderFavoriteArticleListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllFolderFavoriteArticleListQueryQuery, AllFolderFavoriteArticleListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllFolderFavoriteArticleListQueryQuery, AllFolderFavoriteArticleListQueryQueryVariables>(AllFolderFavoriteArticleListQueryDocument, options);
        }
export function useAllFolderFavoriteArticleListQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllFolderFavoriteArticleListQueryQuery, AllFolderFavoriteArticleListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllFolderFavoriteArticleListQueryQuery, AllFolderFavoriteArticleListQueryQueryVariables>(AllFolderFavoriteArticleListQueryDocument, options);
        }
export type AllFolderFavoriteArticleListQueryQueryHookResult = ReturnType<typeof useAllFolderFavoriteArticleListQueryQuery>;
export type AllFolderFavoriteArticleListQueryLazyQueryHookResult = ReturnType<typeof useAllFolderFavoriteArticleListQueryLazyQuery>;
export type AllFolderFavoriteArticleListQuerySuspenseQueryHookResult = ReturnType<typeof useAllFolderFavoriteArticleListQuerySuspenseQuery>;
export type AllFolderFavoriteArticleListQueryQueryResult = Apollo.QueryResult<AllFolderFavoriteArticleListQueryQuery, AllFolderFavoriteArticleListQueryQueryVariables>;
export const FavoriteArticleFolderListQueryDocument = gql`
    query FavoriteArticleFolderListQuery($input: FavoriteArticleFoldersInput!) {
  favoriteArticleFolders(input: $input) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        ...FavoriteArticleFolderCardFragment
      }
    }
  }
}
    ${FavoriteArticleFolderCardFragmentFragmentDoc}`;

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
export const FavoriteArticleListQueryDocument = gql`
    query FavoriteArticleListQuery($input: FavoriteArticlesInput!) {
  favoriteArticles(input: $input) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        ...FavoriteArticleCardWrapperFragment
      }
    }
  }
}
    ${FavoriteArticleCardWrapperFragmentFragmentDoc}`;

/**
 * __useFavoriteArticleListQueryQuery__
 *
 * To run a query within a React component, call `useFavoriteArticleListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoriteArticleListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoriteArticleListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFavoriteArticleListQueryQuery(baseOptions: Apollo.QueryHookOptions<FavoriteArticleListQueryQuery, FavoriteArticleListQueryQueryVariables> & ({ variables: FavoriteArticleListQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavoriteArticleListQueryQuery, FavoriteArticleListQueryQueryVariables>(FavoriteArticleListQueryDocument, options);
      }
export function useFavoriteArticleListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavoriteArticleListQueryQuery, FavoriteArticleListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavoriteArticleListQueryQuery, FavoriteArticleListQueryQueryVariables>(FavoriteArticleListQueryDocument, options);
        }
export function useFavoriteArticleListQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FavoriteArticleListQueryQuery, FavoriteArticleListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FavoriteArticleListQueryQuery, FavoriteArticleListQueryQueryVariables>(FavoriteArticleListQueryDocument, options);
        }
export type FavoriteArticleListQueryQueryHookResult = ReturnType<typeof useFavoriteArticleListQueryQuery>;
export type FavoriteArticleListQueryLazyQueryHookResult = ReturnType<typeof useFavoriteArticleListQueryLazyQuery>;
export type FavoriteArticleListQuerySuspenseQueryHookResult = ReturnType<typeof useFavoriteArticleListQuerySuspenseQuery>;
export type FavoriteArticleListQueryQueryResult = Apollo.QueryResult<FavoriteArticleListQueryQuery, FavoriteArticleListQueryQueryVariables>;
export const AllFolderFavoriteArticleListTemplateQueryDocument = gql`
    query AllFolderFavoriteArticleListTemplateQuery($favoriteAllFolderArticlesInput: FavoriteAllFolderArticlesInput!, $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!) {
  favoriteAllFolderArticles(input: $favoriteAllFolderArticlesInput) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
      }
      ...AllFolderFavoriteArticleCardWrapperFragment
    }
  }
  favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
    ...FavoriteFolderAllFolderArticleCardWrapperFragment
  }
}
    ${AllFolderFavoriteArticleCardWrapperFragmentFragmentDoc}
${FavoriteFolderAllFolderArticleCardWrapperFragmentFragmentDoc}`;

/**
 * __useAllFolderFavoriteArticleListTemplateQueryQuery__
 *
 * To run a query within a React component, call `useAllFolderFavoriteArticleListTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllFolderFavoriteArticleListTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllFolderFavoriteArticleListTemplateQueryQuery({
 *   variables: {
 *      favoriteAllFolderArticlesInput: // value for 'favoriteAllFolderArticlesInput'
 *      favoriteArticleFoldersInput: // value for 'favoriteArticleFoldersInput'
 *   },
 * });
 */
export function useAllFolderFavoriteArticleListTemplateQueryQuery(baseOptions: Apollo.QueryHookOptions<AllFolderFavoriteArticleListTemplateQueryQuery, AllFolderFavoriteArticleListTemplateQueryQueryVariables> & ({ variables: AllFolderFavoriteArticleListTemplateQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllFolderFavoriteArticleListTemplateQueryQuery, AllFolderFavoriteArticleListTemplateQueryQueryVariables>(AllFolderFavoriteArticleListTemplateQueryDocument, options);
      }
export function useAllFolderFavoriteArticleListTemplateQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllFolderFavoriteArticleListTemplateQueryQuery, AllFolderFavoriteArticleListTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllFolderFavoriteArticleListTemplateQueryQuery, AllFolderFavoriteArticleListTemplateQueryQueryVariables>(AllFolderFavoriteArticleListTemplateQueryDocument, options);
        }
export function useAllFolderFavoriteArticleListTemplateQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllFolderFavoriteArticleListTemplateQueryQuery, AllFolderFavoriteArticleListTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllFolderFavoriteArticleListTemplateQueryQuery, AllFolderFavoriteArticleListTemplateQueryQueryVariables>(AllFolderFavoriteArticleListTemplateQueryDocument, options);
        }
export type AllFolderFavoriteArticleListTemplateQueryQueryHookResult = ReturnType<typeof useAllFolderFavoriteArticleListTemplateQueryQuery>;
export type AllFolderFavoriteArticleListTemplateQueryLazyQueryHookResult = ReturnType<typeof useAllFolderFavoriteArticleListTemplateQueryLazyQuery>;
export type AllFolderFavoriteArticleListTemplateQuerySuspenseQueryHookResult = ReturnType<typeof useAllFolderFavoriteArticleListTemplateQuerySuspenseQuery>;
export type AllFolderFavoriteArticleListTemplateQueryQueryResult = Apollo.QueryResult<AllFolderFavoriteArticleListTemplateQueryQuery, AllFolderFavoriteArticleListTemplateQueryQueryVariables>;
export const FavoriteArticleFolderListTemplateQueryDocument = gql`
    query FavoriteArticleFolderListTemplateQuery($input: FavoriteArticleFoldersInput!) {
  favoriteArticleFolders(input: $input) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        ...FavoriteArticleFolderCardFragment
      }
    }
  }
}
    ${FavoriteArticleFolderCardFragmentFragmentDoc}`;

/**
 * __useFavoriteArticleFolderListTemplateQueryQuery__
 *
 * To run a query within a React component, call `useFavoriteArticleFolderListTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoriteArticleFolderListTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoriteArticleFolderListTemplateQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFavoriteArticleFolderListTemplateQueryQuery(baseOptions: Apollo.QueryHookOptions<FavoriteArticleFolderListTemplateQueryQuery, FavoriteArticleFolderListTemplateQueryQueryVariables> & ({ variables: FavoriteArticleFolderListTemplateQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavoriteArticleFolderListTemplateQueryQuery, FavoriteArticleFolderListTemplateQueryQueryVariables>(FavoriteArticleFolderListTemplateQueryDocument, options);
      }
export function useFavoriteArticleFolderListTemplateQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavoriteArticleFolderListTemplateQueryQuery, FavoriteArticleFolderListTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavoriteArticleFolderListTemplateQueryQuery, FavoriteArticleFolderListTemplateQueryQueryVariables>(FavoriteArticleFolderListTemplateQueryDocument, options);
        }
export function useFavoriteArticleFolderListTemplateQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FavoriteArticleFolderListTemplateQueryQuery, FavoriteArticleFolderListTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FavoriteArticleFolderListTemplateQueryQuery, FavoriteArticleFolderListTemplateQueryQueryVariables>(FavoriteArticleFolderListTemplateQueryDocument, options);
        }
export type FavoriteArticleFolderListTemplateQueryQueryHookResult = ReturnType<typeof useFavoriteArticleFolderListTemplateQueryQuery>;
export type FavoriteArticleFolderListTemplateQueryLazyQueryHookResult = ReturnType<typeof useFavoriteArticleFolderListTemplateQueryLazyQuery>;
export type FavoriteArticleFolderListTemplateQuerySuspenseQueryHookResult = ReturnType<typeof useFavoriteArticleFolderListTemplateQuerySuspenseQuery>;
export type FavoriteArticleFolderListTemplateQueryQueryResult = Apollo.QueryResult<FavoriteArticleFolderListTemplateQueryQuery, FavoriteArticleFolderListTemplateQueryQueryVariables>;
export const FavoriteArticleListByFolderIdTemplateQueryDocument = gql`
    query FavoriteArticleListByFolderIdTemplateQuery($input: FavoriteArticlesInput!, $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!) {
  favoriteArticles(input: $input) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        ...FavoriteArticleCardWrapperFragment
      }
    }
  }
  favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
    ...FavoriteFolderFavoriteArticleCardWrapperFragment
  }
}
    ${FavoriteArticleCardWrapperFragmentFragmentDoc}
${FavoriteFolderFavoriteArticleCardWrapperFragmentFragmentDoc}`;

/**
 * __useFavoriteArticleListByFolderIdTemplateQueryQuery__
 *
 * To run a query within a React component, call `useFavoriteArticleListByFolderIdTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoriteArticleListByFolderIdTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoriteArticleListByFolderIdTemplateQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *      favoriteArticleFoldersInput: // value for 'favoriteArticleFoldersInput'
 *   },
 * });
 */
export function useFavoriteArticleListByFolderIdTemplateQueryQuery(baseOptions: Apollo.QueryHookOptions<FavoriteArticleListByFolderIdTemplateQueryQuery, FavoriteArticleListByFolderIdTemplateQueryQueryVariables> & ({ variables: FavoriteArticleListByFolderIdTemplateQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavoriteArticleListByFolderIdTemplateQueryQuery, FavoriteArticleListByFolderIdTemplateQueryQueryVariables>(FavoriteArticleListByFolderIdTemplateQueryDocument, options);
      }
export function useFavoriteArticleListByFolderIdTemplateQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavoriteArticleListByFolderIdTemplateQueryQuery, FavoriteArticleListByFolderIdTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavoriteArticleListByFolderIdTemplateQueryQuery, FavoriteArticleListByFolderIdTemplateQueryQueryVariables>(FavoriteArticleListByFolderIdTemplateQueryDocument, options);
        }
export function useFavoriteArticleListByFolderIdTemplateQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FavoriteArticleListByFolderIdTemplateQueryQuery, FavoriteArticleListByFolderIdTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FavoriteArticleListByFolderIdTemplateQueryQuery, FavoriteArticleListByFolderIdTemplateQueryQueryVariables>(FavoriteArticleListByFolderIdTemplateQueryDocument, options);
        }
export type FavoriteArticleListByFolderIdTemplateQueryQueryHookResult = ReturnType<typeof useFavoriteArticleListByFolderIdTemplateQueryQuery>;
export type FavoriteArticleListByFolderIdTemplateQueryLazyQueryHookResult = ReturnType<typeof useFavoriteArticleListByFolderIdTemplateQueryLazyQuery>;
export type FavoriteArticleListByFolderIdTemplateQuerySuspenseQueryHookResult = ReturnType<typeof useFavoriteArticleListByFolderIdTemplateQuerySuspenseQuery>;
export type FavoriteArticleListByFolderIdTemplateQueryQueryResult = Apollo.QueryResult<FavoriteArticleListByFolderIdTemplateQueryQuery, FavoriteArticleListByFolderIdTemplateQueryQueryVariables>;
export const GetServerFavoriteArticleListByFolderIdTemplateDocument = gql`
    query GetServerFavoriteArticleListByFolderIdTemplate($favoriteArticleFolderInput: FavoriteArticleFolderInput!) {
  favoriteArticleFolder(input: $favoriteArticleFolderInput) {
    id
    title
  }
}
    `;

/**
 * __useGetServerFavoriteArticleListByFolderIdTemplateQuery__
 *
 * To run a query within a React component, call `useGetServerFavoriteArticleListByFolderIdTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServerFavoriteArticleListByFolderIdTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServerFavoriteArticleListByFolderIdTemplateQuery({
 *   variables: {
 *      favoriteArticleFolderInput: // value for 'favoriteArticleFolderInput'
 *   },
 * });
 */
export function useGetServerFavoriteArticleListByFolderIdTemplateQuery(baseOptions: Apollo.QueryHookOptions<GetServerFavoriteArticleListByFolderIdTemplateQuery, GetServerFavoriteArticleListByFolderIdTemplateQueryVariables> & ({ variables: GetServerFavoriteArticleListByFolderIdTemplateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServerFavoriteArticleListByFolderIdTemplateQuery, GetServerFavoriteArticleListByFolderIdTemplateQueryVariables>(GetServerFavoriteArticleListByFolderIdTemplateDocument, options);
      }
export function useGetServerFavoriteArticleListByFolderIdTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServerFavoriteArticleListByFolderIdTemplateQuery, GetServerFavoriteArticleListByFolderIdTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServerFavoriteArticleListByFolderIdTemplateQuery, GetServerFavoriteArticleListByFolderIdTemplateQueryVariables>(GetServerFavoriteArticleListByFolderIdTemplateDocument, options);
        }
export function useGetServerFavoriteArticleListByFolderIdTemplateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServerFavoriteArticleListByFolderIdTemplateQuery, GetServerFavoriteArticleListByFolderIdTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServerFavoriteArticleListByFolderIdTemplateQuery, GetServerFavoriteArticleListByFolderIdTemplateQueryVariables>(GetServerFavoriteArticleListByFolderIdTemplateDocument, options);
        }
export type GetServerFavoriteArticleListByFolderIdTemplateQueryHookResult = ReturnType<typeof useGetServerFavoriteArticleListByFolderIdTemplateQuery>;
export type GetServerFavoriteArticleListByFolderIdTemplateLazyQueryHookResult = ReturnType<typeof useGetServerFavoriteArticleListByFolderIdTemplateLazyQuery>;
export type GetServerFavoriteArticleListByFolderIdTemplateSuspenseQueryHookResult = ReturnType<typeof useGetServerFavoriteArticleListByFolderIdTemplateSuspenseQuery>;
export type GetServerFavoriteArticleListByFolderIdTemplateQueryResult = Apollo.QueryResult<GetServerFavoriteArticleListByFolderIdTemplateQuery, GetServerFavoriteArticleListByFolderIdTemplateQueryVariables>;
export const CreateFavoriteArticleFolderMutationDocument = gql`
    mutation CreateFavoriteArticleFolderMutation($input: CreateFavoriteArticleFolderInput!) {
  createFavoriteArticleFolder(input: $input) {
    id
    title
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
export const CreateFavoriteArticleMutationDocument = gql`
    mutation CreateFavoriteArticleMutation($input: CreateFavoriteArticleInput!) {
  createFavoriteArticle(input: $input) {
    id
    favoriteArticleFolderId
  }
}
    `;
export type CreateFavoriteArticleMutationMutationFn = Apollo.MutationFunction<CreateFavoriteArticleMutationMutation, CreateFavoriteArticleMutationMutationVariables>;

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
export function useCreateFavoriteArticleMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateFavoriteArticleMutationMutation, CreateFavoriteArticleMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFavoriteArticleMutationMutation, CreateFavoriteArticleMutationMutationVariables>(CreateFavoriteArticleMutationDocument, options);
      }
export type CreateFavoriteArticleMutationMutationHookResult = ReturnType<typeof useCreateFavoriteArticleMutationMutation>;
export type CreateFavoriteArticleMutationMutationResult = Apollo.MutationResult<CreateFavoriteArticleMutationMutation>;
export type CreateFavoriteArticleMutationMutationOptions = Apollo.BaseMutationOptions<CreateFavoriteArticleMutationMutation, CreateFavoriteArticleMutationMutationVariables>;
export const DeleteFavoriteArticleByArticleIdMutationDocument = gql`
    mutation DeleteFavoriteArticleByArticleIdMutation($input: DeleteFavoriteArticleByArticleIdInput!) {
  deleteFavoriteArticleByArticleId(input: $input)
}
    `;
export type DeleteFavoriteArticleByArticleIdMutationMutationFn = Apollo.MutationFunction<DeleteFavoriteArticleByArticleIdMutationMutation, DeleteFavoriteArticleByArticleIdMutationMutationVariables>;

/**
 * __useDeleteFavoriteArticleByArticleIdMutationMutation__
 *
 * To run a mutation, you first call `useDeleteFavoriteArticleByArticleIdMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFavoriteArticleByArticleIdMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFavoriteArticleByArticleIdMutationMutation, { data, loading, error }] = useDeleteFavoriteArticleByArticleIdMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteFavoriteArticleByArticleIdMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFavoriteArticleByArticleIdMutationMutation, DeleteFavoriteArticleByArticleIdMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFavoriteArticleByArticleIdMutationMutation, DeleteFavoriteArticleByArticleIdMutationMutationVariables>(DeleteFavoriteArticleByArticleIdMutationDocument, options);
      }
export type DeleteFavoriteArticleByArticleIdMutationMutationHookResult = ReturnType<typeof useDeleteFavoriteArticleByArticleIdMutationMutation>;
export type DeleteFavoriteArticleByArticleIdMutationMutationResult = Apollo.MutationResult<DeleteFavoriteArticleByArticleIdMutationMutation>;
export type DeleteFavoriteArticleByArticleIdMutationMutationOptions = Apollo.BaseMutationOptions<DeleteFavoriteArticleByArticleIdMutationMutation, DeleteFavoriteArticleByArticleIdMutationMutationVariables>;
export const DeleteFavoriteArticleFolderMutationDocument = gql`
    mutation DeleteFavoriteArticleFolderMutation($input: DeleteFavoriteArticleFolderInput!) {
  deleteFavoriteArticleFolder(input: $input)
}
    `;
export type DeleteFavoriteArticleFolderMutationMutationFn = Apollo.MutationFunction<DeleteFavoriteArticleFolderMutationMutation, DeleteFavoriteArticleFolderMutationMutationVariables>;

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
export function useDeleteFavoriteArticleFolderMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFavoriteArticleFolderMutationMutation, DeleteFavoriteArticleFolderMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFavoriteArticleFolderMutationMutation, DeleteFavoriteArticleFolderMutationMutationVariables>(DeleteFavoriteArticleFolderMutationDocument, options);
      }
export type DeleteFavoriteArticleFolderMutationMutationHookResult = ReturnType<typeof useDeleteFavoriteArticleFolderMutationMutation>;
export type DeleteFavoriteArticleFolderMutationMutationResult = Apollo.MutationResult<DeleteFavoriteArticleFolderMutationMutation>;
export type DeleteFavoriteArticleFolderMutationMutationOptions = Apollo.BaseMutationOptions<DeleteFavoriteArticleFolderMutationMutation, DeleteFavoriteArticleFolderMutationMutationVariables>;
export const UpdateFavoriteArticleFolderMutationDocument = gql`
    mutation UpdateFavoriteArticleFolderMutation($input: UpdateFavoriteArticleFolderInput!) {
  updateFavoriteArticleFolder(input: $input) {
    id
  }
}
    `;
export type UpdateFavoriteArticleFolderMutationMutationFn = Apollo.MutationFunction<UpdateFavoriteArticleFolderMutationMutation, UpdateFavoriteArticleFolderMutationMutationVariables>;

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
export function useUpdateFavoriteArticleFolderMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFavoriteArticleFolderMutationMutation, UpdateFavoriteArticleFolderMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFavoriteArticleFolderMutationMutation, UpdateFavoriteArticleFolderMutationMutationVariables>(UpdateFavoriteArticleFolderMutationDocument, options);
      }
export type UpdateFavoriteArticleFolderMutationMutationHookResult = ReturnType<typeof useUpdateFavoriteArticleFolderMutationMutation>;
export type UpdateFavoriteArticleFolderMutationMutationResult = Apollo.MutationResult<UpdateFavoriteArticleFolderMutationMutation>;
export type UpdateFavoriteArticleFolderMutationMutationOptions = Apollo.BaseMutationOptions<UpdateFavoriteArticleFolderMutationMutation, UpdateFavoriteArticleFolderMutationMutationVariables>;
export const FeedArticleListQueryDocument = gql`
    query FeedArticleListQuery($input: ArticlesInput!) {
  articles(articlesInput: $input) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        ...ArticleCardWrapperFragment
      }
    }
  }
}
    ${ArticleCardWrapperFragmentFragmentDoc}`;

/**
 * __useFeedArticleListQueryQuery__
 *
 * To run a query within a React component, call `useFeedArticleListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedArticleListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedArticleListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFeedArticleListQueryQuery(baseOptions: Apollo.QueryHookOptions<FeedArticleListQueryQuery, FeedArticleListQueryQueryVariables> & ({ variables: FeedArticleListQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedArticleListQueryQuery, FeedArticleListQueryQueryVariables>(FeedArticleListQueryDocument, options);
      }
export function useFeedArticleListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedArticleListQueryQuery, FeedArticleListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedArticleListQueryQuery, FeedArticleListQueryQueryVariables>(FeedArticleListQueryDocument, options);
        }
export function useFeedArticleListQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FeedArticleListQueryQuery, FeedArticleListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FeedArticleListQueryQuery, FeedArticleListQueryQueryVariables>(FeedArticleListQueryDocument, options);
        }
export type FeedArticleListQueryQueryHookResult = ReturnType<typeof useFeedArticleListQueryQuery>;
export type FeedArticleListQueryLazyQueryHookResult = ReturnType<typeof useFeedArticleListQueryLazyQuery>;
export type FeedArticleListQuerySuspenseQueryHookResult = ReturnType<typeof useFeedArticleListQuerySuspenseQuery>;
export type FeedArticleListQueryQueryResult = Apollo.QueryResult<FeedArticleListQueryQuery, FeedArticleListQueryQueryVariables>;
export const FeedListQueryDocument = gql`
    query FeedListQuery($input: FeedsInput!) {
  feeds(feedsInput: $input) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        ...FeedCardWrapperFragment
      }
    }
  }
}
    ${FeedCardWrapperFragmentFragmentDoc}`;

/**
 * __useFeedListQueryQuery__
 *
 * To run a query within a React component, call `useFeedListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedListQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFeedListQueryQuery(baseOptions: Apollo.QueryHookOptions<FeedListQueryQuery, FeedListQueryQueryVariables> & ({ variables: FeedListQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedListQueryQuery, FeedListQueryQueryVariables>(FeedListQueryDocument, options);
      }
export function useFeedListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedListQueryQuery, FeedListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedListQueryQuery, FeedListQueryQueryVariables>(FeedListQueryDocument, options);
        }
export function useFeedListQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FeedListQueryQuery, FeedListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FeedListQueryQuery, FeedListQueryQueryVariables>(FeedListQueryDocument, options);
        }
export type FeedListQueryQueryHookResult = ReturnType<typeof useFeedListQueryQuery>;
export type FeedListQueryLazyQueryHookResult = ReturnType<typeof useFeedListQueryLazyQuery>;
export type FeedListQuerySuspenseQueryHookResult = ReturnType<typeof useFeedListQuerySuspenseQuery>;
export type FeedListQueryQueryResult = Apollo.QueryResult<FeedListQueryQuery, FeedListQueryQueryVariables>;
export const FeedArticleListTemplateQueryDocument = gql`
    query FeedArticleListTemplateQuery($input: ArticlesInput!, $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!) {
  articles(articlesInput: $input) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        ...ArticleCardWrapperFragment
      }
    }
  }
  favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
    ...FavoriteFolderArticleCardWrapperFragment
  }
}
    ${ArticleCardWrapperFragmentFragmentDoc}
${FavoriteFolderArticleCardWrapperFragmentFragmentDoc}`;

/**
 * __useFeedArticleListTemplateQueryQuery__
 *
 * To run a query within a React component, call `useFeedArticleListTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedArticleListTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedArticleListTemplateQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *      favoriteArticleFoldersInput: // value for 'favoriteArticleFoldersInput'
 *   },
 * });
 */
export function useFeedArticleListTemplateQueryQuery(baseOptions: Apollo.QueryHookOptions<FeedArticleListTemplateQueryQuery, FeedArticleListTemplateQueryQueryVariables> & ({ variables: FeedArticleListTemplateQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedArticleListTemplateQueryQuery, FeedArticleListTemplateQueryQueryVariables>(FeedArticleListTemplateQueryDocument, options);
      }
export function useFeedArticleListTemplateQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedArticleListTemplateQueryQuery, FeedArticleListTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedArticleListTemplateQueryQuery, FeedArticleListTemplateQueryQueryVariables>(FeedArticleListTemplateQueryDocument, options);
        }
export function useFeedArticleListTemplateQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FeedArticleListTemplateQueryQuery, FeedArticleListTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FeedArticleListTemplateQueryQuery, FeedArticleListTemplateQueryQueryVariables>(FeedArticleListTemplateQueryDocument, options);
        }
export type FeedArticleListTemplateQueryQueryHookResult = ReturnType<typeof useFeedArticleListTemplateQueryQuery>;
export type FeedArticleListTemplateQueryLazyQueryHookResult = ReturnType<typeof useFeedArticleListTemplateQueryLazyQuery>;
export type FeedArticleListTemplateQuerySuspenseQueryHookResult = ReturnType<typeof useFeedArticleListTemplateQuerySuspenseQuery>;
export type FeedArticleListTemplateQueryQueryResult = Apollo.QueryResult<FeedArticleListTemplateQueryQuery, FeedArticleListTemplateQueryQueryVariables>;
export const GetServerFeedArticleTemplateQueryDocument = gql`
    query GetServerFeedArticleTemplateQuery($input: FeedInput!) {
  feed(feedInput: $input) {
    id
    name
  }
}
    `;

/**
 * __useGetServerFeedArticleTemplateQueryQuery__
 *
 * To run a query within a React component, call `useGetServerFeedArticleTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServerFeedArticleTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServerFeedArticleTemplateQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetServerFeedArticleTemplateQueryQuery(baseOptions: Apollo.QueryHookOptions<GetServerFeedArticleTemplateQueryQuery, GetServerFeedArticleTemplateQueryQueryVariables> & ({ variables: GetServerFeedArticleTemplateQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServerFeedArticleTemplateQueryQuery, GetServerFeedArticleTemplateQueryQueryVariables>(GetServerFeedArticleTemplateQueryDocument, options);
      }
export function useGetServerFeedArticleTemplateQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServerFeedArticleTemplateQueryQuery, GetServerFeedArticleTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServerFeedArticleTemplateQueryQuery, GetServerFeedArticleTemplateQueryQueryVariables>(GetServerFeedArticleTemplateQueryDocument, options);
        }
export function useGetServerFeedArticleTemplateQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServerFeedArticleTemplateQueryQuery, GetServerFeedArticleTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServerFeedArticleTemplateQueryQuery, GetServerFeedArticleTemplateQueryQueryVariables>(GetServerFeedArticleTemplateQueryDocument, options);
        }
export type GetServerFeedArticleTemplateQueryQueryHookResult = ReturnType<typeof useGetServerFeedArticleTemplateQueryQuery>;
export type GetServerFeedArticleTemplateQueryLazyQueryHookResult = ReturnType<typeof useGetServerFeedArticleTemplateQueryLazyQuery>;
export type GetServerFeedArticleTemplateQuerySuspenseQueryHookResult = ReturnType<typeof useGetServerFeedArticleTemplateQuerySuspenseQuery>;
export type GetServerFeedArticleTemplateQueryQueryResult = Apollo.QueryResult<GetServerFeedArticleTemplateQueryQuery, GetServerFeedArticleTemplateQueryQueryVariables>;
export const FeedListTemplateQueryDocument = gql`
    query FeedListTemplateQuery($input: FeedsInput!) {
  feeds(feedsInput: $input) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        ...FeedCardWrapperFragment
      }
    }
  }
}
    ${FeedCardWrapperFragmentFragmentDoc}`;

/**
 * __useFeedListTemplateQueryQuery__
 *
 * To run a query within a React component, call `useFeedListTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedListTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedListTemplateQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFeedListTemplateQueryQuery(baseOptions: Apollo.QueryHookOptions<FeedListTemplateQueryQuery, FeedListTemplateQueryQueryVariables> & ({ variables: FeedListTemplateQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedListTemplateQueryQuery, FeedListTemplateQueryQueryVariables>(FeedListTemplateQueryDocument, options);
      }
export function useFeedListTemplateQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedListTemplateQueryQuery, FeedListTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedListTemplateQueryQuery, FeedListTemplateQueryQueryVariables>(FeedListTemplateQueryDocument, options);
        }
export function useFeedListTemplateQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FeedListTemplateQueryQuery, FeedListTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FeedListTemplateQueryQuery, FeedListTemplateQueryQueryVariables>(FeedListTemplateQueryDocument, options);
        }
export type FeedListTemplateQueryQueryHookResult = ReturnType<typeof useFeedListTemplateQueryQuery>;
export type FeedListTemplateQueryLazyQueryHookResult = ReturnType<typeof useFeedListTemplateQueryLazyQuery>;
export type FeedListTemplateQuerySuspenseQueryHookResult = ReturnType<typeof useFeedListTemplateQuerySuspenseQuery>;
export type FeedListTemplateQueryQueryResult = Apollo.QueryResult<FeedListTemplateQueryQuery, FeedListTemplateQueryQueryVariables>;
export const CreateMyFeedFolderMutationDocument = gql`
    mutation CreateMyFeedFolderMutation($input: CreateMyFeedFolderInput!) {
  createMyFeedFolder(createMyFeedFolderInput: $input) {
    id
  }
}
    `;
export type CreateMyFeedFolderMutationMutationFn = Apollo.MutationFunction<CreateMyFeedFolderMutationMutation, CreateMyFeedFolderMutationMutationVariables>;

/**
 * __useCreateMyFeedFolderMutationMutation__
 *
 * To run a mutation, you first call `useCreateMyFeedFolderMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMyFeedFolderMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMyFeedFolderMutationMutation, { data, loading, error }] = useCreateMyFeedFolderMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMyFeedFolderMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateMyFeedFolderMutationMutation, CreateMyFeedFolderMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMyFeedFolderMutationMutation, CreateMyFeedFolderMutationMutationVariables>(CreateMyFeedFolderMutationDocument, options);
      }
export type CreateMyFeedFolderMutationMutationHookResult = ReturnType<typeof useCreateMyFeedFolderMutationMutation>;
export type CreateMyFeedFolderMutationMutationResult = Apollo.MutationResult<CreateMyFeedFolderMutationMutation>;
export type CreateMyFeedFolderMutationMutationOptions = Apollo.BaseMutationOptions<CreateMyFeedFolderMutationMutation, CreateMyFeedFolderMutationMutationVariables>;
export const MyFeedFolderListQueryDocument = gql`
    query MyFeedFolderListQuery($myFeedFoldersInput: MyFeedFoldersInput!) {
  myFeedFolders(myFeedFoldersInput: $myFeedFoldersInput) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
      }
    }
  }
}
    `;

/**
 * __useMyFeedFolderListQueryQuery__
 *
 * To run a query within a React component, call `useMyFeedFolderListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFeedFolderListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFeedFolderListQueryQuery({
 *   variables: {
 *      myFeedFoldersInput: // value for 'myFeedFoldersInput'
 *   },
 * });
 */
export function useMyFeedFolderListQueryQuery(baseOptions: Apollo.QueryHookOptions<MyFeedFolderListQueryQuery, MyFeedFolderListQueryQueryVariables> & ({ variables: MyFeedFolderListQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyFeedFolderListQueryQuery, MyFeedFolderListQueryQueryVariables>(MyFeedFolderListQueryDocument, options);
      }
export function useMyFeedFolderListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFeedFolderListQueryQuery, MyFeedFolderListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyFeedFolderListQueryQuery, MyFeedFolderListQueryQueryVariables>(MyFeedFolderListQueryDocument, options);
        }
export function useMyFeedFolderListQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyFeedFolderListQueryQuery, MyFeedFolderListQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyFeedFolderListQueryQuery, MyFeedFolderListQueryQueryVariables>(MyFeedFolderListQueryDocument, options);
        }
export type MyFeedFolderListQueryQueryHookResult = ReturnType<typeof useMyFeedFolderListQueryQuery>;
export type MyFeedFolderListQueryLazyQueryHookResult = ReturnType<typeof useMyFeedFolderListQueryLazyQuery>;
export type MyFeedFolderListQuerySuspenseQueryHookResult = ReturnType<typeof useMyFeedFolderListQuerySuspenseQuery>;
export type MyFeedFolderListQueryQueryResult = Apollo.QueryResult<MyFeedFolderListQueryQuery, MyFeedFolderListQueryQueryVariables>;
export const MyFeedFolderListTemplateQueryDocument = gql`
    query MyFeedFolderListTemplateQuery($myFeedFoldersInput: MyFeedFoldersInput!) {
  myFeedFolders(myFeedFoldersInput: $myFeedFoldersInput) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
      }
    }
  }
}
    `;

/**
 * __useMyFeedFolderListTemplateQueryQuery__
 *
 * To run a query within a React component, call `useMyFeedFolderListTemplateQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFeedFolderListTemplateQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFeedFolderListTemplateQueryQuery({
 *   variables: {
 *      myFeedFoldersInput: // value for 'myFeedFoldersInput'
 *   },
 * });
 */
export function useMyFeedFolderListTemplateQueryQuery(baseOptions: Apollo.QueryHookOptions<MyFeedFolderListTemplateQueryQuery, MyFeedFolderListTemplateQueryQueryVariables> & ({ variables: MyFeedFolderListTemplateQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyFeedFolderListTemplateQueryQuery, MyFeedFolderListTemplateQueryQueryVariables>(MyFeedFolderListTemplateQueryDocument, options);
      }
export function useMyFeedFolderListTemplateQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFeedFolderListTemplateQueryQuery, MyFeedFolderListTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyFeedFolderListTemplateQueryQuery, MyFeedFolderListTemplateQueryQueryVariables>(MyFeedFolderListTemplateQueryDocument, options);
        }
export function useMyFeedFolderListTemplateQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyFeedFolderListTemplateQueryQuery, MyFeedFolderListTemplateQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyFeedFolderListTemplateQueryQuery, MyFeedFolderListTemplateQueryQueryVariables>(MyFeedFolderListTemplateQueryDocument, options);
        }
export type MyFeedFolderListTemplateQueryQueryHookResult = ReturnType<typeof useMyFeedFolderListTemplateQueryQuery>;
export type MyFeedFolderListTemplateQueryLazyQueryHookResult = ReturnType<typeof useMyFeedFolderListTemplateQueryLazyQuery>;
export type MyFeedFolderListTemplateQuerySuspenseQueryHookResult = ReturnType<typeof useMyFeedFolderListTemplateQuerySuspenseQuery>;
export type MyFeedFolderListTemplateQueryQueryResult = Apollo.QueryResult<MyFeedFolderListTemplateQueryQuery, MyFeedFolderListTemplateQueryQueryVariables>;
export const TrendArticleListQueryDocument = gql`
    query TrendArticleListQuery($input: ArticlesInput!) {
  articles(articlesInput: $input) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        ...ArticleCardWrapperFragment
      }
    }
  }
}
    ${ArticleCardWrapperFragmentFragmentDoc}`;

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
    query TrendArticleDashboardTemplateQuery($input: ArticlesInput!, $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!) {
  articles(articlesInput: $input) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        ...ArticleCardWrapperFragment
      }
    }
  }
  favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
    ...FavoriteFolderArticleCardWrapperFragment
  }
}
    ${ArticleCardWrapperFragmentFragmentDoc}
${FavoriteFolderArticleCardWrapperFragmentFragmentDoc}`;

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
 *      input: // value for 'input'
 *      favoriteArticleFoldersInput: // value for 'favoriteArticleFoldersInput'
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