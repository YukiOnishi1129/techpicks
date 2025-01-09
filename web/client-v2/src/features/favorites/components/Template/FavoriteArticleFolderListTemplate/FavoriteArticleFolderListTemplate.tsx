import { FC, Suspense } from "react";
import { FaHeart } from "react-icons/fa";

import { ScreenLoader } from "@/shared/components/layout/ScreenLoader";
import { PreloadQuery } from "@/shared/lib/apollo/client";
import { SearchParamsType } from "@/shared/types/utils";

import { FavoriteArticleFolderListTemplateQuery } from "./FavoriteArticleFolderListTemplateQuery";
import {
  CreateFavoriteArticleFolderDialog,
  SearchFavoriteArticleFolderDialog,
} from "../../Dialog";
import { FavoriteArticleFolderList } from "../../List";
import { FavoriteArticleFolderKeywordSearchForm } from "../../Search";

type FavoriteArticleFolderListTemplateProps = {
  searchParams: SearchParamsType;
  keyword?: string;
};

export const FavoriteArticleFolderListTemplate: FC<
  FavoriteArticleFolderListTemplateProps
> = async ({ searchParams, keyword }) => {
  return (
    <div>
      <div className="fixed z-10 hidden w-[90%] gap-2 bg-card md:block md:w-[70%] md:px-4">
        <h1 className="mt-4 flex items-center gap-4 text-2xl font-bold">
          <FaHeart color="red" />
          <span>Favorite Folders</span>
        </h1>
        <div className="flex w-full items-center justify-between">
          <div className="w-4/5 pr-4">
            <FavoriteArticleFolderKeywordSearchForm keyword={keyword} />
          </div>
          <div>
            <CreateFavoriteArticleFolderDialog />
          </div>
        </div>
      </div>
      <div className="h-4 md:h-[120px]" />

      <PreloadQuery
        query={FavoriteArticleFolderListTemplateQuery}
        variables={{
          input: {
            first: 9,
            after: null,
            keyword: keyword,
          },
        }}
      >
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<ScreenLoader />}
        >
          <FavoriteArticleFolderList keyword={keyword} />
        </Suspense>
      </PreloadQuery>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <SearchFavoriteArticleFolderDialog keyword={keyword} />
      </div>
    </div>
  );
};
