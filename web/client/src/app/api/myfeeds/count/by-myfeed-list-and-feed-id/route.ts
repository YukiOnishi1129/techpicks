import { NextRequest, NextResponse } from "next/server";

import { getMyFeedCountByMyFeedListIdAndFeedId } from "@/features/myFeeds/repository/myFeed";
import { getUser } from "@/features/users/actions/user";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const myFeedListId = searchParams.get("myFeedListId");
  const feedId = searchParams.get("feedId");

  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const count = await getMyFeedCountByMyFeedListIdAndFeedId({
    feedId: feedId || "",
    myFeedListId: myFeedListId || "",
    userId: user.id,
  });

  return NextResponse.json(
    { count: count, message: "success" },
    {
      status: 200,
    }
  );
}
