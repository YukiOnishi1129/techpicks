import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getUser } from "@/features/auth/actions/user";
import { TrendArticleDashboardTemplate } from "@/features/trends/components/Template";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function DashboardTrendPage({ searchParams }: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <Suspense fallback={<ScreenLoader />}>
      <TrendArticleDashboardTemplate />
    </Suspense>
  );
}
