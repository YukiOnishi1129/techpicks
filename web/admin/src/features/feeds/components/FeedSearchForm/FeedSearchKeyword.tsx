"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFeedRedirectPage } from "../../hooks/useFeedRedirectPage";

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
  status?: string;
};

export const FeedSearchKeyword: FC<FeedSearchKeywordProps> = ({
  keyword,
  language,
  platformId,
  categoryId,
  platformSiteType,
  trendPlatformType,
  status,
}) => {
  const { redirectPage } = useFeedRedirectPage();
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
      await redirectPage({
        targetKeyword: values.keyword,
        targetLanguage: language,
        targetPlatformSiteType: platformSiteType,
        targetPlatformId: platformId,
        targetCategoryId: categoryId,
        targetTrendPlatformType: trendPlatformType,
        targetStatus: status,
      });
    },
    [
      language,
      platformSiteType,
      platformId,
      categoryId,
      trendPlatformType,
      status,
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
