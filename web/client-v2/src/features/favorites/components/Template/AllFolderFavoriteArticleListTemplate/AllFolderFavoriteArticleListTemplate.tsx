import { User } from "@supabase/supabase-js";
import { FC, Suspense } from "react";

import {
  FavoriteAllFolderArticlesInput,
  FavoriteArticleFoldersInput,
} from "@/graphql/type";
import { ScreenLoader } from "@/shared/components/layout/ScreenLoader";
import {
  BreadCrumbType,
  PageBreadcrumb,
} from "@/shared/components/ui/breadcrumb";
import { PreloadQuery } from "@/shared/lib/apollo/client";


import { AllFolderFavoriteArticleListTemplateQuery } from "./AllFolderFavoriteArticleListTemplateQuery";
import { SearchFavoriteArticleListDialog } from "../../Dialog";
import { AllFolderFavoriteArticleList } from "../../List";
import { FavoriteArticleKeywordSearchForm } from "../../Search";

type FavoriteArticleAllListTemplateProps = {
  user: User;
  keyword?: string;
};

export const AllFolderFavoriteArticleListTemplate: FC<
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
    first: 20,
    after: null,
    keyword: keyword,
  };

  const favoriteArticleFoldersInput: FavoriteArticleFoldersInput = {
    isAllFetch: true,
    isFolderOnly: false,
    isFavoriteArticleAllFetch: true,
  };

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

      <PreloadQuery
        query={AllFolderFavoriteArticleListTemplateQuery}
        variables={{
          favoriteAllFolderArticlesInput,
          favoriteArticleFoldersInput,
        }}
      >
        <Suspense fallback={<ScreenLoader />}>
          <AllFolderFavoriteArticleList keyword={keyword} />
        </Suspense>
      </PreloadQuery>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <SearchFavoriteArticleListDialog keyword={keyword} />
      </div>
    </div>
  );
};
