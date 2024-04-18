"use client";

import { Loader } from "lucide-react";
import { FC } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type LanguageSwitchProps = {
  isEng: boolean;
  isLoading: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
};

export const LanguageSwitch: FC<LanguageSwitchProps> = ({
  isEng,
  isLoading,
  label,
  onCheckedChange,
}: LanguageSwitchProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      {isLoading ? (
        <Loader />
      ) : (
        <Switch
          id="airplane-mode"
          checked={isEng}
          onCheckedChange={onCheckedChange}
        />
      )}

      <Label htmlFor="airplane-mode">{label}</Label>
    </div>
  );
};
