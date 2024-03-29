"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export const NotLoggedMenu = () => {
  return (
    <div className="flex">
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Button>Signup</Button>
    </div>
  );
};
