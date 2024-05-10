import { NextRequest, NextResponse } from "next/server";

import { getPlatforms } from "@/features/platform/repository/platform";

export async function GET(req: NextRequest) {
  const platforms = await getPlatforms();
  return NextResponse.json(
    {
      platforms: platforms,
      message: "Hello from the API",
    },
    {
      status: 200,
    }
  );
}
