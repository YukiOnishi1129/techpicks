import axios from "axios";
import cheerio from "cheerio";
import { ZennArticle } from "./types/zenn";

const fetchZenn = async () => {
  const url = "https://zenn.dev/";

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  const raw = $("script[id=__NEXT_DATA__]").html() ?? "";
  if (raw === undefined) return {};
  const rawData = JSON.parse(raw).props.pageProps.dailyTechArticles;

  const articles: ZennArticle = rawData.map((article: any) => {
    const newArticle: ZennArticle = {
      id: article.id,
      postType: article.postType,
      title: article.title,
      slug: article.slug,
      commentsCount: article.commentsCount,
      likedCount: article.likedCount,
      bodyLettersCount: article.bodyLettersCount,
      articleType: article.articleType,
      emoji: article.emoji,
      isSuspendingPrivate: article.isSuspendingPrivate,
      publishedAt: article.publishedAt,
      bodyUpdatedAt: article.bodyUpdatedAt,
      sourceRepoUpdatedAt: article.sourceRepoUpdatedAt,
      pinned: article.pinned,
      path: article.path,
    };

    if (article.user) {
      newArticle.user = {
        id: article.user.id,
        username: article.user.username,
        name: article.user.name,
        avatarSmallUrl: article.user.avatarSmallUrl,
      };
    }

    if (article.publication) {
      newArticle.publication = {
        id: article.publication.id,
        name: article.publication.name,
        displayName: article.publication.displayName,
        avatarSmallUrl: article.publication.avatarSmallUrl,
        pro: article.publication.pro,
        avatarRegistered: article.publication.avatarRegistered,
      };
    }

    return newArticle;
  });

  console.log("💧");
  console.log(articles);
  console.log("💧");
};

// fetchZenn();
