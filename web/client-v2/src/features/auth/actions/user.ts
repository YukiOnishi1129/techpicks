"use server";
import { createGetOnlyServerSideClient } from "@/shared/lib/supabase/client/serverClient";

export const getUser = async () => {
  const supabase = await createGetOnlyServerSideClient();
  const { data } = await supabase.auth.getUser();

  const user = data?.user ?? undefined;

  return user;
};
