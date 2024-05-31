"use server";

import { NextResponse } from "next/server";

import { getFeedById } from "@/features/feeds/repository/feed";
import { getUser } from "@/features/users/actions/user";

export const GET = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await getUser();

  const data = await getFeedById({
    id,
    userId: user?.id,
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
      feed: data,
      message: "success",
    },
    {
      status: 200,
    }
  );
};
