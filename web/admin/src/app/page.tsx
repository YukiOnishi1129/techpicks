import { redirect } from "next/navigation";

import { fetchAdminUserAPI } from "@/features/admin/actions/admin";
import { LoginTemplate } from "@/features/auth/components/LoginTemplate";

export default async function Home() {
  const adminUser = await fetchAdminUserAPI();
  if (adminUser.data.adminUser) redirect("/dashboard");

  return <LoginTemplate />;
}
