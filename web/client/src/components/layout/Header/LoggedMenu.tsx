"use client";
import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { AvatarDropdownMenu, ModeToggle } from "./DropdownMenu";

type LoggedMenuProps = {
  user: User | null;
};
export const LoggedMenu: FC<LoggedMenuProps> = ({ user }: LoggedMenuProps) => {
  return (
    <div className="flex items-center space-x-4">
      <ModeToggle />
      <AvatarDropdownMenu user={user} />
    </div>
  );
};
