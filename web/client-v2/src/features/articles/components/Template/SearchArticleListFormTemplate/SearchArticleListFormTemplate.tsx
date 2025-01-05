import {
  BreadCrumbType,
  PageBreadcrumb,
} from "@/shared/components/ui/breadcrumb";

import { listServerFeedSearchArticleListFormTemplateQuery } from "./actListServerFeedSearchArticleListFormTemplateQuery";
import { SearchArticleListForm } from "../../Form";

export const SearchArticleListFormTemplate = async () => {
  const { data, error } =
    await listServerFeedSearchArticleListFormTemplateQuery();
  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Article Search",
      href: "/search",
    },
  ];

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="w-auto">
      <div className="my-4">
        <PageBreadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <div className="my-4 hidden w-full items-end justify-between px-4  md:flex">
        <h1 className="text-2xl font-bold">Article Search</h1>
      </div>
      <div className="mb-12 mt-8 md:mt-2">
        <SearchArticleListForm
          feedsEndCursor={data?.initFeeds?.pageInfo?.endCursor || undefined}
        />
      </div>
    </div>
  );
};
