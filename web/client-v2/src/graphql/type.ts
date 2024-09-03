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

export type ArticlesInput = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  feedIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  languageStatus?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  tag?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

/** Bookmark schema */
export type Bookmark = Node & {
  __typename?: "Bookmark";
  articleId: Scalars["String"]["output"];
  articleUrl: Scalars["String"]["output"];
  createdAt: Scalars["Int"]["output"];
  description: Scalars["String"]["output"];
  feed: Feed;
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

/** Favorite Article schema */
export type FavoriteArticle = Node & {
  __typename?: "FavoriteArticle";
  articleId?: Maybe<Scalars["String"]["output"]>;
  articleUrl: Scalars["String"]["output"];
  authorName?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["Int"]["output"];
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
  /** Get articles */
  articles: ArticleConnection;
};

export type QueryArticlesArgs = {
  articlesInput: ArticlesInput;
};

export type GetArticlesQueryVariables = Exact<{
  input: ArticlesInput;
}>;

export type GetArticlesQuery = {
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
      cursor: string;
      node: { __typename?: "Article"; id: string; title: string };
    }>;
  };
};

export const GetArticlesDocument = gql`
  query GetArticles($input: ArticlesInput!) {
    articles(articlesInput: $input) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
        }
      }
    }
  }
`;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetArticlesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetArticlesQuery,
    GetArticlesQueryVariables
  > &
    (
      | { variables: GetArticlesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(
    GetArticlesDocument,
    options
  );
}
export function useGetArticlesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetArticlesQuery,
    GetArticlesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(
    GetArticlesDocument,
    options
  );
}
export function useGetArticlesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetArticlesQuery,
    GetArticlesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetArticlesQuery, GetArticlesQueryVariables>(
    GetArticlesDocument,
    options
  );
}
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<
  typeof useGetArticlesLazyQuery
>;
export type GetArticlesSuspenseQueryHookResult = ReturnType<
  typeof useGetArticlesSuspenseQuery
>;
export type GetArticlesQueryResult = Apollo.QueryResult<
  GetArticlesQuery,
  GetArticlesQueryVariables
>;
