"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/shared/lib/apollo/client";

const GetServerFavoriteArticleListByFolderIdTemplateQuery = graphql(`
  query GetServerFavoriteArticleListByFolderIdTemplate(
    $favoriteArticleFolderInput: FavoriteArticleFolderInput!
  ) {
    favoriteArticleFolder(input: $favoriteArticleFolderInput) {
      id
      title
    }
  }
`);

export const getServerFavoriteArticleListByFolderIdTemplateQuery = async (
  id: string
) => {
  const { data, error, loading } = await getClient().query({
    query: GetServerFavoriteArticleListByFolderIdTemplateQuery,
    variables: {
      favoriteArticleFolderInput: {
        id,
      },
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
