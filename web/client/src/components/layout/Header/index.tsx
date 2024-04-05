import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { LoggedMenu } from "./LoggedMenu";
import { NotLoggedMenu } from "./NotLoggedMenu";
import { createServerSideClient } from "@/lib/supabase/client/serverClient";

export async function Header() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  return (
    <div className="fixed z-50 flex h-16 w-screen items-center justify-between border-b border-gray-300 bg-white px-8 shadow-md">
      <Link href="/" className="cursor-pointer">
        <h1 className="text-2xl font-bold">Tech Picks</h1>
      </Link>

      <div className="flex items-center">
        <Link className="mr-8" href="/article/search">
          <CiSearch className="size-8" />
        </Link>
        {user ? <LoggedMenu user={user} /> : <NotLoggedMenu />}
      </div>
    </div>
  );
}
