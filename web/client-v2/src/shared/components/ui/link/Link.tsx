"use client";

import NextLink from "next/link";
import {
  FC,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  PropsWithChildren,
} from "react";

import { useGenerateExternalUrl } from "@/shared/hooks/useGenerateExternalUrl";

type Props = {
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  url: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export const Link: FC<PropsWithChildren<Props>> = ({
  url,
  children,
  onClick,
  target,
  ...props
}) => {
  const href = useGenerateExternalUrl(url);
  if (!href) {
    return <div className={props.className}>{children}</div>;
  }
  return (
    <NextLink
      href={href}
      onClick={onClick}
      target={target}
      className={props.className}
    >
      {children}
    </NextLink>
  );
};
