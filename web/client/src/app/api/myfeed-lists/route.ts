"use server";
import { NextRequest, NextResponse } from "next/server";

import { getMyFeedList } from "@/features/myFeedLists/repository/myFeedList";
import { getUser } from "@/features/users/actions/user";

export async function GET(req: NextRequest) {
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

  const myFeedLists = await getMyFeedList({
    userId: user.id,
  });

  return NextResponse.json(
    {
      myFeedLists: myFeedLists,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
