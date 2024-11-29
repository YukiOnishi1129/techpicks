import { User } from "@supabase/supabase-js";
import { readFragment } from "gql.tada";
import { FC } from "react";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import {
  FavoriteAllFolderArticlesInput,
  FavoriteArticleFoldersInput,
} from "@/graphql/type";

import { getFavoriteArticleFoldersAllListTemplateQuery } from "./actGetFavoriteArticleFoldersAllListTemplateQuery";
import { FavoriteArticleAllListTemplateFragment } from "./FavoriteArticleAllListTemplateFragment";
import { AllFolderFavoriteArticleList } from "../../List";
import { FavoriteArticleKeywordSearchForm } from "../../Search";

type FavoriteArticleAllListTemplateProps = {
  user: User;
  keyword?: string;
};

export const FavoriteArticleAllListTemplate: FC<
  FavoriteArticleAllListTemplateProps
> = async ({ user, keyword }) => {
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
      title: "All",
      href: `/favorite/article`,
    },
  ];

  const favoriteAllFolderArticlesInput: FavoriteAllFolderArticlesInput = {
    keyword,
  };

  const favoriteArticleFoldersInput: FavoriteArticleFoldersInput = {
    isAllFetch: true,
    isFolderOnly: false,
    isFavoriteArticleAllFetch: true,
  };

  const { data, error } = await getFavoriteArticleFoldersAllListTemplateQuery(
    favoriteAllFolderArticlesInput,
    favoriteArticleFoldersInput
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const fragment = readFragment(FavoriteArticleAllListTemplateFragment, data);

  return (
    <div>
      <div className="fixed z-10  w-[90%] bg-card md:block md:w-[70%] md:justify-between md:px-4">
        <div className="mt-4">
          <PageBreadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <div className="hidden w-full items-center justify-between md:flex">
          <div className="w-4/5 pt-2">
            <FavoriteArticleKeywordSearchForm keyword={keyword} />
          </div>
        </div>
      </div>

      <div className="h-12 md:h-28" />

      <AllFolderFavoriteArticleList
        data={fragment.favoriteAllFolderArticles}
        favoriteArticleFolders={fragment.favoriteArticleFolders}
        keyword={keyword}
      />

      {/* <FavoriteArticleList
        user={user}
        data={data}
        folderId={id}
        keyword={keyword}
        favoriteArticleFolders={fragment.favoriteArticleFolders}
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
