import Link from "next/link";
import { FaHeart } from "react-icons/fa";

import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";

export const FavoriteArticleFolderLinks = async () => {
  const res = await fetchFavoriteArticleFoldersAPI({});
  return (
    <>
      {res.data.favoriteArticleFolders.map((folder, i) => (
        <div
          key={`sidebar-${folder.id}-${i}`}
          className="w-full cursor-pointer "
        >
          <Link
            href={`/favorite-article-folder/${folder.id}`}
            className="flex items-center py-2 pl-2 hover:bg-secondary"
          >
            <FaHeart color="red" />
            <p className="ml-4 inline-block w-full truncate ">{folder.title}</p>
          </Link>
        </div>
      ))}
    </>
  );
};
