import { http, HttpResponse } from "msw";

import { EditFeedSheet } from "./EditFeedSheet";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "feature/feed/EditFeedSheet",
  component: EditFeedSheet,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
    msw: {
      handlers: [
        http.get(
          `${process.env.WEB_DOMAIN}/api/platforms/platform_id_1`,
          () => {
            return HttpResponse.json({
              data: {
                platform: {
                  id: "platform_id_1",
                  name: "Pedro Duarte",
                  siteUrl: "https://peduarte.com",
                  platformSiteType: 1,
                  faviconUrl: "https://peduarte.com/favicon.ico",
                  isEng: true,
                  createdAt: new Date().toString(),
                  updatedAt: new Date().toString(),
                  feeds: [],
                },
                message: "success",
              },
              status: 200,
            });
          }
        ),
        http.get(
          `${process.env.WEB_DOMAIN}/api/categories/category_id_1`,
          () => {
            return HttpResponse.json({
              data: {
                category: {
                  id: "platform_id_1",
                  name: "Pedro Duarte",
                  type: 1,
                  createdAt: new Date().toString(),
                  updatedAt: new Date().toString(),
                },
                message: "success",
              },
              status: 200,
            });
          }
        ),
        http.get(
          `${process.env.WEB_DOMAIN}/api/feedArticleRelations/articles?offset=1`,
          () => {
            return HttpResponse.json({
              data: {
                articles: [],
                message: "success",
              },
              status: 200,
            });
          }
        ),
      ],
    },
  },
  tags: ["autodocs"],
  args: {
    feed: {
      id: "1",
      platformId: "platform_id_1",
      categoryId: "category_id_1",
      name: "Pedro Duarte",
      description: "Pedro Duarte's blog",
      rssUrl: "https://peduarte.com/feed.xml",
      siteUrl: "https://peduarte.com",
      thumbnailUrl: "https://peduarte.com/thumbnail.jpg",
      trendPlatformType: 0,
      apiQueryParam: undefined,
      category: {
        id: "category_id_1",
        name: "Tech",
        type: 0,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      platform: {
        id: "platform_id_1",
        name: "Pedro Duarte",
        siteUrl: "https://peduarte.com",
        platformSiteType: 1,
        faviconUrl: "https://peduarte.com/favicon.ico",
        isEng: true,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      articles: [],
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  },
} satisfies Meta<typeof EditFeedSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    feed: {
      id: "1",
      platformId: "platform_id_1",
      categoryId: "category_id_1",
      name: "Pedro Duarte",
      description: "Pedro Duarte's blog",
      rssUrl: "https://peduarte.com/feed.xml",
      siteUrl: "https://peduarte.com",
      thumbnailUrl: "https://peduarte.com/thumbnail.jpg",
      trendPlatformType: 0,
      apiQueryParam: undefined,
      category: {
        id: "category_id_1",
        name: "Tech",
        type: 0,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      platform: {
        id: "platform_id_1",
        name: "Pedro Duarte",
        siteUrl: "https://peduarte.com",
        platformSiteType: 1,
        faviconUrl: "https://peduarte.com/favicon.ico",
        isEng: true,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      articles: [
        {
          id: "article_id_1",
          platformId: "platform_id_1",
          title: "Pedro Duarte",
          description: "Pedro Duarte's blog",
          articleUrl: "https://peduarte.com",
          publishedAt: new Date().toString(),
          thumbnailUrl: "https://peduarte.com/thumbnail.jpg",
          authorName: "Pedro Duarte",
          tags: "tags2, tags3",
          isEng: true,
          isPrivate: false,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        },
      ],
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  },
};
