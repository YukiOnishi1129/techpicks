import { FC } from "react";

import { fetchFavoriteArticlesByFavoriteArticleFolderIdAPI } from "@/features/favoriteArticles/actions/favoriteArticle";
import { FavoriteArticleList } from "@/features/favoriteArticles/components/FavoriteArticleList";
import { getUser } from "@/features/users/actions/user";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { fetchFavoriteArticleFolderByIdAPI } from "../actions/favoriteArticleFolders";

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
    });

  const title = res.data.favoriteArticleFolder?.title || "";
  const favoriteArticleFolderId = res.data.favoriteArticleFolder?.id || "";

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
        {/* <MyFeedFolderArticleKeywordSearchInput myFeedFolderId={id} /> */}
      </div>

      <div className="mt-4">
        <FavoriteArticleList
          user={user}
          favoriteArticleFolderId={favoriteArticleFolderId}
          initialFavoriteArticles={resFavoriteArticles.data.favoriteArticles}
          keyword={keyword}
          fetchFavoriteArticles={
            fetchFavoriteArticlesByFavoriteArticleFolderIdAPI
          }
        />
      </div>
    </div>
  );
};
