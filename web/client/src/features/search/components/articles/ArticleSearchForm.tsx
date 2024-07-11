"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectMultiFeedDialog } from "@/features/feeds/components/Dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { FeedType } from "@/types/feed";
import { SelectOptionType } from "@/types/util";

import { serverRevalidatePage } from "@/actions/serverAction";

const formSchema = z.object({
  keyword: z.string().optional(),
  targetFeedList: z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .array(),
  language: z.string().optional(),
  platformSiteType: z.string(),
});

type ArticleSearchFormProps = {
  feedList: Array<FeedType>;
};

export const ArticleSearchForm: FC<ArticleSearchFormProps> = ({ feedList }) => {
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      language: "0",
      platformSiteType: "0",
      targetFeedList: [],
    },
  });

  const handleSelectFeedList = useCallback(
    (selectedFeedList: Array<SelectOptionType>) => {
      form.setValue("targetFeedList", selectedFeedList);
    },
    [form]
  );

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";

    if (values.keyword !== "") {
      keywordPath = `&keyword=${values.keyword}`;
    }
    let platformTypePath = "";
    if (values.platformSiteType) {
      platformTypePath = `&platformSiteType=${values.platformSiteType}`;
    }
    let feedIdPath = "";
    if (values.targetFeedList) {
      feedIdPath = values.targetFeedList
        .map((target) => `&feedId=${target.id}`)
        .join("");
    }
    await serverRevalidatePage(pathname);
    router.replace(
      `/article/search/result?languageStatus=${values.language}${keywordPath}${platformTypePath}${feedIdPath}`
    );
    resetDialog();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className=" border-2  p-4">
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>Keyword</FormLabel>
                  <FormControl>
                    <Input
                      className="border-primary bg-secondary text-primary"
                      placeholder="search keyword"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* language */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid-cols-2 md:grid-cols-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"0"} id={"language-0"} />
                        <Label htmlFor="language-0">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"1"} id={"language-1"} />
                        <Label htmlFor="language-1">Japanese</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"2"} id={"language-2"} />
                        <Label htmlFor="language-2">English</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* platform type*/}
            {/* <FormField
              control={form.control}
              name="platformSiteType"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>PlatformType</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid-cols-2 md:grid-cols-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"0"} id={"platform-type-0"} />
                        <Label htmlFor="platform-type-0">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"1"} id={"platform-type-1"} />
                        <Label htmlFor="platform-type-1">Site</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"2"} id={"platform-type-2"} />
                        <Label htmlFor="platform-type-2">Company</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"3"} id={"platform-type-3"} />
                        <Label htmlFor="platform-type-3">Summary</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* feed */}

            <FormField
              control={form.control}
              name="targetFeedList"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>Feeds</FormLabel>
                  <SelectMultiFeedDialog
                    feedList={feedList}
                    selectedFeedList={field.value}
                    handleSelectFeedList={handleSelectFeedList}
                  />
                  <FormControl>
                    <div className="flex w-full flex-wrap rounded-md border-primary bg-secondary p-2 text-primary">
                      {field.value.map((feed) => {
                        return <span key={feed.id}># {feed.label}</span>;
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-8 flex w-full justify-center space-x-4">
            <Button type="submit">{"SEARCH"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
