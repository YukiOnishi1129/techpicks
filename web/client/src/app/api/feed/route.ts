"use server";

import { NextRequest, NextResponse } from "next/server";

import { getFeed } from "@/features/feed/repository/feed";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const offset = searchParams.get("offset");
  const feeds = await getFeed({
    offset: parseInt(offset || "1"),
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
