"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { FC, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
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

import { useStatusToast } from "@/hooks/useStatusToast";

import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/constants/image";

import { fetchPlatformsCountAPI } from "../../actions/platform";
import { usePlatformRedirectPage } from "../../hooks/usePlatformRedirectPage";
import { createPlatform } from "../../repository/platform";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter the name",
    })
    .trim()
    .min(1, { message: "Name is required" }),
  url: z
    .string({
      required_error: "Please enter the URL",
    })
    .trim()
    .url({ message: "Invalid URL" }),
  platformSiteType: z
    .string({
      required_error: "Please select the platform site type",
    })
    .trim()
    .min(1, { message: "Platform site type is required" }),
  faviconUrl: z
    .string({
      required_error: "Please enter the URL",
    })
    .trim()
    .url({ message: "Invalid URL" }),
  isEng: z
    .string({
      required_error: "Please select the language",
    })
    .min(1, { message: "Language is required" }),
});

type CreatePlatformDialogContentProps = {
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  status?: string;
  handleDialogClose: () => void;
};

export const CreatePlatformDialogContent: FC<
  CreatePlatformDialogContentProps
> = ({
  offset,
  keyword,
  language,
  platformSiteType,
  status,
  handleDialogClose,
}) => {
  const { redirectPage } = usePlatformRedirectPage();
  const { successToast, failToast } = useStatusToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmitCreatePlatform = useCallback(
    async (values: z.infer<typeof FormSchema>) => {
      startTransition(async () => {
        if (!form.formState.isValid) return;

        // 1.check same platform
        const res = await fetchPlatformsCountAPI({
          siteUrl: values.url,
        });

        if (res.data.count > 0) {
          failToast({
            description: "Failed: already exists",
          });
          return;
        }

        // 2. create platform
        const createdId = await createPlatform({
          name: values.name,
          siteUrl: values.url,
          platformSiteType: Number(values.platformSiteType),
          faviconUrl: values.faviconUrl,
          isEng: values.isEng === "2",
        });
        if (!createdId) {
          failToast({
            description: "Fail: created platform failed",
          });
          return;
        }
        successToast({
          description: "Success: Create platform",
        });

        // 3. revalidate
        await redirectPage({
          offset,
          targetKeyword: keyword,
          targetLanguage: language,
          targetPlatformSiteType: platformSiteType,
          targetStatus: status,
        });
        handleDialogClose();
      });
    },
    [
      form,
      handleDialogClose,
      successToast,
      failToast,
      redirectPage,
      offset,
      keyword,
      language,
      platformSiteType,
      status,
    ]
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{"Add platform"}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          className="mt-4 "
          onSubmit={form.handleSubmit(handleSubmitCreatePlatform)}
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
            <DialogClose asChild className="inline-block">
              <Button variant={"secondary"} onClick={handleDialogClose}>
                {"CLOSE"}
              </Button>
            </DialogClose>
            {isPending ? (
              <Button disabled>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                PLEASE WAIT
              </Button>
            ) : (
              <Button disabled={!form.formState.isValid}>{"ADD"}</Button>
            )}
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
