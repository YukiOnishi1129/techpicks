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
  selectedPlatform?: PlatformType;
  handleDialogClose: () => void;
  handleSelectPlatform: (platformId: string) => void;
};

export const SelectPlatformDialogContent: FC<SelectPlatformDialogContent> = ({
  selectedPlatform,
  handleDialogClose,
  handleSelectPlatform,
}) => {
  const [platforms, setPlatforms] = useState<PlatformType[]>([]);

  const fetchPlatform = useCallback(async () => {
    const res = await fetchPlatformsAPI({});
    if (res.data) {
      setPlatforms(res.data.platforms);
    }
  }, []);

  const onSelectPlatform = useCallback(
    (platformId: string) => {
      handleSelectPlatform(platformId);
      handleDialogClose();
    },
    [handleSelectPlatform, handleDialogClose]
  );

  useEffect(() => {
    fetchPlatform();
  }, [fetchPlatform]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{"Select platform"}</DialogTitle>
      </DialogHeader>
      {platforms.length > 0 && (
        <SelectPlatformList
          defaultSelectedPlatform={selectedPlatform}
          initialPlatforms={platforms}
          handleSelectPlatform={onSelectPlatform}
        />
      )}
    </DialogContent>
  );
};
