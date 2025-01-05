"use client";

import { User } from "@supabase/supabase-js";
import { useState, FC, useCallback } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog/dialog";

import { CreateBookmarkDialogContent } from "./CreateBookmarkDialogContent";

type CreateBookmarkDialogProps = {
  user?: User;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  buttonSize?: number;
};

export const CreateBookmarkDialog: FC<CreateBookmarkDialogProps> = ({
  user,
  buttonVariant,
  buttonSize = 24,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          <HiPlus size={buttonSize} />
          <span className="hidden pl-2 md:block">{"Add"}</span>
        </Button>
      </DialogTrigger>
      {open && (
        <CreateBookmarkDialogContent user={user} handleClose={handleClose} />
      )}
    </Dialog>
  );
};
