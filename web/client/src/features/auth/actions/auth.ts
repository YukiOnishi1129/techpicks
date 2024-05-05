"use server";

import { redirect } from "next/navigation";

import { createServerSideClient } from "@/lib/supabase/client/serverClient";

export async function googleLogin() {
  const supabase = await createServerSideClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.WEB_DOMAIN}/auth/callback`,
    },
  });
  if (error) {
    redirect("/error");
  }

  if (data?.url) redirect(data.url);
}

export async function logout() {
  "use server";
  const supabase = await createServerSideClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }
  if (!error) redirect("/");
}
