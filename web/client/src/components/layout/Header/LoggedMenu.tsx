"use client";
import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { AvatarDropdownMenu } from "./DropdownMenu";

type LoggedMenuProps = {
  user?: User;
};
export const LoggedMenu: FC<LoggedMenuProps> = ({ user }: LoggedMenuProps) => {
  return <AvatarDropdownMenu user={user} />;
};
