"use server";

import { graphql } from "gql.tada";

import { CreateMultiFavoriteArticleForUploadArticleInput } from "@/graphql/type";
import { getClient } from "@/shared/lib/apollo/client";

const CreateMultiFolderFavoriteArticleForUploadArticleMutation = graphql(`
  mutation CreateMultiFolderFavoriteArticleForUploadArticleMutation(
    $input: CreateMultiFavoriteArticleForUploadArticleInput!
  ) {
    createMultiFavoriteArticleForUploadArticle(input: $input) {
      favoriteArticle {
        id
      }
      relationFavoriteArticleFolders {
        id
      }
    }
  }
`);

export const createMultiFolderFavoriteArticleForUploadArticleMutation = async (
  input: CreateMultiFavoriteArticleForUploadArticleInput
) => {
  const createMultiFolderFavoriteArticleForUploadArticle = getClient().mutate({
    mutation: CreateMultiFolderFavoriteArticleForUploadArticleMutation,
    variables: {
      input,
    },
    errorPolicy: "all",
  });

  const { data, errors } =
    await createMultiFolderFavoriteArticleForUploadArticle;
  return { data, errors };
};
