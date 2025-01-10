"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { serverRevalidatePage } from "@/shared/actions/actServerRevalidatePage";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
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

const formSchema = z.object({
  keyword: z.string().optional(),
});

type SearchArticleDialogContentProps = {
  keywordList: Array<string>;
  onClose: () => void;
};

export const SearchArticleDialogContent: FC<
  SearchArticleDialogContentProps
> = ({ keywordList, onClose }) => {
  const router = useRouter();
  const keyword = joinWithSpace(keywordList);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword,
    },
  });

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";
    if (!!values.keyword && values.keyword.trim() !== "") {
      const keywordArray = splitBySpace(values.keyword);
      keywordPath = keywordArray
        .map((keyword) => `&keyword=${keyword}`)
        .join("");
    }

    await serverRevalidatePage(`/search/article?dummy=dummy${keywordPath}`);
    router.replace(`/search/article?dummy=dummy${keywordPath}`);
    resetDialog();
    onClose();
  };

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Search"}</DialogTitle>
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
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
