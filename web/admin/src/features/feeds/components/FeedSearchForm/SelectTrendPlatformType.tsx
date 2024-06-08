"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRedirectPage } from "../../hooks/useRedirectPage";

const FormSchema = z.object({
  trendPlatformType: z.string(),
});

type SelectTrendPlatformTypeProps = {
  keyword?: string;
  language?: string;
  platformId?: string;
  categoryId?: string;
  platformSiteType?: string;
  trendPlatformType?: string;
};

export const SelectTrendPlatformType: FC<SelectTrendPlatformTypeProps> = ({
  keyword,
  language,
  platformId,
  categoryId,
  platformSiteType,
  trendPlatformType,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trendPlatformType: trendPlatformType,
    },
  });

  const { redirectPage } = useRedirectPage();

  const handleSelectTrendPlatformType = useCallback(
    async (value: string, onChange: (...event: any[]) => void) => {
      onChange(value);
      await redirectPage(
        keyword,
        language,
        platformSiteType,
        platformId,
        categoryId,
        value
      );
    },
    [keyword, language, platformSiteType, platformId, categoryId, redirectPage]
  );
  return (
    <Form {...form}>
      <form className="w-40">
        <FormField
          control={form.control}
          name="trendPlatformType"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) =>
                  handleSelectTrendPlatformType(value, field.onChange)
                }
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border-primary bg-secondary">
                    <SelectValue
                      placeholder="Trend platform type"
                      className="text-gray-400"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dummy">
                    <span>All trend type</span>
                  </SelectItem>
                  <SelectItem value="0">
                    <span>Unknown</span>
                  </SelectItem>
                  <SelectItem value="1">
                    <span>Zenn</span>
                  </SelectItem>
                  <SelectItem value="2">
                    <span>Qiita</span>
                  </SelectItem>
                  <SelectItem value="3">
                    <span>Hatena</span>
                  </SelectItem>
                  <SelectItem value="4">
                    <span>DevCommunity</span>
                  </SelectItem>
                  <SelectItem value="5">
                    <span>Hashnode</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
