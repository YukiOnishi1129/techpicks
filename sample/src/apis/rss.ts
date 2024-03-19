import { writeFileSync } from "fs";
import Parser from "rss-parser";

const parser = new Parser();

export const convertRssToJson = async (url: string) => {
  let jsonFeed = {};
  const feed = await parser.parseURL(url);
  const items = feed.items.map((data) => {
    return data;
  });
  jsonFeed = items;

  return JSON.stringify(jsonFeed);
  // writeFileSync("src/rss/data.json", JSON.stringify(jsonFeed));
};
