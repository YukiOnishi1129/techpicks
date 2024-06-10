import { User } from "@supabase/supabase-js";
import { FC, ReactNode } from "react";

import { getUser } from "@/features/users/actions/user";

import {
  LoggedBottomNavigationMenu,
  NotLoggedBottomNavigationMenu,
} from "../BottomNavigationMenu";
import { Header } from "../Header";
import { MobileHeader } from "../Header/MobileHeader";
import { Sidebar } from "../Sidebar";

type LoggedBaseLayoutProps = {
  user: User;
  children: ReactNode;
};

export const LoggedBaseLayout: FC<LoggedBaseLayoutProps> = async ({
  user,
  children,
}) => {
  return (
    <div className="overflow-hidden">
      <header className="overflow-hidden">
        <div className="hidden md:block">
          <Header user={user} />
        </div>
        <div className="block md:hidden">
          <MobileHeader />
        </div>
      </header>

      <div className="h-12 md:h-16" />
      <main className="md:flex">
        <div className="invisible fixed h-lvh w-[200px] md:visible">
          <Sidebar user={user} />
        </div>
        <div className="invisible mr-[10px] w-[200px] md:visible" />

        <div className="mx-auto w-[90%] md:w-[70%]">{children}</div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-50 block border-t border-gray-200  md:hidden">
        <LoggedBottomNavigationMenu user={user} />
      </footer>
    </div>
  );
};
