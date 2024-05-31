"use server";

import { NextRequest, NextResponse } from "next/server";

import { getMyFeedById } from "@/features/myFeeds/repository/myFeed";
import { getUser } from "@/features/users/actions/user";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
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

  const data = await getMyFeedById({
    id: id,
    userId: user.id,
  });
  if (!data) {
    return NextResponse.json(
      {
        message: "not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      myFeed: data,
      message: "success",
    },
    {
      status: 200,
    }
  );
};
