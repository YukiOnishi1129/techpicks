"use client";

import { FC, useCallback, useEffect, useState } from "react";

import { fetchPlatformsAPI } from "@/features/platforms/actions/platform";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";

import { PlatformType } from "@/types/platform";

import { SelectPlatformList } from "./SelectPlatformList";

type SelectPlatformDialogContent = {
  selectedPlatform?: PlatformType;
  handleDialogClose: () => void;
};

export const SelectPlatformDialogContent: FC<SelectPlatformDialogContent> = ({
  selectedPlatform,
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
        <SelectPlatformList
          defaultSelectedPlatform={selectedPlatform}
          initialPlatforms={platforms}
        />
      )}

      <div className="flex items-center justify-between">
        <DialogClose asChild className="inline-block">
          <Button variant={"secondary"} onClick={handleDialogClose}>
            {"CLOSE"}
          </Button>
        </DialogClose>
        <Button>{"DONE"}</Button>
      </div>
    </DialogContent>
  );
};
