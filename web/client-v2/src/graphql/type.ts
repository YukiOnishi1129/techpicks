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
  feed: Feed;
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

/** Favorite Article schema */
export type FavoriteArticle = Node & {
  __typename?: 'FavoriteArticle';
  articleId?: Maybe<Scalars['String']['output']>;
  articleUrl: Scalars['String']['output'];
  authorName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Int']['output'];
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
  /** Get articles */
  articles: ArticleConnection;
};


export type QueryArticlesArgs = {
  articlesInput: ArticlesInput;
};

export type ArticleDashboardTemplateFragmentFragment = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string } | null } }> } };

export type ArticleListQueryQueryVariables = Exact<{
  input: ArticlesInput;
}>;


export type ArticleListQueryQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string } | null } }> } };

export type ArticleCardItemFragmentFragment = { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string } | null };

export type ArticleCardWrapperFragmentFragment = { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string } | null };

export type ArticleListFragmentFragment = { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', node: { __typename?: 'Article', id: string, title: string, articleUrl: string, publishedAt?: number | null, thumbnailUrl: string, isEng: boolean, isPrivate: boolean, isBookmarked: boolean, bookmarkId?: string | null, likeCount?: number | null, platform?: { __typename?: 'Platform', id: string, name: string, faviconUrl: string } | null } }> };

export type TrendArticleDashboardTemplateQueryQueryVariables = Exact<{
  input: ArticlesInput;
}>;


export type TrendArticleDashboardTemplateQueryQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleEdge', cursor: string, node: { __typename?: 'Article', id: string, title: string, isBookmarked: boolean, bookmarkId?: string | null } }> } };

export const ArticleCardItemFragmentFragmentDoc = gql`
    fragment ArticleCardItemFragment on Article {
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
export const TrendArticleDashboardTemplateQueryDocument = gql`
    query TrendArticleDashboardTemplateQuery($input: ArticlesInput!) {
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
        isBookmarked
        bookmarkId
      }
    }
  }
}
    `;

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