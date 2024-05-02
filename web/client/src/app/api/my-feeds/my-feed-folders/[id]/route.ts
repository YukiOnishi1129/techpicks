"use server";

import { NextRequest, NextResponse } from "next/server";

import { getMyFeedsByMyFeedFolderId } from "@/features/myFeeds/repository/myFeed";
import { getUser } from "@/features/users/actions/user";

export const GET = async (
  res: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      {
        myFeeds: [],
        message: "unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const data = await getMyFeedsByMyFeedFolderId({
    myFeedFolderId: id,
    userId: user.id,
  });
  if (!data) {
    return NextResponse.json(
      {
        myFeeds: [],
        message: "not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      myFeeds: data,
      message: "success",
    },
    {
      status: 200,
    }
  );
};
