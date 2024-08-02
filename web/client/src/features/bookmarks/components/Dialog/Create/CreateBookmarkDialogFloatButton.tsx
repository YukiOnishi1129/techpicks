"use client";

import { User } from "@supabase/supabase-js";
import { useState, FC, useCallback } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CreateBookmarkDialogContent } from "./CreateBookmarkDialogContent";

type CreateBookmarkDialogFloatButtonProps = {
  user?: User;
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
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full">
          <HiPlus size={24} />
        </Button>
      </DialogTrigger>
      {open && (
        <CreateBookmarkDialogContent user={user} handleClose={handleClose} />
      )}
    </Dialog>
  );
};
