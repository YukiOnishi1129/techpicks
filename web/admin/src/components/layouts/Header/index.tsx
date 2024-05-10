import { FC } from "react";

import { AdminUserType } from "@/types/admin";

import { LogoutButton } from "./LogoutButton";

export type HeaderType = {
  adminUser: AdminUserType;
};

export const Header: FC<HeaderType> = ({ adminUser: AdminUserType }) => {
  return (
    <div className="flex size-full items-center justify-between px-4 shadow-md">
      <h1>{"Admin"}</h1>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};
