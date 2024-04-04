import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { CiSearch } from "react-icons/ci";

import { authOptions } from "@/lib/auth";

import { LoggedMenu } from "./LoggedMenu";
import { NotLoggedMenu } from "./NotLoggedMenu";

export async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed z-50 flex h-16 w-screen items-center justify-between border-b border-gray-300 bg-white px-8 shadow-md">
      <Link href="/" className="cursor-pointer">
        <h1 className="text-2xl font-bold">Tech Picks</h1>
      </Link>

      <div className="flex items-center">
        <Link className="mr-8" href="/article/search">
          <CiSearch className="size-8" />
        </Link>
        {session ? <LoggedMenu session={session} /> : <NotLoggedMenu />}
      </div>
    </div>
  );
}
