import { User } from "@supabase/supabase-js";
import { FC, ReactNode, Suspense } from "react";

import { Header } from "@/components/layout/Header";

import { PreloadQuery } from "@/lib/apollo/client";

import { LoggedBaseLayoutQuery } from "./LoggedBaseLayoutQuery";
import { LoggedBottomNavigationMenu } from "../../BottomNavigationMenu";
import { ScreenLoader } from "../../ScreenLoader";
import { DesktopSidebar } from "../../Sidebar";

type LoggedBaseLayoutProps = {
  user: User;
  children: ReactNode;
};

export const LoggedBaseLayout: FC<LoggedBaseLayoutProps> = async ({
  user,
  children,
}) => {
  return (
    <div>
      <header className="overflow-hidden">
        <Header user={user} />
      </header>

      <div className="h-12 md:h-16" />
      <main className="md:flex">
        <div className="invisible fixed h-lvh w-[200px] md:visible">
          <PreloadQuery
            query={LoggedBaseLayoutQuery}
            variables={{
              input: {
                isAllFetch: true,
                isFolderOnly: true,
              },
              myFeedFoldersInput: {
                isAllFetch: true,
              },
            }}
          >
            <Suspense fallback={<ScreenLoader />}>
              <DesktopSidebar />
            </Suspense>
          </PreloadQuery>
        </div>
        <div className="invisible mr-[10px] w-[200px] md:visible" />

        <div className="mx-auto w-[90%] md:w-[70%]">{children}</div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-50 block border-t border-gray-200  md:hidden">
        <LoggedBottomNavigationMenu />
      </footer>
    </div>
  );
};
