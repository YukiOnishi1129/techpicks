import { graphql } from "gql.tada";

export const UpsertArticleCommentMutation = graphql(`
  mutation UpsertArticleCommentMutation($input: UpsertArticleCommentInput!) {
    upsertArticleComment(input: $input) {
      id
      comment
    }
  }
`);
