import { db } from "@/lib/firestore";
import { Article, ArticlePlatform } from "@/types/article";

const articleRef = db.collection("articles");

type getArticleParams = {
  limit?: number;
  keyword?: string;
  sort?: FirebaseFirestore.OrderByDirection;
  sortColum?: string;
};

export const getArticles = async ({
  limit = 20,
  keyword,
  sort = "desc",
  sortColum = "published_at",
}: getArticleParams) => {
  if (keyword) {
    articleRef.where("title", "array-contains", keyword);
  }
  const snapshot = await articleRef.orderBy(sortColum, sort).limit(limit).get();
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
