import { fetchFeedsAPI } from "@/features/feeds/actions/feed";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { ArticleSearchForm } from "../ArticleSearchForm";

export const ArticleSearchTemplate = async () => {
  const res = await fetchFeedsAPI({});
  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Article Search",
      href: "/article/search",
    },
  ];

  return (
    <div className="w-auto">
      <div className="my-4">
        <PageBreadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <div className="my-4 hidden w-full items-end justify-between px-4  md:flex">
        <h1 className="text-2xl font-bold">Article Search</h1>
      </div>
      <div className="mb-12 mt-8 md:mt-2">
        <ArticleSearchForm feedList={res.data.feeds} />
      </div>
    </div>
  );
};
