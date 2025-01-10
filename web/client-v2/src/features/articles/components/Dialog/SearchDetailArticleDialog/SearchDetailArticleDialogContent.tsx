"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { z } from "zod";

import { SelectMultiFeedDialog } from "@/features/feeds/components/Dialog";

import { serverRevalidatePage } from "@/shared/actions/actServerRevalidatePage";
import { Button } from "@/shared/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { joinWithSpace, splitBySpace } from "@/shared/lib/utils";
import { SelectOptionType } from "@/shared/types/utils";

const formSchema = z.object({
  keyword: z.string().optional(),
  targetFeedList: z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .array(),
});

type SearchDetailArticleDialogContentProps = {
  keywordList: Array<string>;
  selectedFeedList?: Array<SelectOptionType>;
  feedsEndCursor?: string;
  onClose: () => void;
};

export const SearchDetailArticleDialogContent: FC<
  SearchDetailArticleDialogContentProps
> = ({ keywordList, selectedFeedList = [], feedsEndCursor, onClose }) => {
  const router = useRouter();
  const keyword = joinWithSpace(keywordList);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: keyword ?? "",
      targetFeedList: selectedFeedList.map((feed) => ({
        id: feed.id,
        label: feed.label,
      })),
    },
  });

  const handleSelectFeedList = useCallback(
    (selectedFeedList: Array<SelectOptionType>) => {
      form.setValue("targetFeedList", selectedFeedList);
    },
    [form]
  );

  const handleRemoveSelectedFeed = useCallback(
    (targetFeedId: string) => {
      form.setValue(
        "targetFeedList",
        form.getValues("targetFeedList").filter((f) => f.id !== targetFeedId)
      );
    },
    [form]
  );

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      let keywordPath = "";
      if (!!values.keyword && values.keyword.trim() !== "") {
        const keywordArray = splitBySpace(values.keyword);
        keywordPath = keywordArray
          .map((keyword) => `&keyword=${keyword}`)
          .join("");
      }
      let feedIdPath = "";
      if (values.targetFeedList) {
        feedIdPath = values.targetFeedList
          .map((feed) => `&feedId=${feed.id}`)
          .join("");
      }
      await serverRevalidatePage(
        `/search/article?dummy=1${keywordPath}${feedIdPath}`
      );
      router.replace(`/search/article?dummy=1${keywordPath}${feedIdPath}`);
      resetDialog();
      onClose();
    },
    [onClose, resetDialog, router]
  );

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Article Search"}</DialogTitle>
      </DialogHeader>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="h-[300px] overflow-y-scroll border-2 p-4">
              <FormField
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem className="mb-4">
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
                        selectedFeedList={field.value}
                        feedsEndCursor={feedsEndCursor}
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
                                <Button
                                  variant={"ghost"}
                                  size="sm"
                                  onClick={() =>
                                    handleRemoveSelectedFeed(feed.id)
                                  }
                                >
                                  <RxCross2 />
                                </Button>
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

            <div className="mt-4 flex w-full justify-between space-x-4">
              <DialogClose>
                <Button variant={"outline"} onClick={resetDialog}>
                  {"CLOSE"}
                </Button>
              </DialogClose>
              <Button type="submit">{"SEARCH"}</Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
