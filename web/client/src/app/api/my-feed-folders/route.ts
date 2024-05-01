"use server";
import { NextRequest, NextResponse } from "next/server";

import { getMyFeedFolders } from "@/features/myFeedFolders/repository/myFeedFolder";
import { getUser } from "@/features/users/actions/user";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const offset = searchParams.get("offset");
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

  const myFeedFolders = await getMyFeedFolders({
    userId: user.id,
    offset: parseInt(offset || "1"),
  });

  if (!myFeedFolders) {
    return NextResponse.json(
      {
        data: [],
        message: "not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      myFeedFolders: myFeedFolders,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
