import { FC } from "react";
import { SyncLoader } from "react-spinners";

type SyncLoaderComponentProps = {
  loading?: boolean;
  color?: string;
  speedMultiplier?: number;
  size?: number;
  margin?: number;
};

export const SyncLoaderComponent: FC<SyncLoaderComponentProps> = ({
  loading = true,
  color = "#36d7b7",
  speedMultiplier = 1,
  size = 15,
  margin = 2,
}: SyncLoaderComponentProps) => {
  return (
    <SyncLoader
      loading={loading}
      color={color}
      speedMultiplier={speedMultiplier}
      size={size}
      margin={margin}
      className="inline-block"
    />
  );
};
