"use server";

import { NextRequest, NextResponse } from "next/server";

import { getFeed } from "@/features/feed/repository/feed";

export async function GET(req: NextRequest) {
  const feeds = await getFeed();

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
