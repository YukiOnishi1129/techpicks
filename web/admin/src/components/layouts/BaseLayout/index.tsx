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
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">{children}</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
