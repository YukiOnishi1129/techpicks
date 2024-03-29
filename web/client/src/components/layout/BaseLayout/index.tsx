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
      <main className="md:flex">
        <div className="invisible md:visible fixed w-[200px] h-lvh">
          <Sidebar />
        </div>
        <div className="invisible md:visible w-[200px] mr-[10px]" />
        <div className="md:w-[70%] w-[90%] mx-auto">{children}</div>
      </main>
    </div>
  );
};
