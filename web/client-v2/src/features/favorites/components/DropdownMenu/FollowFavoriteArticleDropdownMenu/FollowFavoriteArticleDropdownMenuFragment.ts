import { graphql } from "gql.tada";

export const FollowTargetFavoriteArticleFolderItemFragment = graphql(`
  fragment FollowTargetFavoriteArticleFolderItemFragment on FavoriteArticleFolder {
    id
    title
  }
`);

export const FollowFavoriteArticleDropdownMenuContentFragment = graphql(
  `
    fragment FollowFavoriteArticleDropdownMenuContentFragment on FavoriteArticleFolderConnection {
      edges {
        node {
          ...FollowTargetFavoriteArticleFolderItemFragment
        }
      }
    }
  `,
  [FollowTargetFavoriteArticleFolderItemFragment]
);
