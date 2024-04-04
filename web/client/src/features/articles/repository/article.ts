import prisma from "@/lib/prisma";

import { ArticleType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

const LIMIT = 20;

export type GetArticleParams = {
  platformId?: string;
  keyword?: string;
  languageStatus?: LanguageStatus;
  offset?: number;
  sort?: "asc" | "desc";
  sortColum?: string;
};

export const getArticles = async ({
  keyword,
  languageStatus = 1,
  offset = 1,
  sort = "desc",
  sortColum = "publishedAt",
}: GetArticleParams): Promise<Array<ArticleType>> => {
  "use server";

  let orderBy = {};

  let where = {};
  if (keyword) {
    where = {
      AND: [
        {
          OR: [
            {
              title: {
                contains: keyword,
              },
            },
            {
              description: {
                contains: keyword,
              },
            },
          ],
        },
        {
          platform: {
            isEng: languageStatus === 2,
          },
        },
      ],
    };
  } else {
    where = {
      platform: {
        isEng: languageStatus === 2,
      },
    };
  }

  switch (sortColum) {
    case "publishedAt":
      orderBy = {
        publishedAt: sort,
      };
      break;
    default:
  }

  const res = await prisma.article.findMany({
    take: 20,
    skip: (offset - 1) * LIMIT,
    where,
    orderBy,
    include: {
      feedArticleRelatoins: {
        select: {
          feed: {
            select: {
              id: true,
              name: true,
              siteUrl: true,
              rssUrl: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
              platform: {
                select: {
                  id: true,
                  name: true,
                  siteUrl: true,
                  faviconUrl: true,
                  platformType: true,
                  isEng: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
              category: {
                select: {
                  id: true,
                  name: true,
                  type: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
            },
          },
        },
      },
      platform: {
        select: {
          id: true,
          name: true,
          siteUrl: true,
          faviconUrl: true,
          platformType: true,
          isEng: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      },
    },
  });

  const articleList: Array<ArticleType> = res.map((article) => {
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      thumbnailURL: article.thumbnailURL,
      articleUrl: article.articleUrl,
      publishedAt: article.publishedAt,
      isPrivate: article.isPrivate,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      platform: {
        id: article.platform.id,
        name: article.platform.name,
        platformType: article.platform.platformType,
        siteUrl: article.platform.siteUrl,
        faviconUrl: article.platform.faviconUrl,
        isEng: article.platform.isEng,
        createdAt: article.platform.createdAt,
        updatedAt: article.platform.updatedAt,
        deletedAt: article.platform.deletedAt,
      },
      feeds: article.feedArticleRelatoins.map((feed) => {
        return {
          id: feed.feed.id,
          name: feed.feed.name,
          siteUrl: feed.feed.siteUrl,
          rssUrl: feed.feed.rssUrl,
          createdAt: feed.feed.createdAt,
          updatedAt: feed.feed.updatedAt,
          deletedAt: feed.feed.deletedAt,
          category: {
            id: feed.feed.category.id,
            name: feed.feed.category.name,
            type: feed.feed.category.type,
            createdAt: feed.feed.category.createdAt,
            updatedAt: feed.feed.category.updatedAt,
            deletedAt: feed.feed.category.deletedAt,
          },
        };
      }),
    };
  });

  return articleList;
};

// export const getArticles = async ({
//   platformId,
//   languageStatus = 0,
//   offset = 1,
//   sort = "desc",
//   sortColum = "published_at",
// }: GetArticleParams) => {
//   "use server";
//   const order = (offset - 1) * LIMIT;
//   let q = articleRef.orderBy(sortColum, sort).limit(LIMIT).offset(order);
//   if (languageStatus != 0) {
//     const isEng = languageStatus === 2;
//     q = q.where("is_eng", "==", isEng);
//   }
//   if (platformId) {
//     q = q.where("platform_id", "==", platformId);
//   }
//   const snapshot = await q.get();
//   revalidateTag("articles");
//   return snapshot.docs.map((doc) => convertToArticle(doc));
// };

// export const getArticlesByTitle = async (keyword: string, offset: number) => {
//   "use server";
//   const order = (offset - 1) * LIMIT;
//   const snapshot = await articleRef
//     .orderBy("title")
//     .startAt(keyword)
//     .endAt(keyword + "\uf8ff")
//     .limit(LIMIT)
//     .offset(order)
//     .get();
//   return snapshot.docs.map((doc) => {
//     return convertToArticle(doc);
//   });
// };

// export const getArticleById = async (id: string) => {
//   "use server";
//   const doc = await articleRef.doc(id).get();
//   return convertToArticle(doc);
// };

// const convertToArticle = (
//   doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
// ) => {
//   const data = doc.data();
//   if (!data) {
//     throw new Error("Document data is not found");
//   }
//   return {
//     id: doc.id,
//     title: data["title"],
//     description: data.description,
//     thumbnailURL: data["thumbnail_url"],
//     articleUrl: data["article_url"],
//     publishedAt: data["published_at"],
//     platform: {
//       id: data["platform_id"],
//       name: data["platform_name"],
//       categoryName: data["platform_category_name"],
//       platformType: data["platform_type"],
//       siteUrl: data["platform_site_url"],
//       faviconUrl: data["platform_favicon_url"],
//     },
//     isEng: data["is_eng"],
//     isPrivate: data["is_private"],
//     createdAt: data["created_at"],
//     updatedAt: data["updated_at"],
//     deletedAt: data["deleted_at"],
//   } as Article;
// };
