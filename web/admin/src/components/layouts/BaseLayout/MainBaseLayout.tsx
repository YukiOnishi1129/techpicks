import { FC } from "react";

import { Sidebar } from "@/components/layouts/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
      className="min-h-screen w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={10} className="max-h-[60px] min-h-[60px]">
        {adminUser && <Header adminUser={adminUser} />}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={90}>
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full rounded-lg border"
        >
          <ResizablePanel
            defaultSize={25}
            className="min-w-[200px] max-w-[200px]"
          >
            {/* <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Sidebar</span>
            </div> */}
            {adminUser && <Sidebar adminUser={adminUser} />}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">{children}</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
