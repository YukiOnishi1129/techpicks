import { NextRequest, NextResponse } from "next/server";

import { getPrivateArticlesById } from "@/features/articles/repository/article";
import { getUser } from "@/features/users/actions/user";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

  const article = await getPrivateArticlesById(id);

  return NextResponse.json(
    {
      article: article,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
