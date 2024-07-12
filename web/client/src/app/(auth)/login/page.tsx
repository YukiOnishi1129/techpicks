import { redirect } from "next/navigation";
import { Suspense } from "react";

import { LoginTemplate } from "@/features/auth/components/LoginTemplate";
import { getUser } from "@/features/users/actions/user";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

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
