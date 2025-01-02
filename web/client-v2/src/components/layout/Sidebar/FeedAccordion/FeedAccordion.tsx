"use client";

import { FragmentOf, readFragment } from "gql.tada";
import Link from "next/link";
import { FC } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FeedAccordionFragment } from "./FeedAccordionFragment";

type FeedAccordionProps = {
  data: FragmentOf<typeof FeedAccordionFragment>;
};

export const FeedAccordion: FC<FeedAccordionProps> = ({ data }) => {
  const fragment = readFragment(FeedAccordionFragment, data);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="py-2"></AccordionTrigger>
        <AccordionContent>
          {fragment.feeds?.map((feed) => (
            <div
              key={`${fragment.id}-${feed.id}`}
              className="mb-2 w-full cursor-pointer truncate pl-8 pt-2 first:mt-2"
            >
              <Link
                href={`/feed/${feed.id}`}
                className="flex items-center truncate"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="size-4" src={feed.platform.faviconUrl} alt="" />

                <span className="ml-2 inline-block w-full truncate">
                  {feed.name}
                </span>
              </Link>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
