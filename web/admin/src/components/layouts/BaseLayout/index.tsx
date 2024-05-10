import { FC } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export type BaseLayoutProps = {
  children: React.ReactNode;
};

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-screen w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={10} className="max-h-[60px] min-h-[60px]">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
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
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Sidebar</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
