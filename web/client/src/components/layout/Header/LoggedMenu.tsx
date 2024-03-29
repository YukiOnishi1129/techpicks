"use client";
import { signOut } from "next-auth/react";

export const LoggedMenu = () => {
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};
