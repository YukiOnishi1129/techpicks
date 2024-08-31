// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.0.3
//   protoc               v3.20.3
// source: content/article.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Feed } from "./feed";
import { Platform } from "./platform";

export const protobufPackage = "checkpicks.content.v1";

export interface GetArticleRequest {
  userId: string | undefined;
  languageStatus: string | undefined;
  tag: string | undefined;
  cursor: string;
  limit: number;
}

export interface GetArticleResponse {
  articles: Article[];
}

export interface Article {
  id: string;
  platform: Platform | undefined;
  feeds: Feed[];
  title: string;
  description: string;
  articleUrl: string;
  publishedAt: string;
  authorName: string | undefined;
  tags: string | undefined;
  thumbnailUrl: string;
  isEng: boolean;
  isPrivate: boolean;
  bookmarkId: string | undefined;
  isBookmarked: boolean;
  isFollowing: boolean;
  favoriteArticleFolderIds: string[];
  likeCount: number;
  isTrend: boolean;
  createdAt: string;
  updatedAt: string;
}

export const CHECKPICKS_CONTENT_V1_PACKAGE_NAME = "checkpicks.content.v1";

export interface ArticleServiceClient {
  getArticles(request: GetArticleRequest): Observable<GetArticleResponse>;
}

export interface ArticleServiceController {
  getArticles(
    request: GetArticleRequest,
  ): Promise<GetArticleResponse> | Observable<GetArticleResponse> | GetArticleResponse;
}

export function ArticleServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getArticles"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ArticleService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ArticleService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ARTICLE_SERVICE_NAME = "ArticleService";
