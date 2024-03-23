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
    doc.data();

    const data = doc.data();
    const platform = doc.data().platform as ArticlePlatform;
    return {
      id: doc.id,
      title: data["title"],
      description: data["description"],
      thumbnailURL: doc.data().thumbnailURL,
      articleUrl: doc.data().articleUrl,
      publishedAt: doc.data().publishedAt,
      platform: {
        id: platform.id,
        name: platform.name,
        platformType: platform.platformType,
        siteUrl: platform.siteUrl,
      },
      isEng: doc.data().isEng,
      isPrivate: doc.data().isPrivate,
      createdAt: doc.data().createdAt,
      updatedAt: doc.data().updatedAt,
      deletedAt: doc.data().deletedAt,
    } as Article;
  });
  return articles;
};
