import { fetchPlatformAPI } from "@/features/platforms/actions/platform";
import { getUser } from "@/features/users/actions/user";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { ArticleSearchForm } from "./ArticleSearchForm";

export const ArticleSearchTemplate = async () => {
  const user = await getUser();
  const platforms = await fetchPlatformAPI({});

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

      <div className="hidden w-full items-end justify-between  px-4 md:flex">
        <h1 className="mb-4 mt-8 text-2xl font-bold">Article Search</h1>
      </div>
      <div className="mt-8">
        <ArticleSearchForm platforms={platforms} />
      </div>
    </div>
  );
};
