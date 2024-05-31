"use server";

import { parse } from "node-html-parser";

import { checkHTTPUrl } from "@/lib/check";

import { OgpType } from "@/types/ogp";
import { root } from "postcss";
import console from "console";

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

  const encodeUri = encodeURI(url);

  console.log("🔥: get ogp");

  const res = await fetch(encodeUri, {
    headers: { "User-Agent": "Googlebot" },
  });
  console.log("🔥: after fetch");
  console.log(res);
  const html = await res.text();
  let detect_charset = detectCharset(html);

  console.log("🔥: detect_charset");
  console.log(detect_charset);

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

  console.log("🔥: root meta");
  console.log(root.querySelectorAll("meta"));

  root
    .querySelectorAll("link")
    .forEach(({ attributes }: { attributes: { [key: string]: string } }) => {
      const { rel, href } = attributes;
      if (rel && href && allowedTags.includes(rel)) {
        objectMap[rel] = href;
      }
    });

  console.log("🔥: root link");
  console.log(root.querySelectorAll("link"));

  console.log("🔥 : objectMap");
  console.log(objectMap);

  const title =
    objectMap["og:title"] ||
    objectMap["twitter:title"] ||
    root.querySelector("title")?.innerText ||
    "";

  console.log("🔥: meta title");
  console.log(title);

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
