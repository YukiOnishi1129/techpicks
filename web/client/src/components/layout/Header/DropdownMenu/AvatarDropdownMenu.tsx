"use client";
import { User } from "@supabase/supabase-js";
import { FC } from "react";
import { FiLogOut } from "react-icons/fi";
import { GrUser } from "react-icons/gr";

import { logout } from "@/features/auth/actions/auth";

import { UserAvatar } from "@/components/ui/avatar/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type AvatarDropdownMenuProps = {
  user?: User;
};

export const AvatarDropdownMenu: FC<AvatarDropdownMenuProps> = ({
  user,
}: AvatarDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="md:flex md:justify-end">
          <UserAvatar user={user} />
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
              // Enter or Space で実行
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
