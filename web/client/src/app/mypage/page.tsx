import { redirect } from "next/navigation";

import { getUser } from "@/features/users/actions/user";

export default async function MyPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="mx-auto mt-20 w-2/5 rounded-md border-2 border-gray-300 p-4 shadow-md">
      <h2 className="text-center text-2xl font-bold ">Mypage Page</h2>
    </div>
  );
}
