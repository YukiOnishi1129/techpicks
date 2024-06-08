"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRedirectPage } from "../../hooks/useRedirectPage";

const FormSchema = z.object({
  keyword: z.string().optional(),
});

type FeedSearchKeywordProps = {
  keyword?: string;
  language?: string;
  platformId?: string;
  categoryId?: string;
  platformSiteType?: string;
  trendPlatformType?: string;
};

export const FeedSearchKeyword: FC<FeedSearchKeywordProps> = ({
  keyword,
  language,
  platformId,
  categoryId,
  platformSiteType,
  trendPlatformType,
}) => {
  const { redirectPage } = useRedirectPage();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keyword: keyword || "",
    },
  });

  useEffect(() => {
    form.setValue("keyword", keyword);
  }, [form, keyword]);

  const handleSearch = useCallback(
    async (values: z.infer<typeof FormSchema>) => {
      await redirectPage(
        values.keyword,
        language,
        platformSiteType,
        platformId,
        categoryId,
        trendPlatformType
      );
    },
    [
      language,
      platformSiteType,
      platformId,
      categoryId,
      trendPlatformType,
      redirectPage,
    ]
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
