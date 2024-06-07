import { NextRequest, NextResponse } from "next/server";

import { getCategoryById } from "@/features/categories/repository/category";

import { CategoryType } from "@/types/category";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const category = await getCategoryById(id);

  return NextResponse.json(
    {
      category: category as CategoryType,
      message: "success" as string,
    },
    {
      status: 200,
    }
  );
}
