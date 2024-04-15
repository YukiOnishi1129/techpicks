import { NextRequest, NextResponse } from "next/server";

import { getBookmarkCountById } from "@/features/bookmarks/repository/bookmark";
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

  const count = await getBookmarkCountById({
    bookmarkId: id,
    userId: user.id,
  });

  return NextResponse.json(
    {
      count: count,
      message: "success",
    },
    {
      status: 200,
    }
  );
};
