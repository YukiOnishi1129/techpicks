"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { SelectOptionType } from "@/types/utils";

import { serverRevalidatePage } from "@/actions/actServerRevalidatePage";

const formSchema = z.object({
  keyword: z.string().optional(),
  targetFeedList: z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .array(),
});

type SearchArticleListFormProps = {
  feedsEndCursor?: string;
};

export const SearchArticleListForm: FC<SearchArticleListFormProps> = ({
  feedsEndCursor,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
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
    let feedIdPath = "";
    if (values.targetFeedList) {
      feedIdPath = values.targetFeedList
        .map((target) => `&feedId=${target.id}`)
        .join("");
    }
    await serverRevalidatePage(pathname);
    router.replace(`/search/article?dummy=dummy${keywordPath}${feedIdPath}`);
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

            {/* feed */}
            <FormField
              control={form.control}
              name="targetFeedList"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>Feeds</FormLabel>
                  <div>
                    <SelectMultiFeedDialog
                      feedsEndCursor={feedsEndCursor}
                      selectedFeedList={field.value}
                      onSelectFeedList={handleSelectFeedList}
                    />
                  </div>

                  <FormControl>
                    {field.value.length > 0 && (
                      <div className="mt-4 flex  w-full flex-wrap  rounded-md border-primary bg-secondary p-2 text-primary">
                        {field.value.map((feed) => {
                          return (
                            <span
                              className="mb-2 mr-2 block max-w-64 truncate rounded-full bg-primary-foreground px-2 py-1 text-xs font-normal text-amber-600 "
                              key={feed.id}
                            >
                              # {feed.label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4 flex w-full justify-center space-x-4">
            <Button type="submit">{"SEARCH"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
