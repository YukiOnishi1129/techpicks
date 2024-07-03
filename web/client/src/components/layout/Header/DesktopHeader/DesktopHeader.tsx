"use client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC } from "react";

import { LoggedMenu } from "./LoggedMenu";
import { NotLoggedMenu } from "./NotLoggedMenu";
import { ModeToggle } from "../DropdownMenu";

type DesktopHeaderProps = {
  user?: User;
};

export const DesktopHeader: FC<DesktopHeaderProps> = async ({
  user,
}: DesktopHeaderProps) => {
  return (
    <div className="fixed z-50 flex h-16 w-screen items-center justify-between border-b border-gray-300  bg-card px-8 shadow-md">
      <Link href={user ? "/dashboard/trend" : "/"} className="cursor-pointer">
        <h1 className="text-2xl font-bold">Check Picks</h1>
      </Link>
      <div className="flex items-center justify-end">
        {/* <div className="mr-4">
          <ModeToggle />
        </div> */}
        {user ? <LoggedMenu user={user} /> : <NotLoggedMenu />}
      </div>
    </div>
  );
};
