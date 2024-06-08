"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";

import { serverRevalidatePage } from "@/actions/serverAction";

export const FeedSearchResetButton = () => {
  const router = useRouter();
  const handleReset = useCallback(async () => {
    await serverRevalidatePage(`/feed?$offset=1`);
    router.replace(`/feed?$offset=1`);
  }, [router]);

  return (
    <Button variant="secondary" onClick={handleReset}>
      {"RESET"}
    </Button>
  );
};
