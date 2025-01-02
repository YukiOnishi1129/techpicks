"use client";

import { FragmentOf } from "gql.tada";
import { FC, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { UpdateMyFeedFolderDialogContent } from "./UpdateMyFeedFolderDialogContent";
import {
  FeedListUpdateMyFeedFolderDialogFragment,
  UpdateMyFeedFolderDialogFragment,
} from "./UpdateMyFeedFolderDialogFragment";

type UpdateMyFeedFolderDialogProps = {
  data: FragmentOf<typeof UpdateMyFeedFolderDialogFragment>;
  initialFeedList: FragmentOf<typeof FeedListUpdateMyFeedFolderDialogFragment>;
};

export const UpdateMyFeedFolderDialog: FC<UpdateMyFeedFolderDialogProps> = ({
  data,
  initialFeedList,
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
          initialFeedList={initialFeedList}
          onClose={handleClose}
        />
      )}
    </Dialog>
  );
};
