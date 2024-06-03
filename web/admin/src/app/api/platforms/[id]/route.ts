import { NextRequest, NextResponse } from "next/server";

import { getPlatformById } from "@/features/platforms/repository/platform";

import { PlatformType } from "@/types/platform";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const platform = await getPlatformById(id);

  return NextResponse.json(
    {
      platform: platform as PlatformType,
      message: "success" as string,
    },
    {
      status: 200,
    }
  );
}
