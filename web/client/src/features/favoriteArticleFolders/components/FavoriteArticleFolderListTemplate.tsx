import { FC } from "react";
import { FaHeart } from "react-icons/fa";

import { FavoriteArticleFolderKeywordSearchInput } from "@/features/search/components/favoriteArticleFolder/FavoriteArticleFolderKeywordSearchInput";
import { getUser } from "@/features/users/actions/user";

import { CreateFavoriteArticleFolderDialog } from "./Dialog";
import { FavoriteArticleFolderList } from "./FavoriteArticleFolderList";
import { fetchFavoriteArticleFoldersAPI } from "../actions/favoriteArticleFolders";

type FavoriteArticleFolderListTemplateProps = {
  keyword?: string;
};

export const FavoriteArticleFolderListTemplate: FC<
  FavoriteArticleFolderListTemplateProps
> = async ({ keyword }) => {
  const res = await fetchFavoriteArticleFoldersAPI({ keyword });
  const user = await getUser();
  return (
    <div className="w-auto">
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

      <div className="w-full border-b-2  py-4">
        <FavoriteArticleFolderList
          initialFavoriteArticleFolders={res.data.favoriteArticleFolders}
          user={user}
        />
      </div>
    </div>
  );
};
