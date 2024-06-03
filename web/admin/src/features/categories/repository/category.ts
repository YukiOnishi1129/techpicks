"use server";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

export type GetCategoriesDT0 = {
  offset?: number;
  keyword?: string;
};

export const getCategories = async ({
  offset = 1,
  keyword,
}: GetCategoriesDT0) => {
  const limit = 8;

  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase.from("categories").select();

    if (keyword) {
      query.like("name", `%${keyword}%`);
    }

    const { data, error } = await query
      .order("type", {
        ascending: true,
      })
      .order("name", {
        ascending: true,
      })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return data.map((category) => {
      return {
        id: category.id,
        name: category.name,
        type: category.type,
        createdAt: category.created_at,
        updatedAt: category.updated_at,
        deletedAt: category.deleted_at,
      };
    });
  } catch (error) {
    throw error;
  }
};
