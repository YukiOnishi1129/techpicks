"use client";

import GoogleButton from "react-google-button";

import { loginWithGoogle } from "../actions/auth";

export const LoginForm = async () => {
  return <GoogleButton type="light" onClick={() => loginWithGoogle()} />;
};
