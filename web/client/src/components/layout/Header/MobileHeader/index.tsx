"use client";
import { User } from "@supabase/supabase-js";
import { usePathname, useSearchParams } from "next/navigation";

import { ModeToggle } from "../DropdownMenu";

type MobileHeaderProps = {
  user?: User;
};

export async function MobileHeader({ user }: MobileHeaderProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div className="fixed z-50 flex h-16 w-screen items-center justify-between border-b border-gray-300  px-8 shadow-md">
      <div></div>
      <h1 className="text-2xl font-bold ">Today</h1>
      <div className="flex items-center justify-end">
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
