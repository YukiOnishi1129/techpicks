"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, FC, useEffect, useTransition } from "react";
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

import { usePlatformRedirectPage } from "../../hooks/usePlatformRedirectPage";

type PlatformSearchPlatformSiteTypeSelectProps = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  status?: string;
};

const FormSchema = z.object({
  platformSiteType: z.string(),
});

export const PlatformSearchPlatformSiteTypeSelect: FC<
  PlatformSearchPlatformSiteTypeSelectProps
> = ({ keyword, language, platformSiteType, status }) => {
  const { redirectPage } = usePlatformRedirectPage();
  const [isInitSelect, startInitSelectTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      platformSiteType: platformSiteType,
    },
  });

  const handleSelectPlatformType = useCallback(
    async (value: string, onChange: (...event: any[]) => void) => {
      onChange(value);
      await redirectPage({
        offset: 1,
        targetKeyword: keyword,
        targetLanguage: language,
        targetPlatformSiteType: value,
        targetStatus: status,
      });
    },
    [keyword, language, status, redirectPage]
  );

  const initSelectPlatformSiteType = useCallback(() => {
    startInitSelectTransition(() => {
      if (platformSiteType === undefined) {
        form.setValue("platformSiteType", "0");
      }
    });
  }, [form, platformSiteType]);

  useEffect(() => {
    initSelectPlatformSiteType();
  }, [form, initSelectPlatformSiteType]);

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
        )}
      </form>
    </Form>
  );
};
