"use client";
import Link from "next/link";
import { FC, useState } from "react";
import { TwitterShareButton, XIcon } from "react-share";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { useCheckImageExist } from "@/hooks/useImage";
import { useParseHtml } from "@/hooks/useParseHtml";

import { formatShowDateTime } from "@/lib/date";

import { FavoriteArticleType } from "@/types/favoriteArticle";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

import { RemoveFavoriteArticleAlertDialog } from "./Dialog/RemoveFavoriteArticleAlertDialog";
import { CopyFavoriteArticleDropdownMenu } from "./DropdownMenu";
import { AddFavoriteArticleTooltip } from "./Tooltip/AddFavoriteArticleTooltip";

type FavoriteArticleDetailSheetProps = {
  favoriteArticleFolderId: string;
  favoriteArticle: FavoriteArticleType;
  isFollowing: boolean;
  otherFavoriteArticleFolders: Array<FavoriteArticleFolderType>;
  handleCreateFavoriteArticle: (
    targetFavoriteArticleFolderId: string,
    targetFavoriteArticleFolder?: FavoriteArticleFolderType
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    favoriteArticleFolderId?: string
  ) => Promise<string | undefined>;
  handleCreateFavoriteArticleFolder: (
    favoriteArticleFolderId: string
  ) => Promise<void>;
  children: React.ReactNode;
};

export const FavoriteArticleDetailSheet: FC<
  FavoriteArticleDetailSheetProps
> = ({
  favoriteArticleFolderId,
  favoriteArticle,
  isFollowing,
  otherFavoriteArticleFolders,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
  handleCreateFavoriteArticleFolder,
  children,
}: FavoriteArticleDetailSheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <div
          role="button"
          tabIndex={1}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setOpen(true);
            }
          }}
        >
          {children}
        </div>
      </SheetTrigger>
      <SheetContent className="w-[360px] sm:w-[700px] sm:max-w-[700px]">
        {open && (
          <FavoriteArticleContent
            favoriteArticleFolderId={favoriteArticleFolderId}
            favoriteArticle={favoriteArticle}
            isFollowing={isFollowing}
            otherFavoriteArticleFolders={otherFavoriteArticleFolders}
            handleCreateFavoriteArticle={handleCreateFavoriteArticle}
            handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
            handleCreateFavoriteArticleFolder={
              handleCreateFavoriteArticleFolder
            }
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

type FavoriteArticleContentProps = {
  favoriteArticleFolderId: string;
  favoriteArticle: FavoriteArticleType;
  isFollowing: boolean;
  otherFavoriteArticleFolders: Array<FavoriteArticleFolderType>;
  handleCreateFavoriteArticle: (
    targetFavoriteArticleFolderId: string,
    targetFavoriteArticleFolder?: FavoriteArticleFolderType
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    favoriteArticleFolderId?: string
  ) => Promise<string | undefined>;
  handleCreateFavoriteArticleFolder: (
    favoriteArticleFolderId: string
  ) => Promise<void>;
};

const FavoriteArticleContent: FC<FavoriteArticleContentProps> = ({
  favoriteArticleFolderId,
  favoriteArticle,
  isFollowing,
  otherFavoriteArticleFolders,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
  handleCreateFavoriteArticleFolder,
}) => {
  const imageUrl = useCheckImageExist(
    favoriteArticle?.thumbnailURL || undefined
  );
  const { convertParseHtml } = useParseHtml();

  return (
    <>
      <SheetHeader className="mb-4">
        <SheetTitle className="flex">
          <Link
            className="inline-block w-full cursor-pointer text-lg font-semibold  tracking-wide hover:text-blue-500"
            href={favoriteArticle.articleUrl}
            target="_blank"
          >
            <h1 className="pb-4">{favoriteArticle.title}</h1>
          </Link>
        </SheetTitle>

        <p className="pl-2 text-sm">
          {formatShowDateTime(favoriteArticle.publishedAt)}
        </p>

        <div className="flex w-full items-center justify-between pt-2">
          <Link
            className="mb-2 hover:opacity-80"
            href={favoriteArticle?.platformUrl || ""}
            target="_blank"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mr-2 inline-block size-[24px]"
              src={favoriteArticle?.platformFaviconUrl || ""}
              alt=""
            />
          </Link>
          <div className="flex items-center justify-center p-4">
            <div className="mr-4">
              <TwitterShareButton
                title={favoriteArticle.title}
                url={favoriteArticle.articleUrl}
              >
                <XIcon className="inline-block" size={36} />
              </TwitterShareButton>
            </div>
            <div className="mr-4">
              <CopyFavoriteArticleDropdownMenu
                articleId={favoriteArticle.articleId || ""}
                favoriteArticleFolders={otherFavoriteArticleFolders}
                handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                handleCreateFavoriteArticleFolder={
                  handleCreateFavoriteArticleFolder
                }
              />
            </div>
            <div>
              {isFollowing ? (
                <RemoveFavoriteArticleAlertDialog
                  favoriteArticleId={favoriteArticle.id}
                  favoriteArticleTitle={favoriteArticle.title}
                  handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                />
              ) : (
                <AddFavoriteArticleTooltip
                  favoriteArticleFolderId={favoriteArticleFolderId}
                  handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                />
              )}
            </div>
          </div>
        </div>

        <div className="my-10 flex justify-around">
          <Link href={favoriteArticle.articleUrl} target="_blank">
            <Button
              size={"lg"}
              className="w-full bg-blue-700 text-xl text-white hover:bg-blue-900"
            >
              {"READ MORE"}
            </Button>
          </Link>
          <SheetClose asChild>
            <Button variant="outline" className="inline-block w-1/3 text-xl">
              CLOSE
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>

      <div className="h-[400px] overflow-y-scroll">
        <Link href={favoriteArticle.articleUrl} target="_blank">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="m-auto h-[370px] cursor-pointer rounded-md object-cover object-center pb-8 hover:opacity-80"
            src={imageUrl}
            alt=""
          />
        </Link>

        <div className="text-lg tracking-wide">
          <div>{convertParseHtml(favoriteArticle.description)}</div>
        </div>

        <div className="my-10 flex justify-around">
          <Link href={favoriteArticle.articleUrl} target="_blank">
            <Button
              size={"lg"}
              className="w-full bg-blue-700 text-xl text-white hover:bg-blue-900"
            >
              {"READ MORE"}
            </Button>
          </Link>
          <SheetClose asChild>
            <Button
              variant="outline"
              className=" inline-block w-1/3 text-xl hover:bg-blue-900"
            >
              {" CLOSE"}
            </Button>
          </SheetClose>
        </div>
      </div>
    </>
  );
};
