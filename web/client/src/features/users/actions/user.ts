"use server";
import { createServerSideClient } from "@/lib/supabase/client/serverClient";

export const getUser = async () => {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  return user;
};
