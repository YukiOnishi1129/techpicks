"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCallback, FC, useTransition, useEffect } from "react";
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

import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/constants/image";

import { useFeedRedirectPage } from "../../hooks/useFeedRedirectPage";

type FeedSearchLanguageSelectProps = {
  keyword?: string;
  language?: string;
  platformId?: string;
  categoryId?: string;
  platformSiteType?: string;
  trendPlatformType?: string;
  status?: string;
};

const FormSchema = z.object({
  language: z.string(),
});

export const FeedSearchLanguageSelect: FC<FeedSearchLanguageSelectProps> = ({
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
      language: language,
    },
  });

  const handleSelectLanguage = useCallback(
    async (value: string, onChange: (...event: any[]) => void) => {
      onChange(value);
      await redirectPage({
        targetKeyword: keyword,
        targetLanguage: value,
        targetPlatformSiteType: platformSiteType,
        targetPlatformId: platformId,
        targetCategoryId: categoryId,
        targetTrendPlatformType: trendPlatformType,
        targetStatus: status,
      });
    },
    [
      keyword,
      platformSiteType,
      platformId,
      categoryId,
      trendPlatformType,
      status,
      redirectPage,
    ]
  );

  const initSelectLanguage = useCallback(() => {
    startInitSelectTransition(() => {
      if (language === undefined) {
        form.setValue("language", "0");
      }
    });
  }, [form, language]);

  useEffect(() => {
    initSelectLanguage();
  }, [form, initSelectLanguage]);

  return (
    <Form {...form}>
      <form>
        {isInitSelect ? (
          <div className="size-12">
            <SyncLoaderComponent size={10} />
          </div>
        ) : (
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) =>
                    handleSelectLanguage(value, field.onChange)
                  }
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-primary bg-secondary">
                      <SelectValue
                        placeholder="language"
                        className="text-gray-400"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">All language</SelectItem>
                    <SelectItem value="2" className="flex">
                      <Image
                        className="inline-block"
                        src={ENGLISH_IMAGE}
                        alt={"EN"}
                        width={20}
                        height={20}
                      />
                      <span className="ml-2 inline-block">english</span>
                    </SelectItem>
                    <SelectItem value="1">
                      <Image
                        className="inline-block"
                        src={JAPANESE_IMAGE}
                        alt={"JP"}
                        width={20}
                        height={20}
                      />
                      <span className="ml-2 inline-block">japanese</span>
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
