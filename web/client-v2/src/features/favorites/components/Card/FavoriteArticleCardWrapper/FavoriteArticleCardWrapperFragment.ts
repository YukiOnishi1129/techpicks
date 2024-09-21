import { graphql } from "gql.tada";

import { FollowFavoriteArticleDropdownMenuContentFragment } from "../../DropdownMenu/FollowFavoriteArticleDropdownMenu/FollowFavoriteArticleDropdownMenuFragment";

export const FavoriteFolderFavoriteArticleCardWrapperFragment = graphql(
  `
    fragment FavoriteFolderFavoriteArticleCardWrapperFragment on FavoriteArticleFolderConnection {
      edges {
        node {
          id
          title
        }
      }
      ...FollowFavoriteArticleDropdownMenuContentFragment
    }
  `,
  [FollowFavoriteArticleDropdownMenuContentFragment]
);
