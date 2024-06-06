import { NextRequest, NextResponse } from "next/server";

import { getFeedsCount } from "@/features/feeds/repository/feed";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || undefined;
  const language = searchParams.get("language") || undefined;
  const platformSiteType = searchParams.get("platformSiteType") || undefined;
  const siteUrl = searchParams.get("siteUrl") || undefined;
  const rssUrl = searchParams.get("rssUrl") || undefined;
  const count = await getFeedsCount({
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
    siteUrl: siteUrl,
    rssUrl: rssUrl,
  });
  return NextResponse.json(
    {
      count: count,
      message: "Success",
    },
    {
      status: 200,
    }
  );
}
