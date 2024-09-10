import { User } from "@supabase/supabase-js";

type BookmarkTemplateProps = {
  user: User;
  keyword?: string;
};

export const BookmarkTemplate = ({ user, keyword }: BookmarkTemplateProps) => {
  return <div>BookmarkTemplate</div>;
};
