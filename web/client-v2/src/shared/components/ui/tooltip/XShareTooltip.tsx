"use client";
import { FC } from "react";
import { IconContext } from "react-icons";
import { BsTwitterX } from "react-icons/bs";
import { TwitterShareButton } from "react-share";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

type XShareTooltipProps = {
  shareTitle: string;
  shareUrl: string;
  size?: number;
};

export const XShareTooltip: FC<XShareTooltipProps> = ({
  shareTitle,
  shareUrl,
  size = 36,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <TwitterShareButton title={shareTitle} url={shareUrl}>
            <IconContext.Provider
              value={{ className: "hover:text-emerald-600" }}
            >
              <BsTwitterX className="inline-block" size={size} />
            </IconContext.Provider>
          </TwitterShareButton>
        </TooltipTrigger>
        <TooltipContent>
          <p>X Share</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
