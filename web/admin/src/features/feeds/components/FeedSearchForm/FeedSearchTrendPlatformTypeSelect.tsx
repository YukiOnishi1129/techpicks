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

import { useFeedRedirectPage } from "../../hooks/useFeedRedirectPage";

const FormSchema = z.object({
  trendPlatformType: z.string().optional(),
});

type FeedSearchTrendPlatformTypeSelectProps = {
  keyword?: string;
  language?: string;
  platformId?: string;
  categoryId?: string;
  platformSiteType?: string;
  trendPlatformType?: string;
  status?: string;
};

export const FeedSearchTrendPlatformTypeSelect: FC<
  FeedSearchTrendPlatformTypeSelectProps
> = ({
  keyword,
  language,
  platformId,
  categoryId,
  platformSiteType,
  trendPlatformType,
  status,
}) => {
  const { redirectPage } = useFeedRedirectPage();
  const [isInitSelect, startInitSelectTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trendPlatformType: trendPlatformType,
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
        targetTrendPlatformType: value,
        targetStatus: status,
      });
    },
    [
      keyword,
      language,
      platformSiteType,
      platformId,
      categoryId,
      status,
      redirectPage,
    ]
  );

  const initSelectTrendPlatformType = useCallback(() => {
    startInitSelectTransition(() => {
      if (trendPlatformType === undefined) {
        form.setValue("trendPlatformType", "dummy");
      }
    });
  }, [form, trendPlatformType]);

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
        )}
      </form>
    </Form>
  );
};
