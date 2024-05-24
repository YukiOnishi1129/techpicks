"use server";

import { redirect } from "next/navigation";

import { createServerSideClient } from "@/lib/supabase/client/serverClient";

export async function loginWithGoogle() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.WEB_DOMAIN}/auth/callback`,
    },
  });
  console.log("🧚 login data", data);
  if (error) {
    redirect("/error");
  }
  console.log("🧚 login after data", data);
  console.log("🧚 login after data url", data.url);
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
