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
        <div className="invisible fixed h-lvh w-[200px] md:visible">
          <Sidebar />
        </div>
        <div className="invisible mr-[10px] w-[200px] md:visible" />
        <div className="mx-auto w-[90%] md:w-[70%]">{children}</div>
      </main>
    </div>
  );
};
