import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { fetchFavoriteArticlesByFavoriteArticleFolderIdAPI } from "@/features/favoriteArticles/actions/favoriteArticle";
import {
  CreateFavoriteArticleDialog,
  CreateFavoriteArticleDialogFloatButton,
} from "@/features/favoriteArticles/components/Dialog";
import { FavoriteArticleList } from "@/features/favoriteArticles/components/FavoriteArticleList";
import { FavoriteArticleKeyWordSearchDialog } from "@/features/search/components/favoriteArticleFolder/Dialog";
import { FavoriteArticleFolderArticleKeywordSearchInput } from "@/features/search/components/favoriteArticleFolder/FavoriteArticleFolderArticleKeywordSearchInput";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import {
  fetchFavoriteArticleFolderByIdAPI,
  fetchFavoriteArticleFoldersAPI,
} from "../../actions/favoriteArticleFolders";

type FavoriteArticleFolderDetailTemplateProps = {
  user: User;
  id: string;
  keyword?: string;
};

export const FavoriteArticleFolderDetailTemplate: FC<
  FavoriteArticleFolderDetailTemplateProps
> = async ({ user, id, keyword }) => {
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
    <div>
      <div className="fixed z-10  w-[90%] bg-card md:block md:w-[70%] md:justify-between md:px-4">
        <div className="mt-4">
          <PageBreadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <div className="hidden w-full items-center justify-between md:flex">
          <div className="w-4/5 pt-2">
            <FavoriteArticleFolderArticleKeywordSearchInput
              favoriteArticleFolderId={id}
              keyword={keyword}
            />
          </div>
          <CreateFavoriteArticleDialog
            user={user}
            favoriteArticleFolderId={id}
          />
        </div>
      </div>

      <div className="h-12 md:h-24" />

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

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <div>
          <FavoriteArticleKeyWordSearchDialog
            keyword={keyword}
            favoriteArticleFolderId={id}
          />
        </div>

        <div className="mt-4">
          <CreateFavoriteArticleDialogFloatButton
            user={user}
            favoriteArticleFolderId={id}
          />
        </div>
      </div>
    </div>
  );
};
