"use client";

import { FC } from "react";

import { logout } from "@/features/auth/actions/auth";

import { Button } from "@/components/ui/button";

export const LogoutButton: FC = () => {
  return (
    <Button variant={"secondary"} onClick={() => logout()}>
      {"Logout"}
    </Button>
  );
};
