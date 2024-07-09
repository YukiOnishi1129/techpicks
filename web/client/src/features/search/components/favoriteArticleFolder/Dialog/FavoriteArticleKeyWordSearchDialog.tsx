"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

type FavoriteArticleKeyWordSearchDialogProps = {
  favoriteArticleFolderId: string;
  keyword?: string;
};

export const FavoriteArticleKeyWordSearchDialog: FC<
  FavoriteArticleKeyWordSearchDialogProps
> = ({ favoriteArticleFolderId, keyword }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer rounded-full border-2 border-white bg-primary p-4">
        <FaSearch size="24" color="black" />
      </DialogTrigger>
      {open && (
        <FavoriteArticleKeyWordSearchDialogContent
          favoriteArticleFolderId={favoriteArticleFolderId}
          keyword={keyword}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
};

type FavoriteArticleKeyWordSearchDialogContentProps = {
  favoriteArticleFolderId: string;
  keyword?: string;
  handleClose: () => void;
};

const FavoriteArticleKeyWordSearchDialogContent: FC<
  FavoriteArticleKeyWordSearchDialogContentProps
> = ({ favoriteArticleFolderId, keyword, handleClose }) => {
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
    let keywordPath = "";
    if (!!values.keyword && values.keyword.trim() !== "") {
      keywordPath = `keyword=${values.keyword}`;
    }
    await serverRevalidatePage(pathname);
    router.replace(
      `/favorite-article-folder/${favoriteArticleFolderId}?${keywordPath}`
    );
    resetDialog();
    handleClose();
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
