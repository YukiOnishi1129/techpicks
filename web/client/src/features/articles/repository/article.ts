import { db } from "@/lib/firestore";
import { Article, ArticlePlatform } from "@/types/article";

const articleRef = db.collection("articles");

const LIMIT = 20;

type getArticleParams = {
  platformId?: string;
  offset?: number;
  sort?: FirebaseFirestore.OrderByDirection;
  sortColum?: string;
};

export const getArticles = async ({
  platformId,
  offset = 1,
  sort = "desc",
  sortColum = "published_at",
}: getArticleParams) => {
  const order = (offset - 1) * LIMIT;
  let q = articleRef.orderBy(sortColum, sort).limit(LIMIT).offset(order);
  if (platformId) {
    q = q.where("platform_id", "==", platformId);
  }
  const snapshot = await q.get();
  return snapshot.docs.map((doc) => convertToArticle(doc));
};

export const getArticlesByTitle = async (keyword: string, offset: number) => {
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

const convertToArticle = (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data["title"],
    description: data["description"],
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
