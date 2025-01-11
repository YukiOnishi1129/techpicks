import { FC, Suspense } from "react";

import { SkeltonArticleList } from "@/features/articles/components/List";

import {
  FavoriteAllFolderArticlesInput,
  FavoriteArticleFoldersInput,
} from "@/graphql/type";
import {
  BreadCrumbType,
  PageBreadcrumb,
} from "@/shared/components/ui/breadcrumb";
import { PreloadQuery } from "@/shared/lib/apollo/client";
import { SearchParamsType } from "@/shared/types/utils";

import { listServerFavoriteFolderAllFolderFavoriteArticleListTemplateQuery } from "./actListServerFavoriteFolderAllFolderFavoriteArticleListTemplateQuery";
import { AllFolderFavoriteArticleListTemplateQuery } from "./AllFolderFavoriteArticleListTemplateQuery";
import {
  CreateMultiFolderFavoriteArticleDialog,
  SearchFavoriteArticleListDialog,
} from "../../Dialog";
import { AllFolderFavoriteArticleList } from "../../List";
import { FavoriteArticleKeywordSearchForm } from "../../Search";
import { SELECTABLE_FAVORITE_ARTICLE_FOLDER_LIST_LIMIT } from "@/shared/constant/limit";

type FavoriteArticleAllListTemplateProps = {
  searchParams: SearchParamsType;
  keywordList: Array<string>;
};

export const AllFolderFavoriteArticleListTemplate: FC<
  FavoriteArticleAllListTemplateProps
> = async ({ searchParams, keywordList }) => {
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
    keywords: keywordList,
  };

  const favoriteArticleFoldersInput: FavoriteArticleFoldersInput = {
    isAllFetch: true,
    isFolderOnly: false,
    isFavoriteArticleAllFetch: true,
  };

  const { data, error } =
    await listServerFavoriteFolderAllFolderFavoriteArticleListTemplateQuery({
      first: SELECTABLE_FAVORITE_ARTICLE_FOLDER_LIST_LIMIT,
      after: null,
    });

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div className="fixed z-10  w-[90%] bg-card md:block md:w-[70%] md:justify-between md:px-4">
        <div className="mt-4">
          <PageBreadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <div className="hidden w-full items-center justify-between md:flex">
          <div className="w-4/5 pt-2">
            <FavoriteArticleKeywordSearchForm keywordList={keywordList} />
          </div>
          <CreateMultiFolderFavoriteArticleDialog
            foldersEndCursor={
              data.favoriteArticleFolders.pageInfo.endCursor || undefined
            }
          />
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
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<SkeltonArticleList />}
        >
          <AllFolderFavoriteArticleList keywordList={keywordList} />
        </Suspense>
      </PreloadQuery>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <SearchFavoriteArticleListDialog keywordList={keywordList} />
      </div>
    </div>
  );
};
