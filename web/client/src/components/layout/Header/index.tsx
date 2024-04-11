import Link from "next/link";

import { getUser } from "@/features/users/actions/user";

import { LoggedMenu } from "./LoggedMenu";
import { NotLoggedMenu } from "./NotLoggedMenu";

export async function Header() {
  const user = await getUser();

  return (
    <div className="fixed z-50 flex h-16 w-screen items-center justify-between border-b border-gray-300 bg-white px-8 shadow-md">
      <Link href="/" className="cursor-pointer">
        <h1 className="text-2xl font-bold">Tech Picks</h1>
      </Link>
      <div className="flex items-center">
        {user ? <LoggedMenu user={user} /> : <NotLoggedMenu />}
      </div>
    </div>
  );
}
