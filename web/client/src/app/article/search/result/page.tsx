import { ArticleSearchResultTemplate } from "@/features/search/components/articles/ArticleSearchResultTemplate";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";
import { PlatformType } from "@/types/platform";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ArticleSearchResultPage({
  searchParams,
}: PageProps) {
  const languageStatus =
    typeof searchParams["languageStatus"] === "string"
      ? (parseInt(searchParams["languageStatus"]) as LanguageStatus)
      : 1;

  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  const platformType =
    typeof searchParams["platformType"] === "string"
      ? (parseInt(searchParams["platformType"]) as PlatformType)
      : undefined;

  let platformIdList: Array<string> = [];
  if (
    typeof searchParams["platformId"] !== "string" &&
    searchParams["platformId"]
  )
    platformIdList = searchParams["platformId"];

  if (typeof searchParams["platformId"] === "string")
    platformIdList.push(searchParams["platformId"]);

  const tab =
    typeof searchParams["tab"] === "string"
      ? (searchParams["tab"] as ArticleTabType)
      : "unknown";

  return (
    <ArticleSearchResultTemplate
      languageStatus={languageStatus}
      keyword={keyword}
      platformType={platformType}
      platformIdList={platformIdList}
      tab={tab}
    />
  );
}
