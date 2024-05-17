import { NextRequest, NextResponse } from "next/server";

import { getPlatformsCount } from "@/features/platform/repository/platform";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || undefined;
  const language = searchParams.get("language") || undefined;
  const count = await getPlatformsCount({
    keyword: keyword,
    language: language,
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
