"use client";

import { FC, useCallback, useEffect, useState } from "react";

import { fetchPlatformsAPI } from "@/features/platforms/actions/platform";

import {
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

import { PlatformType } from "@/types/platform";

import { SelectPlatformList } from "./SelectPlatformList";

type SelectPlatformDialogContent = {
  handleDialogClose: () => void;
};

export const SelectPlatformDialogContent: FC<SelectPlatformDialogContent> = ({
  handleDialogClose,
}) => {
  const [platforms, setPlatforms] = useState<PlatformType[]>([]);

  const fetchPlatform = useCallback(async () => {
    const res = await fetchPlatformsAPI({});
    if (res.data) {
      setPlatforms(res.data.platforms);
    }
  }, []);

  useEffect(() => {
    fetchPlatform();
  }, [fetchPlatform]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{"Select platform"}</DialogTitle>
      </DialogHeader>
      {platforms.length > 0 && (
        <SelectPlatformList initialPlatforms={platforms} />
      )}
    </DialogContent>
  );
};
