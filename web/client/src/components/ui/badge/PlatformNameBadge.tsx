import { FC } from "react";

import { Badge } from "./badge";

type PlatformNameBadgeProps = {
  name: string;
};

export const PlatformNameBadge: FC<PlatformNameBadgeProps> = ({
  name,
}: PlatformNameBadgeProps) => {
  return (
    <Badge
      variant="default"
      className="bg-blue-700 text-xs text-white md:text-base"
    >
      {name}
    </Badge>
  );
};
