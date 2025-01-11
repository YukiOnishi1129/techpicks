import { FC } from "react";

import { getUser } from "@/features/auth/actions/user";

import { SELECTABLE_FAVORITE_ARTICLE_FOLDER_LIST_LIMIT } from "@/shared/constant/limit";

import { fetchHeaderQuery } from "./actHeaderQuery";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";


type HeaderProps = {};

export const Header: FC<HeaderProps> = async ({}) => {
  const user = await getUser();
  const userId = user?.id;

  const { data, error } = await fetchHeaderQuery({
    first: SELECTABLE_FAVORITE_ARTICLE_FOLDER_LIST_LIMIT,
    after: null,
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="hidden md:block">
        <DesktopHeader userId={userId} />
      </div>
      <div className="block md:hidden">
        <MobileHeader
          userId={userId}
          foldersEndCursor={
            data?.favoriteArticleFolders?.pageInfo?.endCursor || undefined
          }
        />
      </div>
    </>
  );
};
