"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { NAVIGATION_LISTS } from "@/constant/navigation";
import { match } from "assert";

export function MobileHeader() {
  const pathname = usePathname();

  const pageName = useMemo(() => {
    switch (pathname) {
      case NAVIGATION_LISTS.DASHBOARD_TREND || NAVIGATION_LISTS.HOME:
        return "Trend";
      case NAVIGATION_LISTS.DASHBOARD_SITE || NAVIGATION_LISTS.SITE:
        return "Site";
      case NAVIGATION_LISTS.DASHBOARD_COMPANY || NAVIGATION_LISTS.COMPANY:
        return "Company";
      case NAVIGATION_LISTS.DASHBOARD_SUMMARY || NAVIGATION_LISTS.SUMMARY:
        return "Summary";
      case NAVIGATION_LISTS.BOOKMARK:
        return "Bookmark";
      case NAVIGATION_LISTS.ARTICLE_SEARCH:
        return "Search";
      case NAVIGATION_LISTS.ARTICLE_SEARCH_RESULT:
        return "Search Result";
      case NAVIGATION_LISTS.FEED:
        return "Feeds";
      case NAVIGATION_LISTS.MY_FEED_FOLDER:
        return "My Feed Folders";
      case NAVIGATION_LISTS.FAVORITE_ARTICLE_FOLDER:
        return "Favorite Article Folders";
      default:
        if (pathname.includes(NAVIGATION_LISTS.MY_FEED_FOLDER)) {
          return "My Feed Articles";
        }
        if (pathname.includes(NAVIGATION_LISTS.FAVORITE_ARTICLE_FOLDER)) {
          return "Favorite Articles";
        }
        return "Check Picks";
    }
  }, [pathname]);

  return (
    <div className="fixed z-50 flex h-12 w-screen items-center justify-center border-b border-gray-300  px-8 shadow-md bg-card">
      <h1 className="text-2xl font-bold">{pageName}</h1>
      {/* <div className="flex items-center justify-end">
        <div>
          <ModeToggle />
        </div>
      </div> */}
    </div>
  );
}
