"use client";

import { FC, useCallback, useState } from "react";
import { FiPlus } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CreatePlatformDialogContent } from "./CreatePlatformDialogContent";

type CreatePlatformDialogProps = {
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  status?: string;
};

export const CreatePlatformDialog: FC<CreatePlatformDialogProps> = ({
  offset,
  keyword,
  language,
  platformSiteType,
  status,
}) => {
  const [open, setOpen] = useState(false);
  const handleDialogOpen = useCallback(() => setOpen(true), []);
  const handleDialogClose = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold" onClick={handleDialogOpen}>
          <FiPlus className="mr-2" />
          {"ADD"}
        </Button>
      </DialogTrigger>
      {open && (
        <CreatePlatformDialogContent
          offset={offset}
          keyword={keyword}
          language={language}
          platformSiteType={platformSiteType}
          status={status}
          handleDialogClose={handleDialogClose}
        />
      )}
    </Dialog>
  );
};
