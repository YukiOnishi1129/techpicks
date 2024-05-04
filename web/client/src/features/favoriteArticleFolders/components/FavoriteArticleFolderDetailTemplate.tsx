import { FC } from "react";

import { fetchFavoriteArticlesByFavoriteArticleFolderIdAPI } from "@/features/favoriteArticles/actions/favoriteArticle";
import { FavoriteArticleList } from "@/features/favoriteArticles/components/FavoriteArticleList";
import { FavoriteArticleFolderArticleKeywordSearchInput } from "@/features/search/components/favoriteArticleFolder/FavoriteArticleFolderArticleKeywordSearchInput";
import { getUser } from "@/features/users/actions/user";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import {
  fetchFavoriteArticleFolderByIdAPI,
  fetchFavoriteArticleFoldersAPI,
} from "../actions/favoriteArticleFolders";

type FavoriteArticleFolderDetailTemplateProps = {
  id: string;
  keyword?: string;
};

export const FavoriteArticleFolderDetailTemplate: FC<
  FavoriteArticleFolderDetailTemplateProps
> = async ({ id, keyword }) => {
  const user = await getUser();
  const res = await fetchFavoriteArticleFolderByIdAPI(id);
  const resFavoriteArticles =
    await fetchFavoriteArticlesByFavoriteArticleFolderIdAPI({
      favoriteArticleFolderId: id,
      keyword: keyword,
    });

  const resAllFavoriteArticleFolders = await fetchFavoriteArticleFoldersAPI({});

  const title = res.data.favoriteArticleFolder?.title || "";

  const otherFavoriteArticleFolders =
    resAllFavoriteArticleFolders.data.favoriteArticleFolders.filter(
      (favoriteArticleFolder) => favoriteArticleFolder.id !== id
    );

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Favorite Article Folder",
      href: "/favorite-article-folder",
    },
    {
      title: title,
      href: `/favorite-article-folder/${id}`,
    },
  ];
  return (
    <div className="mb-2 mt-4">
      <PageBreadcrumb breadcrumbs={breadcrumbs} />
      <div className="mt-2">
        <FavoriteArticleFolderArticleKeywordSearchInput
          favoriteArticleFolderId={id}
        />
      </div>

      <div className="mt-4">
        <FavoriteArticleList
          user={user}
          favoriteArticleFolderId={id}
          initialFavoriteArticles={resFavoriteArticles.data.favoriteArticles}
          otherFavoriteArticleFolders={otherFavoriteArticleFolders}
          keyword={keyword}
          fetchFavoriteArticles={
            fetchFavoriteArticlesByFavoriteArticleFolderIdAPI
          }
        />
      </div>
    </div>
  );
};
