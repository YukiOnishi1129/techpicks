"use client";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const SkeltonDesktopSidebar = () => {
  return (
    <div className="h-lvh w-full overflow-y-auto border-r pb-12">
      <div className="mb-16 space-y-4 py-4">
        <div className="px-4 py-2 grid gap-2">
          <Skeleton className="h-[28px] w-[100px] rounded-xl" />
          <div className="grid gap-2">
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
          </div>
        </div>

        <div className="px-4 py-2 grid gap-2">
          <Skeleton className="h-[28px] w-[100px] rounded-xl" />
          <div className="grid gap-2">
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
          </div>
        </div>

        <div className="px-4 py-2 grid gap-2">
          <Skeleton className="h-[28px] w-[100px] rounded-xl" />
          <div className="grid gap-2">
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
            <Skeleton className="h-6 px-8" />
          </div>
        </div>
      </div>
    </div>
  );
};
