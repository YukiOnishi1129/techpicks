import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";

export default async function FeedPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Feed</h1>
    </div>
  );
}
