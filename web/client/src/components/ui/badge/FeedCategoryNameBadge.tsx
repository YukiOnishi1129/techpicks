import { FC } from "react";

import { Badge } from "@/components/ui/badge";

type FeedCategoryNameBadgeProps = {
  name: string;
};

export const FeedCategoryNameBadge: FC<FeedCategoryNameBadgeProps> = ({
  name,
}: FeedCategoryNameBadgeProps) => {
  return (
    <Badge
      variant="default"
      className="bg-amber-600 text-xs text-white md:text-base"
    >
      {name}
    </Badge>
  );
};
