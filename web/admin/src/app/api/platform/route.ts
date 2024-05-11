import { NextRequest, NextResponse } from "next/server";

import { getPlatforms } from "@/features/platform/repository/platform";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");
  const platforms = await getPlatforms({
    keyword: keyword,
    offset: parseInt(offset || "1"),
  });
  return NextResponse.json(
    {
      platforms: platforms,
      message: "Hello from the API",
    },
    {
      status: 200,
    }
  );
}
