import Parser from "rss-parser";
import { Rss } from "../types/rss";
import axios from "axios";
import { JSDOM } from "jsdom";

const parser = new Parser();

export const convertRssToJson = async (url: string) => {
  const feed = await parser.parseURL(url);
  const rssList: Rss[] = [];
  for await (const item of feed.items) {
    if (!item?.link) return;
    const image = !!item.link ? await getOgpImage(item.link) : "";
    const newRss: Rss = {
      date: item?.date || "",
      title: item?.title || "",
      link: item?.link || "",
      contentEncoded: item?.["content:encoded"] || "",
      contentEncodedSnippet: item?.["content:encodedSnippet"] || "",
      dcDate: item?.["dc:date"] || "",
      content: item?.content || "",
      contentSnippet: item?.contentSnippet || "",
      rdfAbout: item?.["rdf:about"] || "",
      isoDate: item?.isoDate || "",
      image: image,
    };
    rssList.push(newRss);
  }

  return rssList;
};

export const getOgpImage = async (url: string) => {
  let image = "";
  try {
    const encodedUri = encodeURI(url);
    const headers = { "User-Agent": "bot" };
    const res = await axios.get(encodedUri, { headers: headers });
    const html = res.data;
    const dom = new JSDOM(html);
    const meta = dom.window.document.head.querySelectorAll("meta");

    const ogp = [...meta]
      .filter((element: Element) => element.hasAttribute("property"))
      .reduce((previous: any, current: Element) => {
        const property = current.getAttribute("property")?.trim();
        if (!property) return;
        const content = current.getAttribute("content");
        previous[property] = content;
        return previous;
      }, {});
    image = ogp["og:image"] as string;
  } catch (e) {
    console.log(e);
  }

  return image;
};
