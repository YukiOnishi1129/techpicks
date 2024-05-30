"use client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC, useState } from "react";
import { FcBookmark } from "react-icons/fc";
import { TwitterShareButton, XIcon } from "react-share";

import { FollowFavoriteArticleDropdownMenu } from "@/features/articles/components/DropdownMenu";

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

import { showDiffDateToCurrentDate } from "@/lib/date";

import { BookmarkType } from "@/types/bookmark";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

import { useBookmark } from "../hooks/useBookmark";

type BookmarkDetailSheetProps = {
  bookmark: BookmarkType;
  user: User | undefined;
  isFollowing: boolean;
  articleId: string;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  handleCreateFavoriteArticle: (
    favoriteArticleFolderId: string,
    createdFavoriteArticleFolder?: FavoriteArticleFolderType
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    favoriteArticleFolderId: string
  ) => Promise<string | undefined>;
  handleCreateFavoriteArticleFolder: (
    favoriteArticleFolderId: string
  ) => Promise<void>;
  children: React.ReactNode;
};

export const BookmarkDetailSheet: FC<BookmarkDetailSheetProps> = ({
  bookmark,
  user,
  isFollowing,
  articleId,
  favoriteArticleFolders,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
  handleCreateFavoriteArticleFolder,
  children,
}: BookmarkDetailSheetProps) => {
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
          <BookmarkDetailSheetContent
            user={user}
            bookmark={bookmark}
            isFollowing={isFollowing}
            articleId={articleId}
            favoriteArticleFolders={favoriteArticleFolders}
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

type BookmarkDetailSheetContentProps = {
  bookmark: BookmarkType;
  user: User | undefined;
  isFollowing: boolean;
  articleId: string;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  handleCreateFavoriteArticle: (
    favoriteArticleFolderId: string,
    createdFavoriteArticleFolder?: FavoriteArticleFolderType
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    favoriteArticleFolderId: string
  ) => Promise<string | undefined>;
  handleCreateFavoriteArticleFolder: (
    favoriteArticleFolderId: string
  ) => Promise<void>;
};

const BookmarkDetailSheetContent: FC<BookmarkDetailSheetContentProps> = ({
  bookmark,
  user,
  isFollowing,
  articleId,
  favoriteArticleFolders,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
  handleCreateFavoriteArticleFolder,
}) => {
  const imageUrl = useCheckImageExist(bookmark.thumbnailUrl);
  const { convertParseHtml } = useParseHtml();
  const { handleRemoveBookmark } = useBookmark();

  return (
    <>
      <SheetHeader className="mb-4">
        <SheetTitle>
          <Link
            className="cursor-pointer text-lg font-semibold  tracking-wide hover:text-blue-500"
            href={new URL(bookmark.articleUrl)}
            target="_blank"
          >
            <h1 className="pb-4">{bookmark.title}</h1>
          </Link>
        </SheetTitle>

        <p className="pl-2 text-sm">
          register: {showDiffDateToCurrentDate(bookmark.createdAt)}
        </p>

        <div className="flex w-full items-center justify-between pt-2">
          <Link
            className="mb-2 hover:opacity-80"
            href={new URL(bookmark.platformFaviconUrl || "")}
            target="_blank"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mr-2 inline-block size-[36px]"
              src={bookmark.platformFaviconUrl || ""}
              alt=""
            />
          </Link>
          {user && (
            <div className="flex justify-between">
              <TwitterShareButton
                title={bookmark.title}
                url={bookmark.articleUrl}
              >
                <XIcon className="inline-block" size={36} />
              </TwitterShareButton>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemoveBookmark(bookmark.id)}
              >
                <FcBookmark className="inline-block" size={36} />
              </Button>
              <div className="ml-4">
                <FollowFavoriteArticleDropdownMenu
                  isFollowing={isFollowing}
                  articleId={articleId || ""}
                  favoriteArticleFolders={favoriteArticleFolders}
                  handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                  handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                  handleCreateFavoriteArticleFolder={
                    handleCreateFavoriteArticleFolder
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div className="my-10 flex justify-around">
          <Link href={new URL(bookmark.articleUrl)} target="_blank">
            <Button
              size={"lg"}
              className="w-full bg-blue-700 text-xl text-white hover:bg-blue-900"
            >
              READ MORE
            </Button>
          </Link>
          <SheetClose asChild>
            <Button variant="outline" className="inline-block w-1/3 text-xl">
              CLOSE
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>

      <div className="h-[500px] overflow-y-scroll">
        <Link href={new URL(bookmark.articleUrl)} target="_blank">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="m-auto h-[370px] cursor-pointer rounded-md object-cover object-center pb-8 hover:opacity-80  md:h-[300px]"
            src={imageUrl}
            alt=""
          />
        </Link>

        <div className="text-lg tracking-wide">
          <div>{convertParseHtml(bookmark.description)}</div>
        </div>

        <div className="my-10 flex justify-around">
          <Link href={new URL(bookmark.articleUrl)} target="_blank">
            <Button
              size={"lg"}
              className="w-full bg-blue-700 text-xl text-white hover:bg-blue-900"
            >
              READ MORE
            </Button>
          </Link>
          <SheetClose asChild>
            <Button variant="outline" className="inline-block w-1/3 text-xl">
              CLOSE
            </Button>
          </SheetClose>
        </div>
      </div>
    </>
  );
};
