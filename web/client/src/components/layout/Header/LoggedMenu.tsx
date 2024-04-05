"use client";
import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { logout } from "@/features/auth/actions/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type LoggedMenuProps = {
  user: User | null;
};
export const LoggedMenu: FC<LoggedMenuProps> = ({ user }: LoggedMenuProps) => {
  const image = user?.user_metadata["avatar_url"] || "no_image.png";
  // console.log("🔥🔥🔥🔥🔥🔥🔥");
  // console.log(user);

  return (
    <div className="grid grid-cols-2">
      <Avatar>
        <AvatarImage src={image} alt="avatar" />
        <AvatarFallback>
          {user?.user_metadata["full_name"] || ""}
        </AvatarFallback>
      </Avatar>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
};
