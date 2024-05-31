"use server";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

export const getProfile = async (id: string) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase.from("profiles").select("*").eq("id", id);

    const { data, error } = await query.single();

    if (error || !data) return;
    return data;
  } catch (err) {
    throw new Error(`Failed to get profile: ${err}`);
  }
};
