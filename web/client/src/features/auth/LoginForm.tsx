"use client";

import { Button } from "@/components/ui/button";

import { login } from "./actions/login";

export const LoginForm = async () => {
  // const supabase = createBrowserSideClient();

  // const login = async () => {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: `http://localhost:80/auth/callback`,
  //     },
  //   });
  //   if (error) {
  //     console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥");
  //     console.log(data, error);
  //   }
  // };

  return <Button onClick={() => login()}>Login</Button>;
};
