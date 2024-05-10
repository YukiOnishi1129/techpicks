import Link from "next/link";
import { MdCalendarToday } from "react-icons/md";

import { AdminUserType } from "@/types/admin";

type SidebarProps = {
  adminUser: AdminUserType;
};

export const Sidebar = ({ adminUser }: SidebarProps) => {
  return (
    <div className="h-lvh w-full overflow-y-auto border-r-2 pb-12">
      <div className="mb-16 space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Main
          </h2>
          <div className="space-y-2">
            <div className="flex cursor-pointer items-center space-x-2 rounded-md px-2 hover:bg-secondary">
              <MdCalendarToday />
              <Link href="/dashboard">Dashboard</Link>
            </div>
            <div className="flex cursor-pointer items-center space-x-2 rounded-md px-2 hover:bg-secondary">
              <MdCalendarToday />
              <Link href="/platform">Platform</Link>
            </div>
            <div className="flex cursor-pointer items-center space-x-2 rounded-md px-2 hover:bg-secondary">
              <MdCalendarToday />
              <Link href="/feed">Feed</Link>
            </div>
            <div className="flex cursor-pointer items-center space-x-2 rounded-md px-2 hover:bg-secondary">
              <MdCalendarToday />
              <Link href="/category">Category</Link>
            </div>
            <div className="flex cursor-pointer items-center space-x-2 rounded-md px-2 hover:bg-secondary">
              <MdCalendarToday />
              <Link href="/user">User</Link>
            </div>
          </div>
        </div>

        <div className="ml-4 mt-8 px-4 py-2 md:hidden">
          {/* <LogoutLink /> */}
        </div>
      </div>
    </div>
  );
};
