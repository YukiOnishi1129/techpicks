"use client";
import { Button } from "@mantine/core";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  return (
    <Button
      variant="default"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Login
    </Button>
  );
};
