import { ReactNode } from "react";

import { getUser } from "@/features/users/actions/user";

import {
  LoggedBottomNavigationMenu,
  NotLoggedBottomNavigationMenu,
} from "../BottomNavigationMenu";
import { Header } from "../Header";
import { MobileHeader } from "../Header/MobileHeader";
import { Sidebar } from "../Sidebar";

export const BaseLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();
  return (
    <div className="overflow-hidden">
      <header className="overflow-hidden">
        <div className="hidden md:block">
          <Header user={user} />
        </div>
        <div className="block md:hidden">
          <MobileHeader user={user} />
        </div>
      </header>

      <div className="h-16" />
      <main className="md:flex">
        {user && (
          <>
            <div className="invisible fixed h-lvh w-[200px] md:visible">
              <Sidebar />
            </div>
            <div className="invisible mr-[10px] w-[200px] md:visible" />
          </>
        )}

        <div className="mx-auto w-[90%] md:w-[70%]">{children}</div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-50 block border-t border-gray-200  md:hidden">
        {user ? (
          <LoggedBottomNavigationMenu user={user} />
        ) : (
          <NotLoggedBottomNavigationMenu />
        )}
      </footer>
    </div>
  );
};
