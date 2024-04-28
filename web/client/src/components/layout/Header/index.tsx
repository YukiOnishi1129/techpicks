import Link from "next/link";

import { getUser } from "@/features/users/actions/user";

import { ModeToggle } from "./DropdownMenu";
import { LoggedMenu } from "./LoggedMenu";
import { NotLoggedMenu } from "./NotLoggedMenu";

export async function Header() {
  const user = await getUser();

  return (
    <div className="fixed z-50 flex h-16 w-screen items-center justify-between border-b border-gray-300  px-8 shadow-md">
      <Link href="/" className="cursor-pointer">
        <h1 className="text-2xl font-bold">Tech Picks</h1>
      </Link>
      <div className="flex items-center justify-end">
        <div className="mr-4">
          <ModeToggle />
        </div>
        {user ? <LoggedMenu user={user} /> : <NotLoggedMenu />}
      </div>
    </div>
  );
}
