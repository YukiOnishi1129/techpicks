import { User } from "@supabase/supabase-js";
import { FC } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { Sidebar } from "@/components/layout/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type MobileSidebarNavigationProps = {
  user: User;
};

export const MobileSidebarNavigation: FC<MobileSidebarNavigationProps> = ({
  user,
}: MobileSidebarNavigationProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HiOutlineMenuAlt2 className="mt-2" size={36} />
      </SheetTrigger>

      <SheetContent side={"left"}>
        <Sidebar user={user} />
      </SheetContent>
    </Sheet>
  );
};
