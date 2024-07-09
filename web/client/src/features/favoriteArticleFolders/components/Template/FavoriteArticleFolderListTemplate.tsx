import { User } from "@supabase/supabase-js";
import { FC } from "react";
import { FaHeart } from "react-icons/fa";

import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
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
      <div>
        <h1 className="mb-4 mt-8 flex items-center text-2xl font-bold">
          <FaHeart className="mr-4" color="red" />
          <span>Favorite Article Folders</span>
        </h1>
        <div className="flex w-full items-center justify-between">
          <div className="w-4/5 pt-2">
            <FavoriteArticleFolderKeywordSearchInput />
          </div>
          <div>
            <CreateFavoriteArticleFolderDialog />
          </div>
        </div>
      </div>

      <div className="w-full border-b-2  py-4">
        <FavoriteArticleFolderList
          initialFavoriteArticleFolders={res.data.favoriteArticleFolders}
          user={user}
        />
      </div>
    </div>
  );
};
