import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { TrendArticleDashboardTemplate } from "@/features/trends/components/Template";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function DashboardTrendPage({ searchParams }: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return <TrendArticleDashboardTemplate user={user} />;
}
