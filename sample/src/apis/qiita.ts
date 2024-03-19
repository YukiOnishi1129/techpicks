import { convertRssToJson } from "./rss";

export const fetchQiita = async () => {
  const data = await convertRssToJson(
    "https://qiita.com/popular-items/feed.atom"
  );
  console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
  console.log(data);
  return data;
};
