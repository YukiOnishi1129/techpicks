"use client";

import { FC, useCallback, useEffect, useState } from "react";

import { getUser } from "@/features/auth/actions/user";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar/avatar";

type UserAvatarProps = {};

export const UserAvatar: FC<UserAvatarProps> = ({}) => {
  const [image, setImage] = useState("no_image.png");
  const [userName, setUserName] = useState("");

  const fetchUser = useCallback(async () => {
    const user = await getUser();
    setImage(user?.user_metadata["avatar_url"] || "no_image.png");
    setUserName(user?.user_metadata["full_name"] || "");
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Avatar>
      <AvatarImage src={image} alt="avatar" />
      <AvatarFallback>{userName}</AvatarFallback>
    </Avatar>
  );
};
