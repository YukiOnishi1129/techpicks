import { graphql } from "gql.tada";

export const CreateBookmarkMutation = graphql(`
  mutation CreateBookmarkMutation($input: CreateBookmarkInput!) {
    createBookmark(createBookmarkInput: $input) {
      id
    }
  }
`);
