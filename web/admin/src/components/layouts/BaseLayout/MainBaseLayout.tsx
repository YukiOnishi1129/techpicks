import { FC } from "react";

import { Sidebar } from "@/components/layouts/Sidebar";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { AdminUserType } from "@/types/admin";

import { Header } from "../Header";

export type MainBaseLayoutProps = {
  children: React.ReactNode;
  adminUser: AdminUserType;
};

export const MainBaseLayout: FC<MainBaseLayoutProps> = async ({
  children,
  adminUser,
}) => {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="size-full rounded-lg border"
    >
      <ResizablePanel
        defaultSize={10}
        className="fixed top-0 z-10 h-[60px] w-full border-b-2 border-gray-800 bg-card"
      >
        <div className="flex h-full items-center">
          <Header adminUser={adminUser} />
        </div>
      </ResizablePanel>
      {/* dummy header */}
      <div className="h-[60px] w-full" />
      {/* <ResizableHandle /> */}
      <ResizablePanel defaultSize={90} style={{ overflow: "visible" }}>
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full rounded-lg border"
        >
          <ResizablePanel
            defaultSize={25}
            className="min-w-[200px] max-w-[200px]"
          >
            <div className="fixed w-[200px]">
              <Sidebar adminUser={adminUser} />
            </div>
          </ResizablePanel>
          {/* <ResizableHandle withHandle /> */}
          <ResizablePanel defaultSize={75}>
            <div className="p-6">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
