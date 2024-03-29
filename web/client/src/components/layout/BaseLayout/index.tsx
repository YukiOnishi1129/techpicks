import { ReactNode } from "react";

import { Header } from "../Header";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="h-16"></div>
      <main className="">{children}</main>
    </div>
  );
};
