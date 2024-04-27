import { FC } from "react";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

export type ArticleSearchResultTemplateProps = {};

export const ArticleSearchResultTemplate: FC = () => {
  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Article Search Result",
      href: "/article/search/result",
    },
  ];
  return (
    <div>
      <PageBreadcrumb breadcrumbs={breadcrumbs} />
    </div>
  );
};
