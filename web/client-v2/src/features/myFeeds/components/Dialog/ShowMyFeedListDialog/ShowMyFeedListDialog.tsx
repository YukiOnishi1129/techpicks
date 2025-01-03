"use client";

import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

import { ShowMyFeedListDialogContent } from "./ShowMyFeedListDialogContent";
import { ShowMyFeedListDialogFragment } from "./ShowMyFeedListDialogFragment";

// import { MyFeedFolderType } from "@/types/myFeedFolder";

type ShowMyFeedListDialogProps = {
  data: FragmentOf<typeof ShowMyFeedListDialogFragment>;
  buttonLabel: string;
};

export const ShowMyFeedListDialog: FC<ShowMyFeedListDialogProps> = ({
  data,
  buttonLabel,
}) => {
  const fragment = readFragment(ShowMyFeedListDialogFragment, data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <span className="text-xs">{buttonLabel}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"My Feed List"}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="h-[450px] overflow-y-scroll md:h-[400px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fragment.feeds?.map((feed) => (
              <ShowMyFeedListDialogContent
                key={`${fragment.id}-${feed.id}`}
                data={feed}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
