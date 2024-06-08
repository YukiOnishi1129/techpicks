import { NextRequest, NextResponse } from "next/server";

import { getPlatformsCount } from "@/features/platforms/repository/platform";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || undefined;
  const language = searchParams.get("language") || undefined;
  const platformSiteType = searchParams.get("platformSiteType") || undefined;
  const siteUrl = searchParams.get("siteUrl") || undefined;
  const status = searchParams.get("status") || undefined;
  const count = await getPlatformsCount({
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
    siteUrl: siteUrl,
    status: status,
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
