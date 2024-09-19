import { graphql } from "gql.tada";

import { FollowFavoriteArticleDropdownMenuContentFragment } from "@/features/favorites/components/DropdownMenu/FollowFavoriteArticleDropdownMenu/FollowFavoriteArticleDropdownMenuFragment";

import { ArticleListFragment } from "../../List";

export const ArticleDashboardTemplateFragment = graphql(
  `
    fragment ArticleDashboardTemplateFragment on Query {
      enArticles: articles(articlesInput: $enInput) {
        ...ArticleListFragment
      }
      jpArticles: articles(articlesInput: $jpInput) {
        ...ArticleListFragment
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FollowFavoriteArticleDropdownMenuContentFragment
      }
    }
  `,
  [ArticleListFragment, FollowFavoriteArticleDropdownMenuContentFragment]
);
