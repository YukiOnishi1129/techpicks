"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { FC, useCallback, useMemo, useTransition } from "react";
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

import { useStatusToast } from "@/hooks/useStatusToast";

import { PlatformType } from "@/types/platform";

import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/constants/image";

import { usePlatformRedirectPage } from "../../hooks/usePlatformRedirectPage";
import { updatePlatform } from "../../repository/platform";
import { DeletePlatformAlertDialog } from "../DeletePlatformAlertDialog";

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
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  status?: string;
  handleSheetClose: () => void;
};

export const EditPlatformSheetContent: FC<EditPlatformSheetContentProps> = ({
  platform,
  offset,
  keyword,
  language,
  platformSiteType,
  status,
  handleSheetClose,
}) => {
  const { redirectPage } = usePlatformRedirectPage();
  const { successToast, failToast } = useStatusToast();
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

  const inputName = form.watch("name");
  const inputUrl = form.watch("url");
  const inputPlatformSiteType = form.watch("platformSiteType");
  const inputFaviconUrl = form.watch("faviconUrl");
  const inputIsEng = form.watch("isEng");

  const isEditDisabledCheck = useMemo(() => {
    return (
      platform.name === inputName &&
      platform.siteUrl === inputUrl &&
      platform.platformSiteType === Number(inputPlatformSiteType) &&
      platform.faviconUrl === inputFaviconUrl &&
      platform.isEng === (inputIsEng === "2")
    );
  }, [
    platform,
    inputName,
    inputUrl,
    inputPlatformSiteType,
    inputFaviconUrl,
    inputIsEng,
  ]);

  const handleSubmitEditPlatform = useCallback(
    (values: z.infer<typeof FormSchema>) => {
      startTransition(async () => {
        if (isEditDisabledCheck) return;

        const updatedId = await updatePlatform({
          id: platform.id,
          name: values.name,
          siteUrl: values.url,
          platformSiteType: Number(values.platformSiteType),
          faviconUrl: values.faviconUrl,
          isEng: values.isEng === "2",
        });
        if (!updatedId) {
          failToast({
            description: "Failed: update platform",
          });
          return;
        }
        successToast({
          description: "Success: Update platform",
        });

        // 3. revalidate
        await redirectPage({
          offset,
          targetKeyword: keyword,
          targetLanguage: language,
          targetPlatformSiteType: platformSiteType,
          targetStatus: status,
        });
      });
    },
    [
      isEditDisabledCheck,
      platform,
      offset,
      keyword,
      language,
      platformSiteType,
      status,
      redirectPage,
      startTransition,
      successToast,
      failToast,
    ]
  );

  return (
    <SheetContent className="h-screen overflow-y-scroll">
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
                  <FormLabel>
                    Platform name
                    <span className="text-red-700"> *</span>
                  </FormLabel>
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
                  <FormLabel>
                    Platform url
                    <span className="text-red-700"> *</span>
                  </FormLabel>
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
                  <FormLabel>
                    Platform site type
                    <span className="text-red-700"> *</span>
                  </FormLabel>
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
                  <FormLabel>
                    Favicon url
                    <span className="text-red-700"> *</span>
                  </FormLabel>
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
                      <img
                        className="size-8 bg-white"
                        src={field.value}
                        alt=""
                      />
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
                  <FormLabel>
                    Language
                    <span className="text-red-700"> *</span>
                  </FormLabel>
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
              <Button variant={"outline"} onClick={handleSheetClose}>
                {"CLOSE"}
              </Button>
            </SheetClose>
            {isPending ? (
              <Button disabled>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                PLEASE WAIT
              </Button>
            ) : (
              <Button disabled={!form.formState.isValid || isEditDisabledCheck}>
                {"EDIT"}
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="mt-12 flex ">
        <DeletePlatformAlertDialog
          platformId={platform.id}
          platformTitle={platform.name}
          disabled={platform.feeds.length !== 0}
        />
      </div>
    </SheetContent>
  );
};
