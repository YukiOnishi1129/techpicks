import { NextRequest, NextResponse } from "next/server";

import { getCategories } from "@/features/categories/repository/category";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");
  const categories = await getCategories({
    keyword: keyword,
    offset: parseInt(offset || "1"),
  });
  return NextResponse.json(
    {
      categories: categories,
      message: "Success",
    },
    {
      status: 200,
    }
  );
}
