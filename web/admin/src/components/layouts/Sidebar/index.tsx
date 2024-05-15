import Link from "next/link";
import { DiGoogleCloudPlatform } from "react-icons/di";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDashboard, MdRssFeed, MdCategory } from "react-icons/md";

import { AdminUserType } from "@/types/admin";

type SidebarProps = {
  adminUser: AdminUserType;
};

export const Sidebar = ({ adminUser }: SidebarProps) => {
  return (
    <div className="h-lvh w-full overflow-y-auto border-r-2 pb-12">
      <div className="mb-16 space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="space-y-8 text-xl">
            <Link
              href="/dashboard"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <MdDashboard />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/platform"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <DiGoogleCloudPlatform />
              <span>Platform</span>
            </Link>
            <Link
              href="/feed"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <MdRssFeed />
              <span>Feed</span>
            </Link>

            <Link
              href="/category"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <MdCategory />
              <span>Category</span>
            </Link>

            <Link
              href="/user"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <FaRegUserCircle />
              <span>User</span>
            </Link>
          </div>
        </div>

        <div className="ml-4 mt-8 px-4 py-2 md:hidden">
          {/* <LogoutLink /> */}
        </div>
      </div>
    </div>
  );
};
