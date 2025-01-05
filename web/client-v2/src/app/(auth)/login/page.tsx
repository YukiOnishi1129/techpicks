import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getUser } from "@/features/auth/actions/user";
import { LoginTemplate } from "@/features/auth/components/Template";

import { ScreenLoader } from "@/shared/components/layout/ScreenLoader";

export default async function Login() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard/trend");
  }

  return (
    <Suspense fallback={<ScreenLoader />}>
      <LoginTemplate />
    </Suspense>
  );
}
