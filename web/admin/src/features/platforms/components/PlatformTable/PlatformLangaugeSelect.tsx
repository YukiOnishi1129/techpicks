"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, FC } from "react";
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

import { useServerRevalidatePage } from "@/hooks/useServerRevalidatePage";

import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/constants/image";

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
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
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
      await revalidatePage();
      router.replace(
        `/platform?$offset=1${keywordPath}${languagePath}${platformSiteTypePath}`
      );
    },
    [keyword, platformSiteType, router, revalidatePage]
  );

  return (
    <Form {...form}>
      <form className="w-40">
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
      </form>
    </Form>
  );
};
