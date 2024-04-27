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
      className="bg-amber-600  text-xs text-white md:text-base"
    >
      {name}
    </Badge>
  );
};
