"use server";

import { NextRequest, NextResponse } from "next/server";

import { getFeed } from "@/features/feeds/repository/feed";
import { getUser } from "@/features/users/actions/user";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const offset = searchParams.get("offset");
  const keyword = searchParams.get("keyword") || undefined;
  const user = await getUser();
  const feeds = await getFeed({
    offset: parseInt(offset || "1"),
    keyword: keyword,
    userId: user?.id,
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
