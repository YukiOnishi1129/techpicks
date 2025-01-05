"use client";

import GoogleButton from "react-google-button";

import { loginWithGoogle } from "@/features/auth/actions/auth";

export const LoginForm = () => {
  return <GoogleButton type="light" onClick={() => loginWithGoogle()} />;
};
