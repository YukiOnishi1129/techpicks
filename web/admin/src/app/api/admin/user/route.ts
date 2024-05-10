import { NextRequest, NextResponse } from "next/server";

import { getAdminUser } from "@/features/admin/usecase/admin";

export async function GET(req: NextRequest) {
  const adminUser = await getAdminUser();

  if (!adminUser) {
    return NextResponse.json(
      {
        message: "No admin user found",
      },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json(
    {
      adminUser: adminUser,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
