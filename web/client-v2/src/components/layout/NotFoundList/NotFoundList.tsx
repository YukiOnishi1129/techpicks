import { FC } from "react";

type NotFoundListProps = {
  message: string;
};

export const NotFoundList: FC<NotFoundListProps> = ({
  message,
}: NotFoundListProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-center text-lg font-bold text-gray-500 md:text-xl">
        {message}
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="mt-8 h-1/2" src="/sorry.png" alt="" />
    </div>
  );
};
