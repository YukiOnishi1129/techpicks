"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useCallback, useState, ClipboardEvent, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getOgpData } from "@/features/ogp/actions/ogp";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { OgpType } from "@/types/ogp";

export const CreateBookmarkDialog = () => {
  const [ogpData, setOgpData] = useState<OgpType | null>(null);
  const [isPending, startTransition] = useTransition();
  const FormSchema = z.object({
    url: z.string().min(1, {
      message: "Please enter a valid URL",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const ogp = await getOgpData(data.url);
      setOgpData(ogp);
    });
  }, []);

  const onPaste = useCallback(
    async (event: ClipboardEvent<HTMLInputElement>) => {
      const pastedText = event.clipboardData?.getData("text");
      onSubmit({ url: pastedText });
    },
    [onSubmit]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{"Add new article"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Add New Bookmark Article"}</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        type="url"
                        pattern="https://.*|http://.*"
                        onPaste={onPaste}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {
                        "Please enter the URL of the article you want to bookmark"
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Button type="submit" disabled={isPending}>
                Submit
              </Button> */}
            </form>
          </Form>
        </div>
        {isPending && <Loader />}
        {ogpData && (
          <div className="mt-8 flex h-[200px] w-full justify-around overflow-y-scroll">
            <div className="w-2/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ogpData.image} alt="" />
            </div>
            <div className="w-2/5">
              <h3>{ogpData.title}</h3>
              <p className="overflow-hidden truncate">{ogpData.description}</p>

              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="size-6" src={ogpData.favIconImage} alt="" />
                <span>
                  <Link href={ogpData.siteUrl} target="_blank">
                    {ogpData.siteName}
                  </Link>
                </span>
              </div>
            </div>
          </div>
        )}
        <DialogClose>
          <Button>{"Close"}</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
