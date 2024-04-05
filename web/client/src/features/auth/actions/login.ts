"use server";

import { redirect } from "next/navigation";

import { createServerSideClient } from "@/lib/supabase/client/serverClient";

export async function login() {
  const supabase = await createServerSideClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "/auth/callback'",
    },
  });
  if (error) {
    redirect("/error");
  }

  if (data?.url) redirect(data.url);

  redirect("/");
}
