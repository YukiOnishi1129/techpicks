"use client";
import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";

import { useStatusToast } from "@/hooks/useStatusToast";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

type FavoriteArticleFolderListProps = {
  initialFavoriteArticleFolders: FavoriteArticleFolderType[];
  user?: User;
};

export const FavoriteArticleFolderList: FC<FavoriteArticleFolderListProps> = ({
  initialFavoriteArticleFolders,
  user,
}) => {
  const { successToast, failToast } = useStatusToast();

  return (
    <>
      {initialFavoriteArticleFolders.length === 0 ? (
        <div className="h-[590px] md:h-[540px]">
          <NotFoundList message="No articles found" />
        </div>
      ) : (
        <div className="m-auto h-[590px] overflow-y-scroll md:h-[540px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* {initialFavoriteArticleFolders.map((myFeedFolder) => (
              <MyFeedFolderCard
                key={myFeedFolder.id}
                user={user}
                myFeedFolder={myFeedFolder}
                feeds={feeds}
                handleUpdateMyFeedFolder={handleUpdateMyFeedFolder}
                handleDeleteMyFeedFolder={handleDeleteMyFeedFolder}
              />
            ))} */}
          </div>
        </div>
      )}
    </>
  );
};
