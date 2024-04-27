import { Loader } from "lucide-react";
import { Suspense } from "react";

import { HomeTemplate } from "@/features/home/components/HomeTemplate";

import { LanguageStatus } from "@/types/language";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: PageProps) {
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

  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <HomeTemplate
          languageStatus={languageStatus}
          keyword={keyword}
          platformIdList={platformIdList}
        />
      </Suspense>
    </>
  );
}
