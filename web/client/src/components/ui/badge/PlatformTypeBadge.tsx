import { FC } from "react";

import { Badge } from "./badge";

type PlatformTypeBadgeProps = {
  platformSiteType: number;
};

export const PlatformTypeBadge: FC<PlatformTypeBadgeProps> = ({
  platformSiteType,
}: PlatformTypeBadgeProps) => {
  let typeName = "";
  switch (platformSiteType) {
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
