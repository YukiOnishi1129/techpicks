import { FC } from "react";

import { ReadPostTooltip, XShareTooltip } from "../tooltip";

type ShareLinksProps = {
  shareTitle: string;
  shareUrl: string;
  postIconSize?: number;
  xIconSize?: number;
};

export const ShareLinks: FC<ShareLinksProps> = ({
  shareTitle,
  shareUrl,
  postIconSize = 18,
  xIconSize = 18,
}) => {
  let newUrl: URL | undefined = undefined;
  try {
    newUrl = new URL(shareUrl);
  } catch (e) {
    console.log(`Invalid URL at ShareLinks components: ${shareUrl}`);
  }
  return (
    <div className="flex items-center justify-center gap-3">
      {newUrl ? (
        <ReadPostTooltip postUrl={newUrl} size={postIconSize} />
      ) : (
        <span>{shareUrl}</span>
      )}
      <XShareTooltip
        shareTitle={shareTitle}
        shareUrl={shareUrl}
        size={xIconSize}
      />
    </div>
  );
};
