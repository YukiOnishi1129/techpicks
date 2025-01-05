"use client";

import { FC, useCallback, useState } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";

import { CreateMyFeedFolderDialogContent } from "./CreateMyFeedFolderDialogContent";

type CreateMyFeedFolderDialogProps = {
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  buttonSize?: number;
  onCreatedMyFeedFolder?: (myFeedId: string) => Promise<void>;
};

export const CreateMyFeedFolderDialog: FC<CreateMyFeedFolderDialogProps> = ({
  buttonVariant,
  buttonSize = 24,
  onCreatedMyFeedFolder,
}) => {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          <HiPlus size={buttonSize} />
          <span className="hidden pl-2 md:block">{"Create"}</span>
        </Button>
      </DialogTrigger>
      {open && (
        <CreateMyFeedFolderDialogContent
          onCloseDialog={handleCloseDialog}
          onCreatedMyFeedFolder={onCreatedMyFeedFolder}
        />
      )}
    </Dialog>
  );
};
