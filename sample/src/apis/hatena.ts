import { convertRssToJson } from "./rss";
import axios from "axios";
import { JSDOM } from "jsdom";

export const fetchHatena = async () => {
  const encodedUri = encodeURI(
    "https://pc.watch.impress.co.jp/docs/news/1577403.html"
  );
  const headers = { "User-Agent": "bot" };
  const res = await axios.get(encodedUri, { headers: headers });
  const html = res.data;
  const dom = new JSDOM(html);
  const meta = dom.window.document.head.querySelectorAll("meta");
  const ogp = extractOgp([...meta]);
  // console.log(ogp["og:image"]);
  console.log(ogp);

  //   const data = await convertRssToJson("https://b.hatena.ne.jp/hotentry/it.rss");
  //   const res = await fetch("https://offshore.icd.co.jp/blog/offshore-flow");

  //   const text = await res.text();
  //   const el = new DOMParser().parseFromString(text, "text/html");
  //   console.log("🔥");
  //   console.log(el);
  //   const headEls = el.head.children;
  //   Array.from(headEls).forEach((v) => {
  //     const prop = v.getAttribute("property");
  //     if (!prop) return;
  //     console.log(prop, v.getAttribute("content"));
  //   });
  //   console.log(data);
};

function extractOgp(metaElements: HTMLMetaElement[]): object {
  const ogp = metaElements
    .filter((element: Element) => element.hasAttribute("property"))
    .reduce((previous: any, current: Element) => {
      const property = current.getAttribute("property")?.trim();
      if (!property) return;
      const content = current.getAttribute("content");
      previous[property] = content;
      return previous;
    }, {});

  return ogp;
}
