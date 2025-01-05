import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { LoginTemplate } from "@/features/auth/components/Template";

export default async function Login() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard/trend");
  }

  return <LoginTemplate />;
}
