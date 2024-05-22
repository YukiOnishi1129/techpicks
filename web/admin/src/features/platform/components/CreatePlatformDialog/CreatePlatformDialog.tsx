"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CreatePlatformDialogContent } from "./CreatePlatformDialogContent";

export const CreatePlatformDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold">
          <FiPlus className="mr-2" />
          {"ADD"}
        </Button>
      </DialogTrigger>
      {open && <CreatePlatformDialogContent />}
    </Dialog>
  );
};
