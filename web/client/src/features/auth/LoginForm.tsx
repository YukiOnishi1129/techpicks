"use client";

import { Button } from "@/components/ui/button";

import { login } from "./actions/auth";

export const LoginForm = async () => {
  return <Button onClick={() => login()}>Login</Button>;
};
