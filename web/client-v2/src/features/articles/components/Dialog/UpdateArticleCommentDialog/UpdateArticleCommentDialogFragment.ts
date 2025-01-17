import { graphql } from "gql.tada";

export const UpdateArticleCommentDialogFragment = graphql(`
  fragment UpdateArticleCommentDialogFragment on ArticleComment {
    id
    comment
  }
`);
