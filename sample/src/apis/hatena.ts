import { convertRssToJson } from "./rss";

export const fetchHatena = async () => {
  const data = await convertRssToJson("https://b.hatena.ne.jp/hotentry/it.rss");
  // console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
  return data;
};
