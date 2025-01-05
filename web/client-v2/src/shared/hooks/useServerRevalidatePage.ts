"use client";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

import { serverRevalidatePage } from "@/shared/actions/actServerRevalidatePage";

export const useServerRevalidatePage = () => {
  const pathname = usePathname();

  const revalidatePage = useCallback(async () => {
    await serverRevalidatePage(pathname);
  }, [pathname]);

  return { revalidatePage };
};
