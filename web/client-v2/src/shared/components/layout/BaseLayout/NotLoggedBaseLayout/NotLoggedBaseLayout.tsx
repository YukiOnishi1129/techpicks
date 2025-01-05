import { FC, ReactNode } from "react";

import { NotLoggedBottomNavigationMenu } from "../../BottomNavigationMenu";
import { Header } from "../../Header";

type NotLoggedBaseLayoutProps = {
  children: ReactNode;
};

export const NotLoggedBaseLayout: FC<NotLoggedBaseLayoutProps> = async ({
  children,
}) => {
  return (
    <div>
      <header className="overflow-hidden">
        <Header />
      </header>

      <div className="h-12 md:h-16" />
      <main className="md:flex">
        <div className="mx-auto w-[90%] md:w-[70%]">{children}</div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-50 block border-t border-gray-200  md:hidden">
        <NotLoggedBottomNavigationMenu />
      </footer>
    </div>
  );
};
