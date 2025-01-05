import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { FeedArticleListTemplate } from "@/features/feeds/components/Template";

type FeedByIdPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function FeedByIdPage({
  params,
  searchParams,
}: FeedByIdPageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const { id } = await params;
  const q = await searchParams;
  const keyword = typeof q["keyword"] === "string" ? q["keyword"] : undefined;

  return <FeedArticleListTemplate id={id} keyword={keyword} />;
}
