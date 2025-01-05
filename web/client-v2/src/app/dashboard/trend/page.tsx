import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { TrendArticleDashboardTemplate } from "@/features/trends/components/Template";

export default async function DashboardTrendPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return <TrendArticleDashboardTemplate user={user} />;
}
