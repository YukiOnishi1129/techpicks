"use server";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { LanguageStatus } from "@/types/language";
import { PlatformType, PlatformSiteType } from "@/types/platform";

export type GetPlatformParams = {
  languageStatus?: LanguageStatus;
  platformSiteType?: PlatformSiteType;
  platformIdList?: Array<string>;
};

export const getPlatforms = async ({
  languageStatus,
  platformSiteType,
  platformIdList,
}: GetPlatformParams) => {
  const supabase = await createGetOnlyServerSideClient();

  const query = supabase
    .from("platforms")
    .select(
      `
        *
      `
    )
    .is("deleted_at", null);

  if (languageStatus) {
    query.eq("is_eng", languageStatus === 2);
  }

  if (platformSiteType) {
    query.eq("platform_site_type", platformSiteType);
  }

  if (platformIdList?.length) {
    query.in("id", platformIdList);
  }

  const { data, error } = await query
    .order("platform_site_type", {
      ascending: true,
    })
    .order("created_at", {
      ascending: true,
    });

  if (error || !data) return [];

  const platforms: Array<PlatformType> = data.map((platform) => {
    return {
      id: platform.id,
      name: platform.name,
      siteUrl: platform.site_url,
      faviconUrl: platform.favicon_url,
      platformSiteType: platform.platform_site_type,
      isEng: platform.is_eng,
      createdAt: platform.created_at,
      updatedAt: platform.updated_at,
    };
  });

  return platforms;
};
