import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { DesktopHeader } from "./DesktopHeader";

type HeaderProps = {
  user?: User;
};

export const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopHeader user={user} />
      </div>
      <div className="block md:hidden">
        {/* <MobileHeader
          user={user}
          myFeedFolders={myFeedFolderRes.data.myFeedFolders}
          favoriteArticleFolders={
            favoriteArticleFolderRes.data.favoriteArticleFolders
          }
        /> */}
      </div>
    </>
  );
};
