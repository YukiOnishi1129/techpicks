"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const LoginForm = () => {
  return (
    <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
      Login
    </Button>
  );
};
