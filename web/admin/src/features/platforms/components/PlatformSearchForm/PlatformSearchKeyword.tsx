"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { usePlatformRedirectPage } from "../../hooks/usePlatformRedirectPage";

const FormSchema = z.object({
  keyword: z.string().optional(),
});

type PlatformSearchKeywordProps = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  status?: string;
};

export const PlatformSearchKeyword: FC<PlatformSearchKeywordProps> = ({
  keyword,
  language,
  platformSiteType,
  status,
}) => {
  const { redirectPage } = usePlatformRedirectPage();
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
        platformSiteTypePath = `&platformSiteType=${platformSiteType}${platformSiteTypePath}`;
      }
      await redirectPage({
        offset: 1,
        targetKeyword: values.keyword,
        targetLanguage: language,
        targetPlatformSiteType: platformSiteType,
        targetStatus: status,
      });
    },
    [language, platformSiteType, status, redirectPage]
  );

  useEffect(() => {
    form.setValue("keyword", keyword);
  }, [form, keyword]);

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
