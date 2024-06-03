"use client";

import { FC, useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CategoryType } from "@/types/category";

import { SelectCategoryDialogContent } from "./SelectCategoryDialogContent";

type SelectCategoryDialogProps = {
  selectedCategory?: CategoryType;
  handleSelectCategory: (categoryId: string) => void;
};

export const SelectCategoryDialog: FC<SelectCategoryDialogProps> = ({
  selectedCategory,
  handleSelectCategory,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = useCallback(() => setOpenDialog(true), []);
  const handleDialogClose = useCallback(() => setOpenDialog(false), []);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="font-bold" onClick={handleDialogOpen}>
          {"SELECT"}
        </Button>
        {openDialog && (
          <SelectCategoryDialogContent
            selectedCategory={selectedCategory}
            handleDialogClose={handleDialogClose}
            handleSelectCategory={handleSelectCategory}
          />
        )}
      </DialogTrigger>
    </Dialog>
  );
};
