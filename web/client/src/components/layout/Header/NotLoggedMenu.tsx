"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export const NotLoggedMenu = () => {
  return (
    <div className="grid grid-cols-2">
      <Link href="/login">
        <Button variant={"ghost"}>Login</Button>
      </Link>
      <Button variant={"destructive"}>Signup</Button>
    </div>
  );
};
