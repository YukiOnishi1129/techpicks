"use client";

import { useRouter, usePathname } from "next/navigation";
import { FC, useCallback, useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { NAVIGATION_LISTS } from "@/shared/constant/navigation";

type SelectArticlePageTabProps = {};

export const SelectArticlePageTab: FC<SelectArticlePageTabProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();

  const defaultTabValue = useMemo(() => {
    switch (pathname) {
      case NAVIGATION_LISTS.DASHBOARD_TREND:
        return "0";
      case NAVIGATION_LISTS.DASHBOARD_SITE:
        return "1";
      case NAVIGATION_LISTS.DASHBOARD_COMPANY:
        return "2";
      case NAVIGATION_LISTS.DASHBOARD_SUMMARY:
        return "3";
    }
  }, [pathname]);

  const onMovePage = useCallback(
    (value: string) => {
      switch (value) {
        case "0":
          router.replace("/dashboard/trend");
          break;
        case "1":
          router.replace("/dashboard/site");
          break;
        case "2":
          router.replace("/dashboard/company");
          break;
        case "3":
          router.replace("/dashboard/summary");
          break;
      }
    },
    [router]
  );

  return (
    <Select onValueChange={onMovePage} defaultValue={defaultTabValue}>
      <SelectTrigger className="border-primary bg-secondary">
        <SelectValue placeholder="Tabs" className="text-gray-400" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">
          <span>Trends</span>
        </SelectItem>
        <SelectItem value="1">
          <span>Site</span>
        </SelectItem>
        <SelectItem value="2">
          <span>Company</span>
        </SelectItem>
        <SelectItem value="3">
          <span>Summary</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
