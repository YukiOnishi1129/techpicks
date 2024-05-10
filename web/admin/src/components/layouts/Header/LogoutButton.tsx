"use client";

import { FC } from "react";

import { logout } from "@/features/auth/actions/auth";

import { Button } from "@/components/ui/button";

export const LogoutButton: FC = () => {
  return <Button onClick={() => logout()}>{"ログアウト"}</Button>;
};
