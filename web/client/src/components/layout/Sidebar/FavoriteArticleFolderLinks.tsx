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
          className="mb-2 w-full cursor-pointer pl-2 pt-2"
        >
          <Link
            href={`/favorite-article-folder/${folder.id}`}
            className="flex items-center"
          >
            <FaHeart color="red" />
            <p className="ml-4 inline-block w-full truncate ">{folder.title}</p>
          </Link>
        </div>
      ))}
    </>
  );
};
