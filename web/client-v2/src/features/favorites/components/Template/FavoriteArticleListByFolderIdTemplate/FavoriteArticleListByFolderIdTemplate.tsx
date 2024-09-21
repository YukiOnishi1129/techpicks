import { User } from "@supabase/supabase-js";
import { readFragment } from "gql.tada";
import { FC } from "react";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import {
  FavoriteArticleFolderInput,
  FavoriteArticlesInput,
} from "@/graphql/type";

import { getFavoriteArticleListByFolderIdTemplateQuery } from "./actGetFavoriteArticleListByFolderIdTemplateQuery";
import { FavoriteArticleListByFolderIdTemplateFragment } from "./FavoriteArticleListByFolderIdTemplateFragment";

type FavoriteArticleListByFolderIdTemplateProps = {
  user: User;
  id: string;
  keyword?: string;
};

export const FavoriteArticleListByFolderIdTemplate: FC<
  FavoriteArticleListByFolderIdTemplateProps
> = async ({ user, id, keyword }) => {
  const favoriteArticleInput: FavoriteArticlesInput = {
    folderId: id,
    keyword: keyword,
  };

  const folderInput: FavoriteArticleFolderInput = {
    id: id,
    isFolderOnly: true,
  };

  const { data, error } = await getFavoriteArticleListByFolderIdTemplateQuery(
    favoriteArticleInput,
    folderInput
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const fragment = readFragment(
    FavoriteArticleListByFolderIdTemplateFragment,
    data
  );

  console.log("🔥");
  console.log(fragment);

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Favorite Folders",
      href: "/favorite",
    },
    {
      title: fragment.favoriteArticleFolder.title,
      href: `/favorite/article/${id}`,
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
            {/* <FavoriteArticleFolderArticleKeywordSearchInput
              favoriteArticleFolderId={id}
              keyword={keyword}
            /> */}
          </div>
          {/* <CreateFavoriteArticleDialog
            user={user}
            favoriteArticleFolderId={id}
          /> */}
        </div>
      </div>

      <div className="h-12 md:h-24" />

      {/* <FavoriteArticleList
        user={user}
        favoriteArticleFolderId={id}
        initialFavoriteArticles={resFavoriteArticles.data.favoriteArticles}
        otherFavoriteArticleFolders={otherFavoriteArticleFolders}
        keyword={keyword}
        fetchFavoriteArticles={
          fetchFavoriteArticlesByFavoriteArticleFolderIdAPI
        }
      /> */}

      {/* <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <FavoriteArticleKeyWordSearchDialog
          keyword={keyword}
          favoriteArticleFolderId={id}
        />
      </div> */}
    </div>
  );
};
