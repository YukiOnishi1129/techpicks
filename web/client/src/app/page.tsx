import { getArticles } from "@/features/articles/repository/article";
import Link from "next/link";

export default async function Home() {
  const articles = await getArticles({});
  console.log(articles.length);
  return (
    <div className="w-[90%] h-auto mt-4 mx-auto border-2 grid grid-cols-4 gap-4">
      {articles.map((article) => (
        <div key={article.id} className="cursor-pointer border-2">
          <Link href={article.articleUrl} target="_blank">
            <div className="w-full h-3/4 border-2 ">
              <img
                className="w-full h-full object-cover object-center"
                src={article.thumbnailURL}
                alt=""
              />
            </div>
            <div className="w-full h-1/4 border-2 ">
              <h3>{article.title}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
