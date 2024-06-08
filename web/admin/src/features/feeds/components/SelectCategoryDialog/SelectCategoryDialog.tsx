"use client";

import { VariantProps } from "class-variance-authority";
import { FC, useState, useCallback } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CategoryType } from "@/types/category";

import { SelectCategoryDialogContent } from "./SelectCategoryDialogContent";

type SelectCategoryDialogProps = {
  label?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  selectedCategory?: CategoryType;
  handleSelectCategory: (categoryId: string) => void;
};

export const SelectCategoryDialog: FC<SelectCategoryDialogProps> = ({
  label = "SELECT",
  variant,
  selectedCategory,
  handleSelectCategory,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = useCallback(() => setOpenDialog(true), []);
  const handleDialogClose = useCallback(() => setOpenDialog(false), []);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className="font-bold"
          onClick={handleDialogOpen}
        >
          {label}
        </Button>
      </DialogTrigger>
      {openDialog && (
        <SelectCategoryDialogContent
          selectedCategory={selectedCategory}
          handleDialogClose={handleDialogClose}
          handleSelectCategory={handleSelectCategory}
        />
      )}
    </Dialog>
  );
};
