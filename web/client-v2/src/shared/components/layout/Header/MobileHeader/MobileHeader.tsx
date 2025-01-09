"use client";

import { usePathname } from "next/navigation";
import { FC, useMemo } from "react";

import { NAVIGATION_LISTS } from "@/shared/constant/navigation";
import { useUserId } from "@/shared/hooks/useUserId";

import { MobileHeaderButton } from "./MobileHeaderButton";
import { MobileSidebarNavigation } from "./MobileSidebarNavigation";

type MobileHeaderProps = {};

export const MobileHeader: FC<MobileHeaderProps> = ({}) => {
  const pathname = usePathname();
  const { userId, loading } = useUserId();

  const pageName = useMemo(() => {
    switch (pathname) {
      case NAVIGATION_LISTS.DASHBOARD_TREND:
        return "Trend";
      case NAVIGATION_LISTS.DASHBOARD_SITE:
        return "Site";
      case NAVIGATION_LISTS.DASHBOARD_COMPANY:
        return "Company";
      case NAVIGATION_LISTS.DASHBOARD_SUMMARY:
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
        if (pathname.includes(NAVIGATION_LISTS.MY_FEED_FOLDER_ARTICLE)) {
          return "My Feed Articles";
        }
        if (
          pathname.includes(NAVIGATION_LISTS.FAVORITE_ARTICLE_FOLDER_ARTICLE)
        ) {
          return "Favorite Articles";
        }
        return "Check Picks";
    }
  }, [pathname]);

  return (
    <div className="fixed z-50 flex h-12 w-screen items-center justify-center border-b border-gray-300  bg-card px-8 shadow-md">
      {userId && (
        <div className="absolute left-3">
          <MobileSidebarNavigation />
        </div>
      )}

      <h1 className="text-2xl font-bold">{pageName}</h1>
      {userId && (
        <div className="absolute right-1 w-14">
          <MobileHeaderButton pathname={pathname} />
        </div>
      )}
    </div>
  );
};
