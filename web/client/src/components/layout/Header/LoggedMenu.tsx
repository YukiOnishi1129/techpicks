"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { FC } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type LoggedMenuProps = {
  session: Session | null;
};

export const LoggedMenu: FC<LoggedMenuProps> = ({
  session,
}: LoggedMenuProps) => {
  const image = session?.user?.image || "no_image.png";
  return (
    <div className="grid grid-cols-2">
      <Avatar>
        <AvatarImage src={image} alt="avatar" />
        <AvatarFallback>{session?.user?.name}</AvatarFallback>
      </Avatar>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};
