import { User } from "@supabase/supabase-js";
import { FC } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";

type UserAvatarProps = {
  user?: User;
};

export const UserAvatar: FC<UserAvatarProps> = ({ user }: UserAvatarProps) => {
  const image = user?.user_metadata["avatar_url"] || "no_image.png";
  return (
    <Avatar>
      <AvatarImage src={image} alt="avatar" />
      <AvatarFallback>{user?.user_metadata["full_name"] || ""}</AvatarFallback>
    </Avatar>
  );
};
