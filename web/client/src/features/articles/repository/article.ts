import { revalidateTag } from "next/cache";

import { db } from "@/lib/firestore";

import { Article } from "@/types/article";
import { LanguageStatus } from "@/types/language";

const articleRef = db.collection("articles");

const LIMIT = 20;

export type GetArticleParams = {
  platformId?: string;
  languageStatus?: LanguageStatus;
  offset?: number;
  sort?: FirebaseFirestore.OrderByDirection;
  sortColum?: string;
};

export const getArticles = async ({
  platformId,
  languageStatus = 0,
  offset = 1,
  sort = "desc",
  sortColum = "published_at",
}: GetArticleParams) => {
  "use server";
  const order = (offset - 1) * LIMIT;
  let q = articleRef.orderBy(sortColum, sort).limit(LIMIT).offset(order);
  if (languageStatus != 0) {
    const isEng = languageStatus === 2;
    q = q.where("is_eng", "==", isEng);
  }
  if (platformId) {
    q = q.where("platform_id", "==", platformId);
  }
  const snapshot = await q.get();
  revalidateTag("articles");
  return snapshot.docs.map((doc) => convertToArticle(doc));
};

export const getArticlesByTitle = async (keyword: string, offset: number) => {
  "use server";
  const order = (offset - 1) * LIMIT;
  const snapshot = await articleRef
    .orderBy("title")
    .startAt(keyword)
    .endAt(keyword + "\uf8ff")
    .limit(LIMIT)
    .offset(order)
    .get();
  return snapshot.docs.map((doc) => {
    return convertToArticle(doc);
  });
};

export const getArticleById = async (id: string) => {
  "use server";
  const doc = await articleRef.doc(id).get();
  return convertToArticle(doc);
};

const convertToArticle = (
  doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
) => {
  const data = doc.data();
  if (!data) {
    throw new Error("Document data is not found");
  }
  return {
    id: doc.id,
    title: data["title"],
    description: data.description,
    thumbnailURL: data["thumbnail_url"],
    articleUrl: data["article_url"],
    publishedAt: data["published_at"],
    platform: {
      id: data["platform_id"],
      name: data["platform_name"],
      platformType: data["platform_type"],
      siteUrl: data["platform_site_url"],
    },
    isEng: data["is_eng"],
    isPrivate: data["is_private"],
    createdAt: data["created_at"],
    updatedAt: data["updated_at"],
    deletedAt: data["deleted_at"],
  } as Article;
};
