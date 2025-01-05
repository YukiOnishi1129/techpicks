import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { BookmarkTemplate } from "@/features/bookmarks/components/Template";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BookmarkPage({ searchParams }: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const q = await searchParams;

  const keyword = typeof q["keyword"] === "string" ? q["keyword"] : undefined;

  return <BookmarkTemplate user={user} keyword={keyword} />;
}
