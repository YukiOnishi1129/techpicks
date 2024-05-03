import { FC } from "react";

import { ReadPostTooltip } from "../tooltip";
import { XShareTooltip } from "../tooltip/XShareTooltip";

type ShareLinksProps = {
  shareTitle: string;
  shareUrl: string;
  postIconSize?: number;
  xIconSize?: number;
};

export const ShareLinks: FC<ShareLinksProps> = ({
  shareTitle,
  shareUrl,
  postIconSize = 24,
  xIconSize = 24,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="mr-4">
        <ReadPostTooltip postUrl={shareUrl} size={postIconSize} />
      </div>
      <div>
        <XShareTooltip
          shareTitle={shareTitle}
          shareUrl={shareUrl}
          size={xIconSize}
        />
      </div>
    </div>
  );
};
