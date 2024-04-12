"use server";

import { parse } from "node-html-parser";

type OgpType = {
  title: string;
  description: string;
  siteUrl: string;
  image: string;
  favIconImage: string;
};

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
];

export const getOgpData = async (url: string) => {
  const encodeUri = encodeURI(url);

  const res = await fetch(encodeUri, {
    headers: { "User-Agent": "Googlebot" },
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
    url;

  const description =
    objectMap["og:description"] || objectMap["description"] || "";

  const siteUrl = await getDomainUrl(url);

  const imageSrc = objectMap["og:image"];

  const favIconImage =
    objectMap["apple-touch-icon"] ||
    objectMap["icon"] ||
    objectMap["shortcut icon"];

  const image = await setImagePath(url, imageSrc);

  const ogpData: OgpType = {
    title,
    description,
    siteUrl,
    image,
    favIconImage,
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
