import { NextRequest, NextResponse } from "next/server";

import { getPlatforms } from "@/features/platform/repository/platform";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");
  const language = searchParams.get("language") || undefined;
  const platformSiteType = searchParams.get("platformSiteType") || undefined;
  const platforms = await getPlatforms({
    keyword: keyword,
    offset: parseInt(offset || "1"),
    language: language,
    platformSiteType: platformSiteType,
  });
  return NextResponse.json(
    {
      platforms: platforms,
      message: "Success",
    },
    {
      status: 200,
    }
  );
}
