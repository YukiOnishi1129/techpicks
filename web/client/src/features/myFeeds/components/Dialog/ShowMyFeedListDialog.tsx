"use client";

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

import { useCheckImageExist } from "@/hooks/useImage";

import { MyFeedFolderType } from "@/types/myFeedFolder";

type ShowMyFeedListDialogProps = {
  buttonLabel: string;
  feeds: MyFeedFolderType["feeds"];
};

export const ShowMyFeedListDialog: FC<ShowMyFeedListDialogProps> = ({
  buttonLabel,
  feeds,
}) => {
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
            {feeds.map((feed) => (
              <ShowMyFeedCard
                key={feed.id}
                feedName={feed.name}
                feedDescription={feed.description}
                thumbnailUrl={feed.thumbnailUrl}
                platformFaviconUrl={feed.platform.faviconUrl}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type ShowMyFeedListDialogContentProps = {
  feedName: string;
  feedDescription: string;
  thumbnailUrl: string;
  platformFaviconUrl: string;
};

const ShowMyFeedCard: FC<ShowMyFeedListDialogContentProps> = ({
  feedName,
  feedDescription,
  thumbnailUrl,
  platformFaviconUrl,
}) => {
  const imageUrl = useCheckImageExist(thumbnailUrl);
  const faviconUrl = useCheckImageExist(platformFaviconUrl);

  return (
    <div className="relative h-[450px] w-full cursor-pointer rounded border-2 px-4 py-2 md:h-[210px]">
      <div className="mt-2 flex h-10 md:mt-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="inline-block size-8 rounded-full shadow-md"
          src={faviconUrl}
          alt=""
        />
      </div>

      <div>
        <div className="mt-0 md:mt-4">
          <h3 className="line-clamp-2 h-[48px] text-left text-lg font-bold tracking-wide md:h-full md:text-xl">
            {feedName}
          </h3>

          <div className="mt-2 flex justify-center md:hidden md:w-[30%]">
            <div className="max-h-[200px] w-full md:h-36 md:max-h-[70px] md:w-48">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mx-auto h-full rounded-lg border-2 object-cover object-center shadow-md"
                src={imageUrl}
                alt=""
              />
            </div>
          </div>

          <div className="mt-2">
            <p className="line-clamp-3 h-[62px] text-sm">{feedDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
