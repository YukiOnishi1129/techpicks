import { ReactNode } from "react";

import { BottomNavigationMenu } from "../BottomNavigationMenu";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-hidden">
      <header className="overflow-hidden">
        <Header />
      </header>

      <div className="h-16" />
      <main className="md:flex">
        <div className="invisible fixed h-lvh w-[200px] md:visible">
          <Sidebar />
        </div>
        <div className="invisible mr-[10px] w-[200px] md:visible" />
        <div className="mx-auto w-[90%] md:w-[70%]">{children}</div>
        <div className="fixed inset-x-0 bottom-0 z-50 block border-t border-gray-200 bg-white md:hidden">
          <BottomNavigationMenu />
        </div>
      </main>
    </div>
  );
};
