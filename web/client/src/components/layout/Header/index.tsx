import Link from "next/link";
import { getServerSession } from "next-auth/next";

import { LoggedMenu } from "./LoggedMenu";
import { NotLoggedMenu } from "./NotLoggedMenu";

export async function Header() {
  const session = await getServerSession();
  return (
    <div className="fixed flex justify-between px-8 w-screen h-16 items-center bg-white border-b border-gray-300 shadow-md">
      <Link href="/" className="cursor-pointer">
        <h1 className="font-bold text-2xl">Tech Picks</h1>
      </Link>

      <div className="flex">{session ? <LoggedMenu /> : <NotLoggedMenu />}</div>
    </div>
  );
}
