import { db } from "@/lib/firestore";
import { Article, ArticlePlatform } from "@/types/article";

const articleRef = db.collection("articles");

type getArticleParams = {
  keyword?: string;
  platformId?: string;
  limit?: number;
  sort?: FirebaseFirestore.OrderByDirection;
  sortColum?: string;
};

export const getArticles = async ({
  keyword,
  platformId,
  limit = 20,
  sort = "desc",
  sortColum = "published_at",
}: getArticleParams) => {
  let q = articleRef.limit(limit);

  if (platformId) {
    q = q.where("platform_id", "==", platformId);
  }
  if (keyword) {
    q = q
      .orderBy("title")
      .startAt(keyword)
      .endAt(keyword + "\uf8ff");
  } else {
    q = q.orderBy(sortColum, sort);
  }
  const snapshot = await q.get();
  const articles = snapshot.docs.map((doc) => {
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
  });
  return articles;
};
