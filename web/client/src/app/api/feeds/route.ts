"use server";

import { NextRequest, NextResponse } from "next/server";

import { getFeed } from "@/features/feeds/repository/feed";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const offset = searchParams.get("offset");
  const keyword = searchParams.get("keyword") || undefined;
  const feeds = await getFeed({
    offset: parseInt(offset || "1"),
    keyword: keyword,
  });

  if (!feeds) {
    return NextResponse.json(
      {
        message: "Failed to get feed",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    {
      feeds: feeds,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
