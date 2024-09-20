import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";

type FavoriteArticleListPageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FavoriteArticleListPage({
  searchParams,
}: FavoriteArticleListPageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Favorite Article Page</h1>
    </div>
  );
}
