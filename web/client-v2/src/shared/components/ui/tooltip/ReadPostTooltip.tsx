"use client";
import Link from "next/link";
import { FC } from "react";
import { IconContext } from "react-icons";
import { BsBoxArrowUpRight } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

type ReadPostTooltipProps = {
  postUrl: URL;
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
            <IconContext.Provider
              value={{ className: "hover:text-emerald-600" }}
            >
              <BsBoxArrowUpRight className="inline-block" size={size} />
            </IconContext.Provider>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Read Post</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
