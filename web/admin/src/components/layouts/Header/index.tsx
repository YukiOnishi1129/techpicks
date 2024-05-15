import { FC } from "react";

import { AdminUserType } from "@/types/admin";

import { LogoutButton } from "./LogoutButton";

export type HeaderType = {
  adminUser: AdminUserType;
};

export const Header: FC<HeaderType> = ({ adminUser: AdminUserType }) => {
  return (
    <div className="flex size-full items-center justify-between px-4 shadow-md">
      <h1 className="text-2xl font-bold">Admin | Check Picks</h1>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};
