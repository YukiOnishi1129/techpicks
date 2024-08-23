"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

type ArticleKeyWordSearchDialogProps = {};

export const ArticleKeyWordSearchDialog: FC<
  ArticleKeyWordSearchDialogProps
> = () => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer rounded-full border-2 border-white bg-primary p-4">
        <FaSearch size="24" color="black" />
      </DialogTrigger>
      {open && <ArticleKeyWordSearchDialogContent handleClose={handleClose} />}
    </Dialog>
  );
};

type ArticleKeyWordSearchDialogContentProps = {
  handleClose: () => void;
};

const ArticleKeyWordSearchDialogContent: FC<
  ArticleKeyWordSearchDialogContentProps
> = ({ handleClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";
    if (!!values.keyword && values.keyword.trim() === "") {
      keywordPath = `keyword=${values.keyword}`;
    }

    await serverRevalidatePage(`/article/search/result?${keywordPath}`);
    router.replace(`/article/search/result?${keywordPath}`);
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
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
