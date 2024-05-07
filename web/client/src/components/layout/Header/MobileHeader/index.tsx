"use client";
import { User } from "@supabase/supabase-js";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { NAVIGATION_LISTS } from "@/constant/navigation";

import { ModeToggle } from "../DropdownMenu";

type MobileHeaderProps = {
  user?: User;
};

export function MobileHeader({ user }: MobileHeaderProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageName = useMemo(() => {
    switch (pathname) {
      case NAVIGATION_LISTS.BOOKMARK:
        return "Bookmark";
      case NAVIGATION_LISTS.HOME:
        return "Today";
      case NAVIGATION_LISTS.ARTICLE_SEARCH:
        return "Search";
      case NAVIGATION_LISTS.ARTICLE_SEARCH_RESULT:
        return "Search Result";
      case NAVIGATION_LISTS.FEED:
        return "Feed List";
      default:
        return "Geek Picks";
    }
  }, [pathname]);

  return (
    <div className="fixed z-50 flex h-12 w-screen items-center justify-between border-b border-gray-300  px-8 shadow-md">
      <div></div>
      <h1 className="text-2xl font-bold ">{pageName}</h1>
      <div className="flex items-center justify-end">
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
