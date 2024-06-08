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

import { usePlatformRedirectPage } from "../../hooks/usePlatformRedirectPage";

type PlatformLanguageSelectProps = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

const FormSchema = z.object({
  language: z.string(),
});

export const PlatformLanguageSelect: FC<PlatformLanguageSelectProps> = ({
  keyword,
  language,
  platformSiteType,
}) => {
  const { redirectPage } = usePlatformRedirectPage();
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
      let keywordPath = "";
      if (!!keyword && keyword.trim() !== "") {
        keywordPath = `&keyword=${keyword}`;
      }
      let languagePath = "";
      if (value !== "0") {
        languagePath = `&language=${value}`;
      }
      let platformSiteTypePath = "";
      if (platformSiteType) {
        platformSiteTypePath = `&platformSiteType=${platformSiteType}`;
      }
      await redirectPage({
        offset: 1,
        targetKeyword: keyword,
        targetLanguage: value,
        targetPlatformSiteType: platformSiteType,
      });
    },
    [keyword, platformSiteType, redirectPage]
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
      <form className="w-40">
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
                    <SelectItem value="0">all language</SelectItem>
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
