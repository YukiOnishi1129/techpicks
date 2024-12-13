import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { FeedArticleListTemplate } from "@/features/feeds/components/Template";

type FeedByIdPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FeedByIdPage({
  params,
  searchParams,
}: FeedByIdPageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const { id } = params;
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  return <FeedArticleListTemplate id={id} keyword={keyword} />;
}
