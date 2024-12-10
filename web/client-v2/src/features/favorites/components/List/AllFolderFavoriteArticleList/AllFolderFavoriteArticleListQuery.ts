import { graphql } from "gql.tada";

import { AllFolderFavoriteArticleCardWrapperFragment } from "../../Card";

export const AllFolderFavoriteArticleListQuery = graphql(
  `
    query AllFolderFavoriteArticleListQuery(
      $input: FavoriteAllFolderArticlesInput!
    ) {
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
  `,
  [AllFolderFavoriteArticleCardWrapperFragment]
);
