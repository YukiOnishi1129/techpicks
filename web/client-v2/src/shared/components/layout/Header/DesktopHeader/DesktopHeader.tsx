"use client";
import Link from "next/link";
import { FC } from "react";

import { useUserId } from "@/shared/hooks/useUserId";

import { LoggedMenu } from "./LoggedMenu";
import { NotLoggedMenu } from "./NotLoggedMenu";
import { ScreenLoader } from "../../ScreenLoader";

type DesktopHeaderProps = {};

export const DesktopHeader: FC<
  DesktopHeaderProps
> = ({}: DesktopHeaderProps) => {
  const { userId, loading } = useUserId();
  return (
    <div className="fixed z-50 flex h-16 w-screen items-center justify-between border-b border-gray-300  bg-card px-8 shadow-md">
      <Link href={userId ? "/dashboard/trend" : "/"} className="cursor-pointer">
        <h1 className="text-2xl font-bold">Check Picks</h1>
      </Link>
      <div className="flex items-center justify-end">
        {loading ? (
          <ScreenLoader />
        ) : (
          <>{userId ? <LoggedMenu /> : <NotLoggedMenu />}</>
        )}
      </div>
    </div>
  );
};
