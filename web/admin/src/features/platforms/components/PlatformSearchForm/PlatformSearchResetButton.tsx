"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";

import { serverRevalidatePage } from "@/actions/serverAction";

export const PlatformSearchResetButton = () => {
  const router = useRouter();
  const handleReset = useCallback(async () => {
    await serverRevalidatePage(`/platform?$offset=1`);
    router.replace(`/platform?$offset=1`);
  }, [router]);

  return (
    <Button variant="secondary" onClick={handleReset}>
      {"RESET"}
    </Button>
  );
};
