import { NextRequest, NextResponse } from "next/server";

import { deleteBookmark } from "@/features/bookmarks/repository/bookmark";
import { getUser } from "@/features/users/actions/user";

export const DELETE = async (
  req: NextRequest,
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

  await deleteBookmark({
    bookmarkId: id,
    userId: user.id,
  });

  return NextResponse.json(
    {
      message: "success",
    },
    {
      status: 204,
    }
  );
};
