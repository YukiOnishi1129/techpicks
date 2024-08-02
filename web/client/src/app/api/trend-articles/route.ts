import { NextRequest, NextResponse } from "next/server";

import { getTrendArticles } from "@/features/trendArticles/repository/trendArticles";
import { getUser } from "@/features/users/actions/user";

import { get6HoursAgoDate, getCurrentDate } from "@/lib/date";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

export async function GET(req: NextRequest) {
  const user = await getUser();
  const searchParams = req.nextUrl.searchParams;
  const languageStatus = searchParams.get("languageStatus");
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");
  const feedIdList = searchParams.getAll("feedId");

  const status =
    typeof languageStatus === "string"
      ? (parseInt(languageStatus) as LanguageStatus)
      : 1;
  const tab = searchParams.get("tab") as ArticleTabType;
  const currentDate = getCurrentDate();

  const startTime =
    searchParams.get("startTime") || get6HoursAgoDate().format();

  const endTime = searchParams.get("endTime") || currentDate.format();
  const trendArticles = await getTrendArticles({
    userId: user?.id,
    languageStatus: status,
    keyword: keyword,
    feedIdList: feedIdList,
    offset: parseInt(offset || "1"),
    tab: tab,
    startTime: startTime,
    endTime: endTime,
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
