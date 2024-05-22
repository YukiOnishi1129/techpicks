"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter the name",
    })
    .min(1, { message: "Name is required" }),
  url: z
    .string({
      required_error: "Please enter the URL",
    })
    .url({ message: "Invalid URL" }),
  platformSiteType: z
    .string({
      required_error: "Please select the platform site type",
    })
    .min(1, { message: "Platform site type is required" }),
  faviconUrl: z
    .string({
      required_error: "Please enter the URL",
    })
    .url({ message: "Invalid URL" }),
  isEng: z
    .string({
      required_error: "Please select the language",
    })
    .min(1, { message: "Language is required" }),
});

type CreatePlatformDialogContentProps = {};

export const CreatePlatformDialogContent: FC<
  CreatePlatformDialogContentProps
> = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{"Add platform"}</DialogTitle>
      </DialogHeader>

      <div className="mt-4 flex w-full justify-start space-x-4">
        <DialogClose asChild>
          <Button>{"CLOSE"}</Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};
