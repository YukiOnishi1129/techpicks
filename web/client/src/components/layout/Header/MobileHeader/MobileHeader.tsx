"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { NAVIGATION_LISTS } from "@/constant/navigation";

export function MobileHeader() {
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
        return "Check Picks";
    }
  }, [pathname]);

  return (
    <div className="fixed z-50 flex h-12 w-screen items-center justify-between border-b border-gray-300  px-8 shadow-md">
      <h1 className="text-2xl font-bold ">{pageName}</h1>
      {/* <div className="flex items-center justify-end">
        <div>
          <ModeToggle />
        </div>
      </div> */}
    </div>
  );
}
