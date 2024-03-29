"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const LoggedMenu = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};
