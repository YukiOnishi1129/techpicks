"use server";
import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

export const getUser = async () => {
  const supabase = await createGetOnlyServerSideClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user ?? undefined;

  return user;
};
