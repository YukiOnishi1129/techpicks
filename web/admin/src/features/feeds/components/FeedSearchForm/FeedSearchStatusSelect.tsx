"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SyncLoaderComponent } from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRedirectPage } from "../../hooks/useRedirectPage";

const FormSchema = z.object({
  status: z.string().optional(),
});

type FeedSearchStatusSelectProps = {
  keyword?: string;
  language?: string;
  platformId?: string;
  categoryId?: string;
  platformSiteType?: string;
  trendPlatformType?: string;
  status?: string;
};

export const FeedSearchStatusSelect: FC<FeedSearchStatusSelectProps> = ({
  keyword,
  language,
  platformId,
  categoryId,
  platformSiteType,
  trendPlatformType,
  status,
}) => {
  const { redirectPage } = useRedirectPage();
  const [isInitSelect, startInitSelectTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: status,
    },
  });

  const handleSelectTrendPlatformType = useCallback(
    async (value: string, onChange: (...event: any[]) => void) => {
      onChange(value);
      await redirectPage({
        targetKeyword: keyword,
        targetLanguage: language,
        targetPlatformSiteType: platformSiteType,
        targetPlatformId: platformId,
        targetCategoryId: categoryId,
        targetTrendPlatformType: trendPlatformType,
        targetStatus: value,
      });
    },
    [
      keyword,
      language,
      platformSiteType,
      platformId,
      categoryId,
      trendPlatformType,
      redirectPage,
    ]
  );

  const initSelectTrendPlatformType = useCallback(() => {
    startInitSelectTransition(() => {
      if (status === undefined) {
        form.setValue("status", "0");
      }
    });
  }, [form, status]);

  useEffect(() => {
    initSelectTrendPlatformType();
  }, [form, initSelectTrendPlatformType]);

  return (
    <Form {...form}>
      <form className="w-40">
        {isInitSelect ? (
          <div className="size-12">
            <SyncLoaderComponent size={10} />
          </div>
        ) : (
          <FormField
            control={form.control}
            name="status"
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
                        placeholder="Status"
                        className="text-gray-400"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">
                      <span>All status</span>
                    </SelectItem>
                    <SelectItem value="1">
                      <span>active</span>
                    </SelectItem>
                    <SelectItem value="2">
                      <span>stop</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
};
