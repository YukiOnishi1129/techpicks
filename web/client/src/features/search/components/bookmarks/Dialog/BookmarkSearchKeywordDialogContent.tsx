"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { serverRevalidatePage } from "@/actions/serverAction";

const formSchema = z.object({
  keyword: z.string().optional(),
});

type BookmarkSearchKeywordDialogContentProps = {
  keyword?: string;
  handleClose: () => void;
};

export const BookmarkSearchKeywordDialogContent: FC<
  BookmarkSearchKeywordDialogContentProps
> = ({ keyword, handleClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: keyword ?? "",
    },
  });

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!!values.keyword && values.keyword.trim() === "") return;
    const keywordPath = `keyword=${values.keyword}`;
    await serverRevalidatePage(pathname);
    router.replace(`/bookmark?${keywordPath}`);
    resetDialog();
    handleClose();
  };

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Bookmark Search"}</DialogTitle>
      </DialogHeader>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
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
            </div>

            <div className="mt-8 flex w-full justify-between space-x-4">
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
