import { FragmentOf, readFragment } from "gql.tada";
import Link from "next/link";
import { FC } from "react";
import { FaHeart } from "react-icons/fa";

import { FavoriteArticleFolderLinkFragment } from "./FavoriteArticleFolderLinkFragment";

type FavoriteArticleFolderLinksProps = {
  data: FragmentOf<typeof FavoriteArticleFolderLinkFragment>;
  onCloseSheet?: () => void;
};

export const FavoriteArticleFolderLink: FC<FavoriteArticleFolderLinksProps> = ({
  data,
  onCloseSheet,
}) => {
  const fragment = readFragment(FavoriteArticleFolderLinkFragment, data);
  return (
    <div className="w-full cursor-pointer ">
      <Link
        href={`/favorite/article/${fragment.id}`}
        className="flex items-center py-2 pl-2 hover:bg-secondary"
        onClick={onCloseSheet}
      >
        <FaHeart color="red" />
        <p className="ml-4 inline-block w-full truncate ">{fragment.title}</p>
      </Link>
    </div>
  );
};
