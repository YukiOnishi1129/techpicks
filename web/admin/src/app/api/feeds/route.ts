import { NextRequest, NextResponse } from "next/server";

import { getFeeds } from "@/features/feeds/repository/feed";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");
  const language = searchParams.get("language") || undefined;
  const platformSiteType = searchParams.get("platformSiteType") || undefined;
  const platformId = searchParams.get("platformId") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;
  const trendPlatformType = searchParams.get("trendPlatformType") || undefined;

  const feeds = await getFeeds({
    keyword: keyword,
    offset: parseInt(offset || "1"),
    language: language,
    platformSiteType: platformSiteType,
    platformId: platformId,
    categoryId: categoryId,
    trendPlatformType: trendPlatformType,
  });
  return NextResponse.json(
    {
      feeds: feeds,
      message: "Success",
    },
    {
      status: 200,
    }
  );
}
