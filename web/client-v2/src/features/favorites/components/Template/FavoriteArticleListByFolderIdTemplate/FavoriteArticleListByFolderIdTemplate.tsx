import { FC, Suspense } from "react";

import { SkeltonArticleList } from "@/features/articles/components/List";

import {
  FavoriteArticleFoldersInput,
  FavoriteArticlesInput,
} from "@/graphql/type";
import {
  BreadCrumbType,
  PageBreadcrumb,
} from "@/shared/components/ui/breadcrumb";
import { PreloadQuery } from "@/shared/lib/apollo/client";
import { SearchParamsType } from "@/shared/types/utils";

import { getServerFavoriteArticleListByFolderIdTemplateQuery } from "./actGetServerFavoriteArticleListByFolderIdTemplateQuery";
import { FavoriteArticleListByFolderIdTemplateQuery } from "./FavoriteArticleListByFolderIdTemplateQuery";
import {
  CreateFavoriteArticleDialog,
  SearchFavoriteArticleListDialog,
} from "../../Dialog";
import { FavoriteArticleList } from "../../List/FavoriteArticleList/FavoriteArticleList";
import { FavoriteArticleKeywordSearchForm } from "../../Search";

type FavoriteArticleListByFolderIdTemplateProps = {
  searchParams: SearchParamsType;
  id: string;
  keyword?: string;
};

export const FavoriteArticleListByFolderIdTemplate: FC<
  FavoriteArticleListByFolderIdTemplateProps
> = async ({ searchParams, id, keyword }) => {
  const input: FavoriteArticlesInput = {
    first: 20,
    after: null,
    folderId: id,
    keyword: keyword,
  };

  const favoriteArticleFoldersInput: FavoriteArticleFoldersInput = {
    isAllFetch: true,
    isFolderOnly: false,
    isFavoriteArticleAllFetch: true,
  };

  const { data, error } =
    await getServerFavoriteArticleListByFolderIdTemplateQuery(id);

  if (error) {
    return <div>Not Found</div>;
  }

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Favorite Folders",
      href: "/favorite",
    },
    {
      title: data.favoriteArticleFolder.title,
      href: `/favorite/article/${data.favoriteArticleFolder.id}`,
    },
  ];

  return (
    <div>
      <div className="fixed z-10  w-[90%] bg-card md:block md:w-[70%] md:justify-between md:px-4">
        <div className="mt-4">
          <PageBreadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <div className="hidden w-full items-center justify-between md:flex">
          <div className="w-4/5 pt-2">
            <FavoriteArticleKeywordSearchForm
              favoriteArticleFolderId={id}
              keyword={keyword}
            />
          </div>
          <CreateFavoriteArticleDialog favoriteArticleFolderId={id} />
        </div>
      </div>

      <div className="h-12 md:h-28" />

      <PreloadQuery
        query={FavoriteArticleListByFolderIdTemplateQuery}
        variables={{
          input,
          favoriteArticleFoldersInput,
        }}
      >
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<SkeltonArticleList />}
        >
          <FavoriteArticleList folderId={id} keyword={keyword} />
        </Suspense>
      </PreloadQuery>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <SearchFavoriteArticleListDialog
          keyword={keyword}
          favoriteArticleFolderId={id}
        />
      </div>
    </div>
  );
};
