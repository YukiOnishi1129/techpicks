import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";

type FeedByIdPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FeedByIdPage({
  params,
  searchParams,
}: FeedByIdPageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const { id } = params;
  return (
    <div>
      <h1>{`feed ${id}`}</h1>
    </div>
  );
}
