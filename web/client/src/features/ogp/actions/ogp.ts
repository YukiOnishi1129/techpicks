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

  const encodeUri = encodeURI(url);

  const res = await fetch(encodeUri, {
    headers: { "User-Agent": "bot" },
  });
  const html = await res.text();
  const root = parse(html);
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

  const favIconImage =
    objectMap["apple-touch-icon"] ||
    objectMap["icon"] ||
    objectMap["shortcut icon"];

  const image = await setImagePath(url, imageSrc);

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
