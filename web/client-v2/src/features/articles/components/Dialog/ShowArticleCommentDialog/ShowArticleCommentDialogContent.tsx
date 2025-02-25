"use client";

import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/shared/components/ui/dialog";
import { Textarea } from "@/shared/components/ui/textarea";

import { ShowArticleCommentDialogFragment } from "./ShowArticleCommentDialogFragment";

type ShowArticleCommentDialogContentProps = {
  data: FragmentOf<typeof ShowArticleCommentDialogFragment>;
  onClose: () => void;
};

export const ShowArticleCommentDialogContent: FC<
  ShowArticleCommentDialogContentProps
> = ({ data }) => {
  const fragment = readFragment(ShowArticleCommentDialogFragment, data);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{"Article Comment"}</DialogTitle>
        <DialogClose />
      </DialogHeader>
      <Textarea disabled rows={5} cols={30}>
        {fragment.comment}
      </Textarea>
    </DialogContent>
  );
};
