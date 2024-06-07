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

type FeedSearchKeywordProps = {
  keyword?: string;
  language?: string;
  platformId?: string;
  categoryId?: string;
  platformSiteType?: string;
};

export const FeedSearchKeyword: FC<FeedSearchKeywordProps> = ({
  keyword,
  language,
  platformId,
  categoryId,
  platformSiteType,
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
      if (!!values.keyword && values.keyword.trim() !== "") {
        keywordPath = `&keyword=${values.keyword}`;
      }
      let languagePath = "";
      if (language) {
        languagePath = `&language=${language}`;
      }
      let platformSiteTypePath = "";
      if (platformSiteType) {
        platformSiteTypePath = `&platformSiteType=${platformSiteType}`;
      }
      await revalidatePage();
      router.replace(
        `/feed?$offset=1${keywordPath}${languagePath}${platformSiteTypePath}`
      );
    },
    [language, platformSiteType, router, revalidatePage]
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
