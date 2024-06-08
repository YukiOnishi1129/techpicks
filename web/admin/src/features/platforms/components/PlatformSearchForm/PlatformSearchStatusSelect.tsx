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

import { usePlatformRedirectPage } from "../../hooks/usePlatformRedirectPage";

const FormSchema = z.object({
  status: z.string().optional(),
});

type PlatformSearchStatusSelectProps = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  status?: string;
};

export const PlatformSearchStatusSelect: FC<
  PlatformSearchStatusSelectProps
> = ({ keyword, language, platformSiteType, status }) => {
  const { redirectPage } = usePlatformRedirectPage();
  const [isInitSelect, startInitSelectTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: status,
    },
  });

  const handleSelectStatus = useCallback(
    async (value: string, onChange: (...event: any[]) => void) => {
      onChange(value);
      await redirectPage({
        targetKeyword: keyword,
        targetLanguage: language,
        targetPlatformSiteType: platformSiteType,
        targetStatus: value,
      });
    },
    [keyword, language, platformSiteType, redirectPage]
  );

  const initSelectStatus = useCallback(() => {
    startInitSelectTransition(() => {
      if (status === undefined) {
        form.setValue("status", "0");
      }
    });
  }, [form, status]);

  useEffect(() => {
    initSelectStatus();
  }, [form, initSelectStatus]);

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
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) =>
                    handleSelectStatus(value, field.onChange)
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
