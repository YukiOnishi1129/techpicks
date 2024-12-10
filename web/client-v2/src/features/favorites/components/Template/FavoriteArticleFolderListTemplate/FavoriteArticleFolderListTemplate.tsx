import { User } from "@supabase/supabase-js";
import { FC, Suspense } from "react";
import { FaHeart } from "react-icons/fa";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

import { PreloadQuery } from "@/lib/apollo/client";

import { FavoriteArticleFolderListTemplateQuery } from "./FavoriteArticleFolderListTemplateQuery";
import { CreateFavoriteArticleFolderDialog } from "../../Dialog";
import { FavoriteArticleFolderList } from "../../List";
import { FavoriteArticleFolderKeywordSearchForm } from "../../Search";

type FavoriteArticleFolderListTemplateProps = {
  user: User;
  keyword?: string;
};

export const FavoriteArticleFolderListTemplate: FC<
  FavoriteArticleFolderListTemplateProps
> = async ({ user, keyword }) => {
  return (
    <div>
      <div className="fixed z-10 hidden w-[90%] bg-card md:block md:w-[70%] md:px-4">
        <h1 className="mt-4 flex items-center text-2xl font-bold">
          <FaHeart className="mr-4" color="red" />
          <span>Favorite Folders</span>
        </h1>
        <div className="mt-2 flex w-full items-center justify-between">
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
        <Suspense fallback={<ScreenLoader />}>
          <FavoriteArticleFolderList user={user} />
        </Suspense>
      </PreloadQuery>

      {/* <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <FavoriteArticleFolderKeyWordSearchDialog keyword={keyword} />
      </div> */}
    </div>
  );
};
