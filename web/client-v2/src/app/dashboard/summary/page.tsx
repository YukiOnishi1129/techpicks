import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ArticleDashboardTemplate } from "@/features/articles/components/Template";
import { getUser } from "@/features/auth/actions/user";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

export default async function DashboardSummaryPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <Suspense fallback={<ScreenLoader />}>
      <ArticleDashboardTemplate user={user} tab={"summary"} />
    </Suspense>
  );
}
