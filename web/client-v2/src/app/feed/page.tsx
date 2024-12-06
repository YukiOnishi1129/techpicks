import { getUser } from "@/features/auth/actions/user";

export default async function FeedPage() {
  const user = await getUser();
  return (
    <div>
      <h1>Feed</h1>
    </div>
  );
}
