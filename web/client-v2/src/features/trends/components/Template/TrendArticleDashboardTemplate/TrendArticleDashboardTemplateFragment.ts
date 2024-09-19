import { graphql } from "gql.tada";

import { FollowFavoriteArticleDropdownMenuContentFragment } from "@/features/favorites/components/DropdownMenu/FollowFavoriteArticleDropdownMenu/FollowFavoriteArticleDropdownMenuFragment";

import { TrendArticleListFragment } from "../../List";

export const TrendArticleDashboardTemplateFragment = graphql(
  `
    fragment TrendArticleDashboardTemplateFragment on Query {
      enArticles: articles(articlesInput: $enInput) {
        ...TrendArticleListFragment
      }
      jpArticles: articles(articlesInput: $jpInput) {
        ...TrendArticleListFragment
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FollowFavoriteArticleDropdownMenuContentFragment
      }
    }
  `,
  [TrendArticleListFragment, FollowFavoriteArticleDropdownMenuContentFragment]
);
