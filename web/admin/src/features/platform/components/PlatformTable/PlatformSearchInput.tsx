"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useServerRevalidatePage } from "@/hooks/useServerRevalidatePage";

const FormSchema = z.object({
  keyword: z.string().optional(),
});

type PlatformSearchInputProps = {
  offset?: number;
  keyword?: string;
};

export const PlatformSearchInput: FC<PlatformSearchInputProps> = ({
  offset,
  keyword,
}) => {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keyword: keyword || "",
    },
  });

  const handleSearch = useCallback(
    async (values: z.infer<typeof FormSchema>) => {
      let keywordPath = "";
      const requestOffset = offset ? offset - 1 : 1;
      if (!!values.keyword && values.keyword.trim() !== "") {
        keywordPath = `&keyword=${values.keyword}`;
      }
      await revalidatePage();
      router.replace(`/platform?$offset=${requestOffset}${keywordPath}`);
    },
    [offset, router, revalidatePage]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)}>
        <FormField
          control={form.control}
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
  );
};
