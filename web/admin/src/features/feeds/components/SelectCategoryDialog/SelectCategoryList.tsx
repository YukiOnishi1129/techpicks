"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchCategoriesAPI } from "@/features/categories/actions/category";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";

import { CategoryType } from "@/types/category";

const KeywordFormSchema = z.object({
  keyword: z.string().optional(),
});

const FormSchema = z.object({
  categoryId: z
    .string({
      required_error: "Please select the platform",
    })
    .trim()
    .min(1, { message: "Platform is required" }),
  categoryName: z.string().optional(),
  categoryType: z.number().optional(),
});

type SelectCategoryListProps = {
  defaultSelectedCategory?: CategoryType;
  initialCategories: Array<CategoryType>;
  handleSelectCategory: (categoryId: string) => void;
};

export const SelectCategoryList: FC<SelectCategoryListProps> = ({
  defaultSelectedCategory,
  initialCategories,
  handleSelectCategory,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categoryId: defaultSelectedCategory?.id,
      categoryName: defaultSelectedCategory?.name,
      categoryType: defaultSelectedCategory?.type,
    },
  });

  const keywordForm = useForm<z.infer<typeof KeywordFormSchema>>({
    resolver: zodResolver(KeywordFormSchema),
  });

  const selectedCategoryName = form.watch("categoryName");

  const observerTarget = useRef(null);

  const [categories, setCategories] =
    useState<CategoryType[]>(initialCategories);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatCategories = categories
    ? categories.flatMap((category) => category)
    : [];

  const handleSearch = useCallback(
    async (values: z.infer<typeof KeywordFormSchema>) => {
      const res = await fetchCategoriesAPI({
        keyword: values.keyword,
      });

      if (res.data) {
        setCategories(res.data.categories);
        setOffset(1);
        setHashMore(true);
      }
    },
    [setCategories, setOffset, setHashMore]
  );

  const loadMore = useCallback(
    async (offset: number) => {
      const res = await fetchCategoriesAPI({
        offset: offset.toString(),
        keyword: keywordForm.watch("keyword"),
      });

      if (res.data) {
        setCategories((prev) => [...prev, ...res.data.categories]);
        const count = res.data.categories.length;
        setHashMore(count > 0);
      }
    },
    [keywordForm]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hashMore) {
            setOffset((prev) => prev + 1);
          }
        });
      },
      { threshold: 1 }
    );

    let observerRefValue: null = null;

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
      observerRefValue = observerTarget.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [hashMore]);

  useEffect(() => {
    if (offset > 1) {
      loadMore(offset);
    }
  }, [loadMore, offset, hashMore]);

  return (
    <div className="w-full">
      <div className="mb-4 ml-2 w-full text-sm font-normal">
        <span className="text-lg font-bold text-primary">
          {selectedCategoryName}
        </span>
      </div>

      <div className="mb-2">
        <Form {...keywordForm}>
          <form onSubmit={keywordForm.handleSubmit(handleSearch)}>
            <FormField
              control={keywordForm.control}
              name="keyword"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <Input
                      className="border-primary bg-secondary text-primary"
                      placeholder="search keyword"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div className="h-[300px] w-full overflow-y-scroll border-2 border-secondary p-4">
        {flatCategories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          <>
            {flatCategories.map((category) => (
              <FormField
                key={category.id}
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem
                    key={category.id}
                    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
                    className="flex w-full cursor-pointer items-center border-t-2 border-t-secondary hover:bg-secondary hover:bg-opacity-10"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(category.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange(category.id);
                            form.setValue("categoryName", category.name);
                            form.setValue(
                              "categoryType",
                              Number(category.type)
                            );
                          }
                        }}
                      />
                    </FormControl>

                    <FormLabel className="ml-2 flex h-12 w-full cursor-pointer items-center pb-2 text-sm font-normal">
                      <p className="flex w-full items-center text-lg">
                        {category.name}
                      </p>
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
            <div ref={observerTarget}>
              {hashMore && (
                <div className="flex justify-center py-4">
                  <Loader />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <DialogClose asChild className="inline-block">
          <Button variant={"secondary"}>{"CLOSE"}</Button>
        </DialogClose>
        <Button
          onClick={() => handleSelectCategory(form.getValues("categoryId"))}
        >
          {"DONE"}
        </Button>
      </div>
    </div>
  );
};
