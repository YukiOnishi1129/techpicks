"use server";

import { NextRequest, NextResponse } from "next/server";

import { getMyFeedFolderById } from "@/features/myFeedFolders/repository/myFeedFolder";
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

  const data = await getMyFeedFolderById({
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
      myFeedFolders: data,
      message: "success",
    },
    {
      status: 200,
    }
  );
};
