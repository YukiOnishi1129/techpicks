import { FC } from "react";

import { BreadCrumbType } from "./PageBreadcrumb";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../breadcrumb";

type PageBreadcrumbItemProps = {
  breadcrumb: BreadCrumbType;
  index: number;
  length: number;
};

export const PageBreadcrumbItem: FC<PageBreadcrumbItemProps> = ({
  breadcrumb,
  index,
  length,
}: PageBreadcrumbItemProps) => {
  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink
          href={breadcrumb.href}
          className="max-w-[200px] truncate"
        >
          {breadcrumb.title}
        </BreadcrumbLink>
      </BreadcrumbItem>
      {index < length - 1 && <BreadcrumbSeparator />}
    </>
  );
};
