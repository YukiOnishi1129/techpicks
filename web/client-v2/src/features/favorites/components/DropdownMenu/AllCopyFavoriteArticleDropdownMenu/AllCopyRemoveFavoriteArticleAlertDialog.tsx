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
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

type AllCopyRemoveFavoriteArticleAlertDialogProps = {
  favoriteArticleTitle: string;
  favoriteArticleId: string;
  targetFavoriteArticleFolderId: string;
  onRemoveFavoriteArticle: (
    favoriteArticleId: string,
    targetFavoriteArticleFolderId: string
  ) => Promise<string | undefined>;
};

export function AllCopyRemoveFavoriteArticleAlertDialog({
  favoriteArticleTitle,
  favoriteArticleId,
  targetFavoriteArticleFolderId,
  onRemoveFavoriteArticle,
}: AllCopyRemoveFavoriteArticleAlertDialogProps) {
  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="sm"
                className="group relative border-emerald-500 bg-emerald-500 font-bold text-white hover:border-red-600 hover:text-red-600"
              >
                <span className="w-full group-hover:invisible">{"COPIED"}</span>
                <span className="invisible absolute w-full group-hover:visible">
                  {"REMOVE"}
                </span>
              </Button>
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
              onRemoveFavoriteArticle(
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
