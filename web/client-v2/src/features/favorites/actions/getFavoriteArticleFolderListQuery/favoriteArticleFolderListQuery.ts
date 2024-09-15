import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { FavoriteArticleFoldersInput } from "@/graphql/type";

import { FavoriteArticleFolderListTemplateFragment } from "../../components/Template/FavoriteArticleFolderListTemplate/FavoriteArticleFolderListTemplateFragment";

export const FavoriteArticleFolderListQuery = graphql(
  `
    query FavoriteArticleFolderListQuery($input: FavoriteArticleFoldersInput!) {
      ...FavoriteArticleFolderListTemplateFragment
    }
  `,
  [FavoriteArticleFolderListTemplateFragment]
);

export const favoriteArticleFolderListQuery = (
  input: FavoriteArticleFoldersInput
) => {
  const query = getClient().query({
    query: FavoriteArticleFolderListQuery,
    context: {
      fetchOptions: {
        cache: "no-cache",
      },
    },
    variables: {
      input,
    },
    errorPolicy: "all",
  });

  return query;
};
