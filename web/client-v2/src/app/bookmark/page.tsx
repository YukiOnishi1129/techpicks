import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { BookmarkTemplate } from "@/features/bookmarks/components/Template";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function BookmarkPage({ searchParams }: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  return <BookmarkTemplate user={user} keyword={keyword} />;
}
