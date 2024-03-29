"use client";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { FC } from "react";

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
