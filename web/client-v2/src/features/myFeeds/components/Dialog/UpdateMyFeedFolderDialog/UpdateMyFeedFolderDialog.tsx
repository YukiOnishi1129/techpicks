"use client";

import { FragmentOf } from "gql.tada";
import { FC, useCallback, useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";

import { UpdateMyFeedFolderDialogContent } from "./UpdateMyFeedFolderDialogContent";
import { UpdateMyFeedFolderDialogFragment } from "./UpdateMyFeedFolderDialogFragment";

type UpdateMyFeedFolderDialogProps = {
  data: FragmentOf<typeof UpdateMyFeedFolderDialogFragment>;
  feedsEndCursor?: string;
};

export const UpdateMyFeedFolderDialog: FC<UpdateMyFeedFolderDialogProps> = ({
  data,
  feedsEndCursor,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600 "
        >
          {"EDIT"}
        </Button>
      </DialogTrigger>
      {open && (
        <UpdateMyFeedFolderDialogContent
          data={data}
          feedsEndCursor={feedsEndCursor}
          onClose={handleClose}
        />
      )}
    </Dialog>
  );
};
