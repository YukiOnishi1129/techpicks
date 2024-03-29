"use client";

import Link from "next/link";

export const NotLoggedMenu = () => {
  return (
    <div className="flex">
      <Link href="/login">
        <button>Login</button>
      </Link>
      <button>Signup</button>
    </div>
  );
};
