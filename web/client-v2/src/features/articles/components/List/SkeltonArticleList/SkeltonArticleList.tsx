"use client";
import { Skeleton } from "@/shared/components/ui/skeleton";

const SKELTON_ARTICLE_LIST = [1, 2, 3];

export const SkeltonArticleList = () => {
  return (
    <div className="m-auto grid gap-4">
      {SKELTON_ARTICLE_LIST.map((_, index) => (
        <div
          key={`article-skeleton-${index}`}
          className="rounded-2xl border bg-primary-foreground px-4 pb-8 md:px-2"
        >
          <div className="grid gap-4">
            <div className="flex h-16 justify-between border-b py-4 md:px-6">
              <>
                <div className="flex w-full items-center justify-between">
                  <Skeleton className="h-8 w-24 md:w-48" />
                  <Skeleton className="h-8 w-40" />
                </div>
              </>
            </div>

            <div className="md:px-4">
              <div className="hidden gap-4 md:flex">
                <div className="hidden overflow-hidden rounded-lg md:inline-block">
                  <Skeleton className="w-full justify-center md:h-36 md:w-48" />
                </div>
                <div className="grid gap-2 md:w-[65%]">
                  <Skeleton className="h-[66px] w-full" />
                  <Skeleton className="h-[24px] w-[100px]" />
                  <Skeleton className="h-[24px] w-full" />
                </div>
              </div>

              <div className="grid gap-4 md:hidden">
                <Skeleton className="block h-12 w-full md:hidden" />
                <div className="inline-block w-full overflow-hidden rounded-lg md:hidden">
                  <Skeleton className="h-36 w-full justify-center md:h-36 md:w-48" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
