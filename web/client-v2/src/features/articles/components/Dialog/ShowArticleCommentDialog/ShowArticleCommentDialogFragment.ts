import { graphql } from "gql.tada";

export const ShowArticleCommentDialogFragment = graphql(`
  fragment ShowArticleCommentDialogFragment on ArticleComment {
    id
    comment
  }
`);
