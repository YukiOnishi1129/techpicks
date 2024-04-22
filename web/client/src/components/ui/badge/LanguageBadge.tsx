import { FC } from "react";

import { Badge } from "@/components/ui/badge";

type PlatformTypeBadgeProps = {
  isEng: boolean;
};

export const LanguageBadge: FC<PlatformTypeBadgeProps> = ({
  isEng,
}: PlatformTypeBadgeProps) => {
  const typeName = isEng ? "English" : "Japanese";
  return (
    <Badge variant="secondary" className="text-xs md:text-base">
      {typeName}
    </Badge>
  );
};
