"use client";
import { FC } from "react";
import { FiLogOut } from "react-icons/fi";
import { GrUser } from "react-icons/gr";

import { logout } from "@/features/auth/actions/auth";

import { UserAvatar } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";

type AvatarDropdownMenuProps = {};

export const AvatarDropdownMenu: FC<AvatarDropdownMenuProps> = ({}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="md:flex md:justify-end">
          <UserAvatar />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[100px]">
        <DropdownMenuItem className="cursor-pointer">
          <GrUser />
          <span className="pl-2">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          role="button"
          tabIndex={1}
          onClick={() => logout()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              logout();
            }
          }}
        >
          <FiLogOut />
          <span className="pl-2">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
