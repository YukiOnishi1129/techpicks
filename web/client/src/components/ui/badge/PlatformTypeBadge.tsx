import { FC } from "react";

import { Badge } from "./badge";

type PlatformTypeBadgeProps = {
  platformType: number;
};

export const PlatformTypeBadge: FC<PlatformTypeBadgeProps> = ({
  platformType,
}: PlatformTypeBadgeProps) => {
  let typeName = "";
  switch (platformType) {
    case 1:
      typeName = "Article Site";
      break;
    case 2:
      typeName = "Company Blog";
      break;
    case 3:
      typeName = "Summary Site";
      break;
    default:
      typeName = "Unknown";
      break;
  }
  return (
    <Badge variant="default" className="text-xs md:text-base">
      {typeName}
    </Badge>
  );
};
