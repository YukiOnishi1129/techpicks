import { User } from "@supabase/supabase-js";
import { FC } from "react";
import { FaHeart } from "react-icons/fa";

import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { FavoriteArticleFolderKeyWordSearchDialog } from "@/features/search/components/favoriteArticleFolder/Dialog";
import { FavoriteArticleFolderKeywordSearchInput } from "@/features/search/components/favoriteArticleFolder/FavoriteArticleFolderKeywordSearchInput";

import { CreateFavoriteArticleFolderDialog } from "../Dialog";
import { FavoriteArticleFolderList } from "../List";

type FavoriteArticleFolderListTemplateProps = {
  user: User;
  keyword?: string;
};

export const FavoriteArticleFolderListTemplate: FC<
  FavoriteArticleFolderListTemplateProps
> = async ({ user, keyword }) => {
  const res = await fetchFavoriteArticleFoldersAPI({ keyword });
  return (
    <div>
      <div className="fixed z-10 hidden w-[90%] bg-card md:block md:w-[70%] md:px-4">
        <h1 className="mt-4 flex items-center text-2xl font-bold">
          <FaHeart className="mr-4" color="red" />
          <span>Favorite Article Folders</span>
        </h1>
        <div className="flex w-full items-center justify-between">
          <div className="mt-2 w-4/5 pr-4">
            <FavoriteArticleFolderKeywordSearchInput keyword={keyword} />
          </div>
          <div>
            <CreateFavoriteArticleFolderDialog />
          </div>
        </div>
      </div>
      <div className="h-4 md:h-[120px]" />

      {/* <div className="w-full border-b-2  py-4"> */}
      <FavoriteArticleFolderList
        initialFavoriteArticleFolders={res.data.favoriteArticleFolders}
        user={user}
      />
      {/* </div> */}

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <FavoriteArticleFolderKeyWordSearchDialog keyword={keyword} />
      </div>
    </div>
  );
};
