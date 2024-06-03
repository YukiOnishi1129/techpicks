"use server";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { CategoryType } from "@/types/category";
import { Database } from "@/types/database.types";

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
    const query = supabase.from("categories").select(
      `
        *,
        feeds(*,platforms!inner(*))
        `
    );

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

    if (error || !data) return [];

    return data.map((category) =>
      convertDatabaseResponseToCategoryResponse(category)
    );
  } catch (error) {}
};

export const getCategoryById = async (id: string) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { data, error } = await supabase
      .from("categories")
      .select(
        `
        *,
        feeds(*,platforms!inner(*))
        `
      )
      .eq("id", id)
      .single();

    if (error || !data) return;

    return convertDatabaseResponseToCategoryResponse(data);
  } catch (error) {
    throw error;
  }
};

type CategoryGetDatabaseResponseTypes =
  Database["public"]["Tables"]["categories"]["Row"] & {
    feeds: Array<
      Database["public"]["Tables"]["feeds"]["Row"] & {
        platforms: Database["public"]["Tables"]["platforms"]["Row"];
      }
    >;
  };

const convertDatabaseResponseToCategoryResponse = (
  category: CategoryGetDatabaseResponseTypes
): CategoryType => {
  return {
    id: category.id,
    name: category.name,
    type: category.type,
    createdAt: category.created_at,
    updatedAt: category.updated_at,
    deletedAt: category.deleted_at || undefined,
    feeds: category.feeds.map((feed) => {
      return {
        id: feed.id,
        platformId: feed.platform_id,
        categoryId: feed.category_id,
        name: feed.name,
        description: feed.description,
        rssUrl: feed.rss_url,
        siteUrl: feed.site_url,
        thumbnailUrl: feed.thumbnail_url,
        trendPlatformType: feed.trend_platform_type,
        apiQueryParam: feed.api_query_param || undefined,
        createdAt: feed.created_at,
        updatedAt: feed.updated_at,
        deletedAt: feed.deleted_at || undefined,
        platform: {
          id: feed.platforms.id,
          name: feed.platforms.name,
          siteUrl: feed.platforms.site_url,
          platformSiteType: feed.platforms.platform_site_type,
          faviconUrl: feed.platforms.favicon_url,
          isEng: feed.platforms.is_eng,
          createdAt: feed.platforms.created_at,
          updatedAt: feed.platforms.updated_at,
          deletedAt: feed.platforms.deleted_at || undefined,
        },
      };
    }),
  };
};
