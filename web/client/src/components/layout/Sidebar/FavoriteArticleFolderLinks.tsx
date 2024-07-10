import Link from "next/link";
import { FC } from "react";
import { FaHeart } from "react-icons/fa";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

type FavoriteArticleFolderLinksProps = {
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  handleCloseSheet?: () => void;
};

export const FavoriteArticleFolderLinks: FC<
  FavoriteArticleFolderLinksProps
> = ({ favoriteArticleFolders, handleCloseSheet }) => {
  return (
    <>
      {favoriteArticleFolders.map((folder, i) => (
        <div
          key={`sidebar-${folder.id}-${i}`}
          className="w-full cursor-pointer "
        >
          <Link
            href={`/favorite-article-folder/${folder.id}`}
            className="flex items-center py-2 pl-2 hover:bg-secondary"
            onClick={handleCloseSheet}
          >
            <FaHeart color="red" />
            <p className="ml-4 inline-block w-full truncate ">{folder.title}</p>
          </Link>
        </div>
      ))}
    </>
  );
};
