"use client";
import Link from "next/link";
import { FC } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ReadPostTooltipProps = {
  postUrl: string;
  size?: number;
};

export const ReadPostTooltip: FC<ReadPostTooltipProps> = ({
  postUrl,
  size = 32,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={postUrl} target="_blank">
            <BsBoxArrowUpRight className="inline-block" size={size} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Read Post</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
