import { convertRssToJson } from "./rss";

export const fetchDevTo = async () => {
  const data = await convertRssToJson("https://dev.to/feed");
  console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
  console.log(data);
  return data;
};
