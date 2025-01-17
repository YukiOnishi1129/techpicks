"use client";

import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useCallback, FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { UpsertArticleCommentMutation } from "@/features/articles/mutations/UpsertArticleCommentMutation";
import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";

import { Button } from "@/shared/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import { useStatusToast } from "@/shared/hooks/useStatusToast";

const FormSchema = z.object({
  comment: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .max(255, "Title must be less than 25 characters"),
});

type CreateArticleCommentDialogContentProps = {
  articleId: string;
  articleTitle: string;
};

export const CreateArticleCommentDialogContent: FC<
  CreateArticleCommentDialogContentProps
> = ({ articleId, articleTitle }) => {
  const { successToast, failToast } = useStatusToast();
  const [isPending, startTransition] = useTransition();

  const [upsertArticleCommentMutation] = useMutation(
    UpsertArticleCommentMutation
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      startTransition(async () => {
        const user = await getUser();
        if (!user) {
          failToast({
            description: "Please login to create a favorite article folder",
          });
          await logoutToLoginPage();
          return;
        }
      });

      const { errors } = await upsertArticleCommentMutation({
        variables: {
          input: {
            articleId,
            comment: data.comment,
          },
        },
        update: (cache, { data }) => {
          if (!data) return;
          cache.modify({
            id: cache.identify({
              __typename: "Article",
              id: articleId,
            }),
            fields: {
              comment() {
                return data.upsertArticleComment.comment;
              },
            },
          });
        },
      });

      if (errors && errors.length > 0) {
        // TODO: Modify the error message response on the BFF side
        const errMsg =
          errors[0].message.indexOf(
            "comment does not exist as update target"
          ) != -1
            ? "comment does not exist as update target"
            : errors[0].message;
        failToast({
          description: errMsg,
        });
        return;
      }

      successToast({
        description: `add comment at article title: '${articleTitle}'`,
      });
    },
    [
      articleId,
      failToast,
      upsertArticleCommentMutation,
      successToast,
      articleTitle,
    ]
  );

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Add Article Comment"}</DialogTitle>
        <DialogDescription>{`title: '${articleTitle}'`}</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold">
                  COMMENT
                  <span className="text-red-700"> *</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="block w-full border-primary bg-secondary text-primary"
                    placeholder="Comment"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex w-full justify-between space-x-4">
            <DialogClose asChild>
              <Button variant={"outline"} onClick={resetDialog}>
                {"CLOSE"}
              </Button>
            </DialogClose>
            {isPending ? (
              <Button disabled>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                PLEASE WAIT
              </Button>
            ) : (
              <Button
                disabled={!form.formState.isValid || isPending}
                type="submit"
              >
                {"ADD"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
