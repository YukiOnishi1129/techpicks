import { User } from "@supabase/supabase-js";
import { FC } from "react";

type FavoriteArticleFolderListTemplateProps = {
  user: User;
  keyword?: string;
};

export const FavoriteArticleFolderListTemplate: FC<
  FavoriteArticleFolderListTemplateProps
> = ({ user, keyword }) => {
  return <div>Favorite</div>;
};
