import { NextRequest, NextResponse } from "next/server";

import { getArticleById } from "@/features/articles/repository/article";
import { getUser } from "@/features/users/actions/user";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await getUser();

  const article = await getArticleById({
    id,
    userId: user?.id,
  });

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
