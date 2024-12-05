import { redirect } from "next/navigation";

import { ArticleDashboardTemplate } from "@/features/articles/components/Template";
import { getUser } from "@/features/auth/actions/user";

export default async function DashboardSitePage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return <ArticleDashboardTemplate user={user} tab={"site"} />;
}
