import { FC } from "react";

import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";

type HeaderProps = {};

export const Header: FC<HeaderProps> = ({}) => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
      <div className="block md:hidden">
        <MobileHeader />
      </div>
    </>
  );
};
