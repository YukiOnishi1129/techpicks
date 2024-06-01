"use server";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { Database } from "@/types/database.types";
import { ProfileType } from "@/types/profile";

export const getProfileById = async (id: string) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase.from("profiles").select("*").eq("id", id);

    const { data, error } = await query.single();

    if (error || !data) return;

    return convertDatabaseResponseToProfileResponse(data);
  } catch (err) {
    throw new Error(`Failed to get profile: ${err}`);
  }
};

export const getAdminProfileById = async (id: string) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .eq("is_super_admin", true);

    const { data, error } = await query.single();

    if (error || !data) return;

    return convertDatabaseResponseToProfileResponse(data);
  } catch (err) {
    throw new Error(`Failed to get profile: ${err}`);
  }
};

type ProfileDatabaseResponseType =
  Database["public"]["Tables"]["profiles"]["Row"];

const convertDatabaseResponseToProfileResponse = (
  profile: ProfileDatabaseResponseType
): ProfileType => {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    emailVerifiedAt: profile.email_verified_at || undefined,
    image: profile.image,
    provider: profile.provider || undefined,
    isSuperAdmin: profile.is_super_admin,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
  };
};
