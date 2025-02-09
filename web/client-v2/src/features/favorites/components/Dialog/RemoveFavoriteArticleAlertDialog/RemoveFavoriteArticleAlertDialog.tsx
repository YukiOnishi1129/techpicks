import { IconContext } from "react-icons";
import { FaHeart } from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

type RemoveFavoriteArticleAlertDialogProps = {
  favoriteArticleTitle: string;
  favoriteArticleId: string;
  targetFavoriteArticleFolderId: string;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    targetFavoriteArticleFolderId: string
  ) => Promise<string | undefined>;
};

export function RemoveFavoriteArticleAlertDialog({
  favoriteArticleTitle,
  favoriteArticleId,
  targetFavoriteArticleFolderId,
  handleRemoveFavoriteArticle,
}: RemoveFavoriteArticleAlertDialogProps) {
  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger>
              <IconContext.Provider
                value={{ className: "hover:text-rose-900" }}
              >
                <FaHeart size={20} className="cursor-pointer" color="red" />
              </IconContext.Provider>
            </TooltipTrigger>
          </AlertDialogTrigger>
          <TooltipContent className="px-4 py-3 font-semibold">
            <p>Delete favorite article</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want me to remove it?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your data
            from our servers.
            <br></br>
            Remove favorite article title is
            <span className="font-bold text-primary">
              「{favoriteArticleTitle}」
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>CANCEL</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              handleRemoveFavoriteArticle(
                favoriteArticleId,
                targetFavoriteArticleFolderId
              )
            }
          >
            REMOVE
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
