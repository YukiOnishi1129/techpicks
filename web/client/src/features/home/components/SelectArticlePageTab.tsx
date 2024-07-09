"use client";

import { useRouter, usePathname } from "next/navigation";
import { FC, useCallback, useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { NAVIGATION_LISTS } from "@/constant/navigation";

type SelectArticlePageTabProps = {
  userId?: string;
};

export const SelectArticlePageTab: FC<SelectArticlePageTabProps> = ({
  userId,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const defaultTabValue = useMemo(() => {
    switch (pathname) {
      case NAVIGATION_LISTS.DASHBOARD_TREND || NAVIGATION_LISTS.HOME:
        return "0";
      case NAVIGATION_LISTS.DASHBOARD_SITE || NAVIGATION_LISTS.SITE:
        return "1";
      case NAVIGATION_LISTS.DASHBOARD_COMPANY || NAVIGATION_LISTS.COMPANY:
        return "2";
      case NAVIGATION_LISTS.DASHBOARD_SUMMARY || NAVIGATION_LISTS.SUMMARY:
        return "3";
    }
  }, []);

  const onMovePage = useCallback((value: string) => {
    switch (value) {
      case "0":
        if (userId) {
          router.replace("/dashboard/trend");
          break;
        }
        router.replace("/");
        break;
      case "1":
        if (userId) {
          router.replace("/dashboard/site");
          break;
        }
        router.replace("/site");
        break;
      case "2":
        if (userId) {
          router.replace("/dashboard/company");
          break;
        }
        router.replace("/company");
        break;
      case "3":
        if (userId) {
          router.replace("/dashboard/summary");
          break;
        }
        router.replace("/summary");
        break;
    }
  }, []);

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
