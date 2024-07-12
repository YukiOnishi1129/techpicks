import { Suspense } from "react";

import { LoginTemplate } from "@/features/auth/components/LoginTemplate";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

export default function Login() {
  return (
    <Suspense fallback={<ScreenLoader />}>
      <LoginTemplate />
    </Suspense>
  );
}
