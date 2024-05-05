"use client";

import GoogleButton from "react-google-button";

import { googleLogin } from "../actions/auth";

export const LoginForm = async () => {
  return <GoogleButton type="light" onClick={() => googleLogin()} />;
};
