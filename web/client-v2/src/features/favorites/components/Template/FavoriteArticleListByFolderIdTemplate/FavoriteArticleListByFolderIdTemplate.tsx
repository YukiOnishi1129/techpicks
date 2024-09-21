import { User } from "@supabase/supabase-js";
import { readFragment } from "gql.tada";
import { FC } from "react";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import {
  FavoriteArticleFoldersInput,
  FavoriteArticlesInput,
} from "@/graphql/type";

import { getFavoriteArticleListByFolderIdTemplateQuery } from "./actGetFavoriteArticleListByFolderIdTemplateQuery";
import {
  FavoriteArticleFoldersByFolderIdTemplateFragment,
  FavoriteArticleListByFolderIdTemplateFragment,
} from "./FavoriteArticleListByFolderIdTemplateFragment";
import { FavoriteArticleList } from "../../List/FavoriteArticleList/FavoriteArticleList";

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

  const favoriteArticleFoldersInput: FavoriteArticleFoldersInput = {
    isAllFetch: true,
    isFolderOnly: false,
    isFavoriteArticleAllFetch: true,
  };

  const { data, error } = await getFavoriteArticleListByFolderIdTemplateQuery(
    favoriteArticleInput,
    favoriteArticleFoldersInput
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const fragment = readFragment(
    FavoriteArticleListByFolderIdTemplateFragment,
    data
  );

  const foldersFragment = readFragment(
    FavoriteArticleFoldersByFolderIdTemplateFragment,
    fragment.favoriteArticleFolders
  );

  const targetFavoriteFolder = foldersFragment.edges.find(
    (edge) => edge.node.id === id
  );

  if (!targetFavoriteFolder) {
    return <div>Not Found</div>;
  }

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
      title: targetFavoriteFolder.node.title,
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

      <FavoriteArticleList
        user={user}
        data={fragment.favoriteArticles}
        folderId={id}
        keyword={keyword}
        favoriteArticleFolders={fragment.favoriteArticleFolders}
      />

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
