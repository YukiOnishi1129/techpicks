import { redirect } from "next/navigation";
import { Suspense } from "react";

import { FeedDetailTemplate } from "@/features/feeds/components/Template";
import { getUser } from "@/features/users/actions/user";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

type FeedDetailPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FeedDetailPage({
  params,
  searchParams,
}: FeedDetailPageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const { id } = params;
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;
  return (
    <Suspense fallback={<ScreenLoader />}>
      <FeedDetailTemplate id={id} keyword={keyword} />
    </Suspense>
  );
}
