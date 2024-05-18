"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { PlatformType } from "@/types/platform";

import { FC } from "react";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  url: z.string(),
  platformSiteType: z.string(),
  faviconUrl: z.string(),
  isEng: z.boolean(),
});

type EditPlatformSheetContentProps = {
  platform: PlatformType;
};

export const EditPlatformSheetContent: FC<EditPlatformSheetContentProps> = ({
  platform,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: platform.name,
      url: platform.siteUrl,
      platformSiteType: String(platform.platformSiteType),
      faviconUrl: platform.faviconUrl,
      isEng: platform.isEng,
    },
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit platform</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form className="mt-4 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Platform name</FormLabel>
                <FormControl>
                  <Input
                    className="border-primary bg-secondary text-primary"
                    placeholder="platform name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Platform url</FormLabel>
                <FormControl>
                  <Input
                    className="border-primary bg-secondary text-primary"
                    placeholder="platform url"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="platformSiteType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform site type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-primary bg-secondary">
                      <SelectValue
                        placeholder="platformSiteType"
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
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        <div className="mt-8 flex justify-between items-center">
          <SheetClose asChild className="inline-block">
            <Button variant={"secondary"}>{"CLOSE"}</Button>
          </SheetClose>
          <Button>{"EDIT"}</Button>
        </div>
      </Form>
    </SheetContent>
  );
};
