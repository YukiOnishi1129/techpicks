import { NextRequest, NextResponse } from "next/server";

import { getTrendArticles } from "@/features/trendArticles/repository/trendArticles";

import {
  getCurrentDate,
  getDateEndTime,
  getDateStartTime,
  getDayjsTz,
} from "@/lib/date";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const languageStatus = searchParams.get("languageStatus");
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");
  const platformIdList = searchParams.getAll("platformId");

  const status =
    typeof languageStatus === "string"
      ? (parseInt(languageStatus) as LanguageStatus)
      : 1;
  const tab = searchParams.get("tab") as ArticleTabType;
  const currentDate = getCurrentDate();

  const startTime =
    searchParams.get("startTime") || getDateStartTime(currentDate).format();
  const endTime =
    searchParams.get("endTime") || getDateEndTime(currentDate).format();
  const trendArticles = await getTrendArticles({
    languageStatus: status,
    keyword: keyword,
    platformIdList: platformIdList,
    offset: parseInt(offset || "1"),
    tab: tab,
    startTime: getDayjsTz(startTime).toDate(),
    endTime: getDayjsTz(endTime).toDate(),
  });

  if (trendArticles.length === 0) {
    return NextResponse.json(
      {
        trendArticles: [],
        message: "No trend articles found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      trendArticles: trendArticles,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
