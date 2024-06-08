"use client";

import { useState, useCallback, FC } from "react";
import { FiPlus } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CreateFeedDialogContent } from "./CreateFeedDialogContent";

type CreateFeedDialogProps = {
  offset?: number;
  keyword?: string;
  language?: string;
  platformId?: string;
  categoryId?: string;
  platformSiteType?: string;
  trendPlatformType?: string;
  status?: string;
};
export const CreateFeedDialog: FC<CreateFeedDialogProps> = ({
  offset,
  keyword,
  language,
  platformId,
  categoryId,
  platformSiteType,
  trendPlatformType,
  status,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = useCallback(() => setOpenDialog(true), []);
  const handleDialogClose = useCallback(() => setOpenDialog(false), []);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="font-bold" onClick={handleDialogOpen}>
          <FiPlus className="mr-2" />
          {"ADD"}
        </Button>
      </DialogTrigger>
      {openDialog && (
        <CreateFeedDialogContent
          offset={offset}
          keyword={keyword}
          language={language}
          platformId={platformId}
          categoryId={categoryId}
          platformSiteType={platformSiteType}
          trendPlatformType={trendPlatformType}
          status={status}
          handleDialogClose={handleDialogClose}
        />
      )}
    </Dialog>
  );
};
