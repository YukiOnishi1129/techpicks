// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.0.3
//   protoc               v3.20.3
// source: bookmark/bookmark.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "checkpicks.bookmark.v1";

export interface GetBookmarkResponse {
  bookmark: Bookmark[];
}

export interface GetBookmarkByArticleIdRequest {
  articleId: string;
}

export interface Bookmark {
  id: string;
  articleId: string;
  userId: string;
  platformId?: string | undefined;
  title: string;
  description: string;
  articleUrl: string;
  thumbnailUrl: string;
  publishedAt?: Timestamp | undefined;
  platformName: string;
  platformUrl: string;
  platformFaviconUrl: string;
  isEng: boolean;
  isRead: boolean;
  createdAt?: Timestamp | undefined;
  updatedAt?: Timestamp | undefined;
}

export const CHECKPICKS_BOOKMARK_V1_PACKAGE_NAME = "checkpicks.bookmark.v1";

export interface BookmarkServiceClient {
  getBookmarkByArticleId(request: GetBookmarkByArticleIdRequest): Observable<GetBookmarkResponse>;
}

export interface BookmarkServiceController {
  getBookmarkByArticleId(
    request: GetBookmarkByArticleIdRequest,
  ): Promise<GetBookmarkResponse> | Observable<GetBookmarkResponse> | GetBookmarkResponse;
}

export function BookmarkServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getBookmarkByArticleId"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BookmarkService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BookmarkService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BOOKMARK_SERVICE_NAME = "BookmarkService";
