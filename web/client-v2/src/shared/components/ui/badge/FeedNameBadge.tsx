import { FC } from "react";

import { Badge } from "./badge";

type FeedNameBadgeProps = {
  name: string;
};

export const FeedNameBadge: FC<FeedNameBadgeProps> = ({
  name,
}: FeedNameBadgeProps) => {
  return (
    <Badge
      variant="default"
      className="truncate bg-amber-600 px-2 text-xs text-white md:text-base"
    >
      {name}
    </Badge>
  );
};
