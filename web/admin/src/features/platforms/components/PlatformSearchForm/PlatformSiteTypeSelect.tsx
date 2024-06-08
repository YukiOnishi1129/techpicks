"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { usePlatformRedirectPage } from "../../hooks/usePlatformRedirectPage";

type PlatformSiteTypeSelectProps = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

const FormSchema = z.object({
  platformSiteType: z.string(),
});

export const PlatformSiteTypeSelect: FC<PlatformSiteTypeSelectProps> = ({
  keyword,
  language,
  platformSiteType,
}) => {
  const { redirectPage } = usePlatformRedirectPage();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      platformSiteType: platformSiteType,
    },
  });

  const handleSelectPlatformType = useCallback(
    async (value: string, onChange: (...event: any[]) => void) => {
      onChange(value);
      let keywordPath = "";
      if (!!keyword && keyword.trim() !== "") {
        keywordPath = `&keyword=${keyword}`;
      }
      let languagePath = "";
      if (language) {
        languagePath = `&language=${language}`;
      }
      let platformSiteTypePath = "";
      if (value !== "0") {
        platformSiteTypePath = `&platformSiteType=${value}`;
      }
      await redirectPage({
        offset: 1,
        targetKeyword: keyword,
        targetLanguage: language,
        targetPlatformSiteType: value,
      });
    },
    [keyword, language, redirectPage]
  );

  return (
    <Form {...form}>
      <form className="w-40">
        <FormField
          control={form.control}
          name="platformSiteType"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) =>
                  handleSelectPlatformType(value, field.onChange)
                }
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border-primary bg-secondary">
                    <SelectValue
                      placeholder="site type"
                      className="text-gray-400"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">all type</SelectItem>
                  <SelectItem value="1">
                    <span>site</span>
                  </SelectItem>
                  <SelectItem value="2">
                    <span>company</span>
                  </SelectItem>
                  <SelectItem value="3">
                    <span>summary</span>
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
