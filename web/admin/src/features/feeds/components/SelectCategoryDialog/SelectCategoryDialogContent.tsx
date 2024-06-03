"use client";

import { FC, useCallback, useState, useEffect } from "react";

import { fetchCategoriesAPI } from "@/features/categories/actions/category";

import {
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

import { CategoryType } from "@/types/category";

import { SelectCategoryList } from "./SelectCategoryList";

type SelectCategoryDialogContentProps = {
  selectedCategory?: CategoryType;
  handleDialogClose: () => void;
  handleSelectCategory: (categoryId: string) => void;
};

export const SelectCategoryDialogContent: FC<
  SelectCategoryDialogContentProps
> = ({ selectedCategory, handleDialogClose, handleSelectCategory }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const fetchCategories = useCallback(async () => {
    const res = await fetchCategoriesAPI({});
    if (res.data) {
      setCategories(res.data.categories);
    }
  }, []);

  const onSelectCategory = useCallback(
    (categoryId: string) => {
      handleSelectCategory(categoryId);
      handleDialogClose();
    },
    [handleSelectCategory, handleDialogClose]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{"Select category"}</DialogTitle>
      </DialogHeader>
      {categories.length > 0 && (
        <SelectCategoryList
          defaultSelectedCategory={selectedCategory}
          initialCategories={categories}
          handleSelectCategory={onSelectCategory}
        />
      )}
    </DialogContent>
  );
};
