import { NextRequest, NextResponse } from "next/server";

import { getFeedById } from "@/features/feeds/repository/feed";

import { FeedType } from "@/types/feed";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const feed = await getFeedById(id);

  if (!feed) {
    return NextResponse.json(
      {
        message: "Feed not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      feed: feed as FeedType,
      message: "success" as string,
    },
    {
      status: 200,
    }
  );
}
