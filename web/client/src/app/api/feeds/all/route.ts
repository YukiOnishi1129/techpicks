"use server";
import { NextResponse } from "next/server";

import { getAllFeed } from "@/features/feeds/repository/feed";

export async function GET() {
  const feeds = await getAllFeed({});

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
