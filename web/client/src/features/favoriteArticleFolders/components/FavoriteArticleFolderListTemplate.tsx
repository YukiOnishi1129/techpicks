import { getUser } from "@/features/users/actions/user";

import { CreateFavoriteArticleFolderDialog } from "./Dialog";
import { FavoriteArticleFolderList } from "./FavoriteArticleFolderList";
import { fetchFavoriteArticleFoldersAPI } from "../actions/favoriteArticleFolders";

export const FavoriteArticleFolderListTemplate = async () => {
  const res = await fetchFavoriteArticleFoldersAPI();
  const user = await getUser();
  return (
    <div className="w-auto">
      <h1 className="mb-4 mt-8 text-2xl font-bold">Favorite Article Folder</h1>
      <div>
        <CreateFavoriteArticleFolderDialog />
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
