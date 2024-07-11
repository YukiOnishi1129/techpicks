"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { z } from "zod";

import { SelectMultiFeedDialog } from "@/features/feeds/components/Dialog";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
});

type ArticleSearchDialogContentProps = {
  keyword?: string;
  selectedFeedList?: Array<FeedType>;
  initialFeedList: Array<FeedType>;
  handleClose: () => void;
};

export const ArticleSearchDialogContent: FC<
  ArticleSearchDialogContentProps
> = ({
  keyword,
  selectedFeedList = [],
  initialFeedList,
  handleClose,
}: ArticleSearchDialogContentProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: keyword ?? "",
      targetFeedList: selectedFeedList.map((feed) => ({
        id: feed.id,
        label: feed.name,
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";
    if (!!values.keyword && values.keyword.trim() !== "") {
      keywordPath = `&keyword=${values.keyword}`;
    }
    let feedIdPath = "";
    if (values.targetFeedList) {
      feedIdPath = values.targetFeedList
        .map((feed) => `&feedId=${feed.id}`)
        .join("");
    }
    await serverRevalidatePage(
      `/article/search/result?dummy=1${keywordPath}${feedIdPath}`
    );
    router.replace(`/article/search/result?dummy=1${keywordPath}${feedIdPath}`);
    resetDialog();
    handleClose();
  };

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
                        feedList={initialFeedList}
                        selectedFeedList={field.value}
                        handleSelectFeedList={handleSelectFeedList}
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
