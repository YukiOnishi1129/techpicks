"use server";

import { NextRequest, NextResponse } from "next/server";

import { getFeedById } from "@/features/feeds/repository/feed";

export const GET = async (
  res: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const data = await getFeedById(id);

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
