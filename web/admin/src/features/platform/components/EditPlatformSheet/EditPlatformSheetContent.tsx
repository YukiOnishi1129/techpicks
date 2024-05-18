"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FC, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

import { PlatformType } from "@/types/platform";

import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/constants/image";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter the name",
    })
    .min(1, { message: "Name is required" }),
  url: z
    .string({
      required_error: "Please enter the URL",
    })
    .url({ message: "Invalid URL" }),
  platformSiteType: z
    .string({
      required_error: "Please select the platform site type",
    })
    .min(1, { message: "Platform site type is required" }),
  faviconUrl: z
    .string({
      required_error: "Please enter the URL",
    })
    .url({ message: "Invalid URL" }),
  isEng: z
    .string({
      required_error: "Please select the language",
    })
    .min(1, { message: "Language is required" }),
});

type EditPlatformSheetContentProps = {
  platform: PlatformType;
  handleSheetClose: () => void;
};

export const EditPlatformSheetContent: FC<EditPlatformSheetContentProps> = ({
  platform,
  handleSheetClose,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: platform.name,
      url: platform.siteUrl,
      platformSiteType: String(platform.platformSiteType),
      faviconUrl: platform.faviconUrl,
      isEng: platform.isEng ? "2" : "1",
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmitEditPlatform = useCallback(
    (values: z.infer<typeof FormSchema>) => {
      startTransition(async () => {
        console.log("🔥");
        const editedName = values.name;
        const editedUrl = values.url;
        const editedPlatformSiteType = Number(values.platformSiteType);
        const editedFaviconUrl = values.faviconUrl;
        const editedIsEng = values.isEng === "2";
      });
    },
    []
  );

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit platform</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form
          className="mt-4 "
          onSubmit={form.handleSubmit(handleSubmitEditPlatform)}
        >
          <div className="space-y-4">
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

            <FormField
              control={form.control}
              name="faviconUrl"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Favicon url</FormLabel>
                  <FormControl>
                    <div className="flex justify-between">
                      <Input
                        className="w-4/5 border-primary bg-secondary
                          text-primary
                          "
                        placeholder="favicon url"
                        {...field}
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={field.value} alt="" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isEng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-16 flex items-center justify-between">
            <SheetClose asChild className="inline-block">
              <Button variant={"secondary"} onClick={handleSheetClose}>
                {"CLOSE"}
              </Button>
            </SheetClose>
            <Button>{"EDIT"}</Button>
          </div>
        </form>
      </Form>
    </SheetContent>
  );
};
