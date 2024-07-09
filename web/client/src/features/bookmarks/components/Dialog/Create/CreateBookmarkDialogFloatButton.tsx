"use client";

import { User } from "@supabase/supabase-js";
import { useState, FC, useCallback } from "react";
import { HiPlus } from "react-icons/hi";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CreateBookmarkDialogContent } from "./CreateBookmarkDialogContent";

type CreateBookmarkDialogFloatButtonProps = {
  user: User | undefined;
};

export const CreateBookmarkDialogFloatButton: FC<
  CreateBookmarkDialogFloatButtonProps
> = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer rounded-full border-2 border-white bg-primary p-4">
        <HiPlus size="24" color="black" />
      </DialogTrigger>
      {open && (
        <CreateBookmarkDialogContent user={user} handleClose={handleClose} />
      )}
    </Dialog>
  );
};
