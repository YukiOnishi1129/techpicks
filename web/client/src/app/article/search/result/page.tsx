import { ArticleSearchResultTemplate } from "@/features/search/components/articles/ArticleSearchResultTemplate";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

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
      : "trend";

  return (
    <ArticleSearchResultTemplate
      languageStatus={languageStatus}
      keyword={keyword}
      platformIdList={platformIdList}
      tab={tab}
    />
  );
}
