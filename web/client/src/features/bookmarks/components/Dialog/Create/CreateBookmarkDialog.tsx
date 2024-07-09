"use client";

import { User } from "@supabase/supabase-js";
import { useState, FC, useCallback } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CreateBookmarkDialogContent } from "./CreateBookmarkDialogContent";

type CreateBookmarkDialogProps = {
  user: User | undefined;
};

export const CreateBookmarkDialog: FC<CreateBookmarkDialogProps> = ({
  user,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <HiPlus />
          {"Add"}
        </Button>
      </DialogTrigger>
      {open && (
        <CreateBookmarkDialogContent user={user} handleClose={handleClose} />
      )}
    </Dialog>
  );
};
