"use client";
import Link from "next/link";
import { FC } from "react";

import { LoggedMenu } from "./LoggedMenu";
import { NotLoggedMenu } from "./NotLoggedMenu";

type DesktopHeaderProps = {
  userId?: string;
};

export const DesktopHeader: FC<DesktopHeaderProps> = ({
  userId,
}: DesktopHeaderProps) => {
  return (
    <div className="fixed z-50 flex h-16 w-screen items-center justify-between border-b border-gray-300  bg-card px-8 shadow-md">
      <Link href={userId ? "/dashboard/trend" : "/"} className="cursor-pointer">
        <h1 className="text-2xl font-bold">Check Picks</h1>
      </Link>
      <div className="flex items-center justify-end">
        <>{userId ? <LoggedMenu /> : <NotLoggedMenu />}</>
      </div>
    </div>
  );
};
