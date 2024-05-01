"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useStatusToast } from "@/hooks/useStatusToast";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .max(255, "Title must be less than 25 characters"),
  description: z.string().optional(),
  feedIdList: z.array(z.string()).optional(),
});

type UpdateMyFeedFolderDialogProps = {
  myFeedFolderId: string;
  title: string;
  description: string;
  feedIdList: Array<string>;
  handleDeleteMyFeedFolder: (id: string) => Promise<void>;
};

export const UpdateMyFeedFolderDialog: FC<UpdateMyFeedFolderDialogProps> = ({
  myFeedFolderId,
  title,
  description,
  feedIdList,
  handleDeleteMyFeedFolder,
}) => {
  const [open, setOpen] = useState(false);
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
          myFeedFolderId={myFeedFolderId}
          title={title}
          description={description}
          feedIdList={feedIdList}
          handleDeleteMyFeedFolder={handleDeleteMyFeedFolder}
        />
      )}
    </Dialog>
  );
};

type UpdateMyFeedFolderDialogContentProps = {
  myFeedFolderId: string;
  title: string;
  description: string;
  feedIdList: Array<string>;
  handleDeleteMyFeedFolder: (id: string) => Promise<void>;
};

export const UpdateMyFeedFolderDialogContent: FC<
  UpdateMyFeedFolderDialogContentProps
> = ({
  myFeedFolderId,
  title,
  description,
  feedIdList,
  handleDeleteMyFeedFolder,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      feedIdList: feedIdList,
    },
  });
  const { successToast, failToast } = useStatusToast();
  const [isPending, startTransition] = useTransition();
  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);
  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Edit Folder"}</DialogTitle>
      </DialogHeader>
      <div>
        <Button onClick={() => handleDeleteMyFeedFolder(myFeedFolderId)}>
          {"DELETE"}
        </Button>
      </div>
    </DialogContent>
  );
};
