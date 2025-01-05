"use client";
import { FC } from "react";
import { FiLogOut } from "react-icons/fi";

import { logout } from "@/features/auth/actions/auth";

import { Button } from "@/shared/components/ui/button";

export const LogoutLink: FC = () => {
  return (
    <Button variant={"ghost"} onClick={() => logout()}>
      <FiLogOut />
      <span className="pl-2">Logout</span>
    </Button>
  );
};
