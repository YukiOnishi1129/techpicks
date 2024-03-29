import { ReactNode } from "react";

import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-hidden">
      <header className="overflow-hidden">
        <Header />
      </header>

      <div className="h-16" />
      <main className="flex">
        <div className="fixed w-[200px] h-lvh">
          <Sidebar />
        </div>
        <div className="w-[200px] mr-[10px]" />
        <div className="w-full mx-auto">{children}</div>
      </main>
    </div>
  );
};
