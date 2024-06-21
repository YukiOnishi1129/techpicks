import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";

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
        <MobileHeader />
      </div>
    </>
  );
};
