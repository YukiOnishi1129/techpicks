import { graphql } from "gql.tada";

export const FollowTargetFavoriteArticleFolderItemFragment = graphql(`
  fragment FollowTargetFavoriteArticleFolderItemFragment on FavoriteArticleFolder {
    id
    title
    favoriteArticles {
      id
      articleId
    }
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
