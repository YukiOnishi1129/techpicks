"use server";

import { NextRequest, NextResponse } from "next/server";

import { getMyFeedListById } from "@/features/myFeedList/repository/myFeedList";
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
        message: "unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const data = await getMyFeedListById({
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
      myFeedList: data,
      message: "success",
    },
    {
      status: 200,
    }
  );
};
