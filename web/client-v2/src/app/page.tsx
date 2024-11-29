import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { HomeTemplate } from "@/features/home/components/Template/HomeTemplate";

export default async function Home() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard/trend");
  }
  return <HomeTemplate />;
}
