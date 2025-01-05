import { redirect } from "next/navigation";

import { SearchArticleListFormTemplate } from "@/features/articles/components/Template";
import { getUser } from "@/features/auth/actions/user";

export default async function SearchFormPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return <SearchArticleListFormTemplate />;
}
