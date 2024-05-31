"use server";
import { NextRequest, NextResponse } from "next/server";

import { getAllFeed } from "@/features/feeds/repository/feed";
import { getUser } from "@/features/users/actions/user";

export async function GET(req: NextRequest) {
  const user = await getUser();
  const feeds = await getAllFeed({
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
      message: `success:${req.url}`,
    },
    {
      status: 200,
    }
  );
}
