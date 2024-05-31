"use server";

import { parse } from "node-html-parser";

import { checkHTTPUrl } from "@/lib/check";

import { OgpType } from "@/types/ogp";

const allowedTags = [
  "title",
  "og:title",
  "twitter:title",
  "description",
  "og:description",
  "twitter:description",
  "og:image",
  "twitter:image",
  "icon",
  "apple-touch-icon",
  "shortcut icon",
  "og:site_name",
  "application-name",
];

export const getOgpData = async (url: string) => {
  if (!checkHTTPUrl(url)) return;

  const targetUrl = new URL(url);
  if (targetUrl.hostname === "zenn.dev") {
    return await getZennOgpData(targetUrl);
  }

  return await getOrdinalOgpData(url);
};

const getOrdinalOgpData = async (url: string) => {
  const encodeUri = encodeURI(url);

  const res = await fetch(encodeUri, {
    headers: { "User-Agent": "Googlebot" },
  });
  const html = await res.text();
  let detect_charset = detectCharset(html);

  let fetchedHtml = html;

  if (detect_charset === "SHIFT_JIS") {
    const response = await fetch(encodeUri, {
      headers: { "User-Agent": "Googlebot" },
    });
    const arrayBuffer = await response.arrayBuffer();
    fetchedHtml = decodeAsText(arrayBuffer, "shift-jis");
  }

  const root = parse(fetchedHtml);
  const objectMap: { [key: string]: string } = {};

  root
    .querySelectorAll("meta")
    .forEach(({ attributes }: { attributes: { [key: string]: string } }) => {
      const property =
        attributes.property || attributes.name || attributes.href;
      if (!objectMap[property] && allowedTags.includes(property)) {
        objectMap[property] = attributes.content;
      }
    });

  root
    .querySelectorAll("link")
    .forEach(({ attributes }: { attributes: { [key: string]: string } }) => {
      const { rel, href } = attributes;
      if (rel && href && allowedTags.includes(rel)) {
        objectMap[rel] = href;
      }
    });

  const title =
    objectMap["og:title"] ||
    objectMap["twitter:title"] ||
    root.querySelector("title")?.innerText ||
    "";

  const description =
    objectMap["og:description"] || objectMap["description"] || "";

  const siteUrl = await getDomainUrl(url);

  const siteName = objectMap["og:site_name"] || objectMap["application-name"];

  const imageSrc = objectMap["og:image"];

  let favIconImage =
    objectMap["apple-touch-icon"] ||
    objectMap["icon"] ||
    objectMap["shortcut icon"];

  const image = await setImagePath(url, imageSrc);
  if (favIconImage === undefined) {
    favIconImage = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeUri}&size=128`;
  }

  const faviconUrl = await setFaviconUrl(url, favIconImage);

  const ogpData: OgpType = {
    title,
    description,
    siteUrl,
    siteName,
    image,
    faviconImage: faviconUrl,
  };

  return ogpData;
};

const getZennOgpData = async (url: URL) => {
  try {
    const { pathname } = url;

    const sliceUrl = pathname.substring(1);
    const useName = sliceUrl.substring(0, sliceUrl.indexOf("/"));
    const postSliceUrl = sliceUrl.substring(useName.length + 1);
    const postType = postSliceUrl.substring(0, postSliceUrl.indexOf("/"));

    if (
      postType !== "articles" &&
      postType !== "books" &&
      postType !== "scraps"
    ) {
      return;
    }

    const res = await fetch(
      `https://zenn.dev/api/${postType}?username=${useName}`
    );

    const data = await res.json();

    let targetData: any = {};
    if (postType === "articles") {
      targetData = data.articles.find(
        (article: { path: string }) => article.path === pathname
      );
    } else if (postType === "books") {
      targetData = data.books.find(
        (book: { path: string }) => book.path === pathname
      );
    } else if (postType === "scraps") {
      targetData = data.scraps.find(
        (scrap: { path: string }) => scrap.path === pathname
      );
    }

    const favIconImage = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url.href}&size=128`;

    const faviconUrl = await setFaviconUrl(url.href, favIconImage);

    const ogpData: OgpType = {
      title: targetData.title,
      description: "",
      siteUrl: url.href,
      siteName: "Zenn",
      image: "https://static.zenn.studio/images/logo-only-dark.png",
      faviconImage: faviconUrl,
    };

    return ogpData;
  } catch (error) {
    console.error(error);
    return;
  }
};

const setImagePath = async (url: string, imageUrl: string) => {
  if (!imageUrl) return imageUrl;

  const { protocol, host } = new URL(url);
  return new URL(imageUrl, `${protocol}//${host}`).toString();
};

const getDomainUrl = async (url: string) => {
  const { protocol, host } = new URL(url);
  return new URL(`${protocol}//${host}`).toString();
};

const setFaviconUrl = async (url: string, faviconUrl: string) => {
  if (checkHTTPUrl(faviconUrl)) return faviconUrl;
  const { protocol, host } = new URL(url);
  return new URL(faviconUrl, `${protocol}//${host}`).toString();
};

const decodeAsText = (
  arrayBuffer?: AllowSharedBufferSource,
  encoding?: string
) => new TextDecoder(encoding).decode(arrayBuffer);

const detectCharset = (html: string) => {
  if (html.match(/charset=[\"]{0,1}EUC-JP/gi)) return "EUC-JP";
  if (html.match(/charset=[\"]{0,1}(Shift_JIS|sjis)/gi)) return "SHIFT_JIS";
  if (html.match(/charset=[\"]{0,1}ISO-2002-JP/gi)) return "ISO-2002-JP";
  if (html.match(/charset=[\"]{0,1}(UTF-8|utf8)/gi)) return "UTF-8";

  return "UTF-8";
};
