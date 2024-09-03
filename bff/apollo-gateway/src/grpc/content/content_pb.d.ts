// package: checkpicks.content.v1
// file: content/content.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class GetArticlesRequest extends jspb.Message { 

    hasUserId(): boolean;
    clearUserId(): void;
    getUserId(): google_protobuf_wrappers_pb.StringValue | undefined;
    setUserId(value?: google_protobuf_wrappers_pb.StringValue): GetArticlesRequest;

    hasLanguageStatus(): boolean;
    clearLanguageStatus(): void;
    getLanguageStatus(): google_protobuf_wrappers_pb.Int64Value | undefined;
    setLanguageStatus(value?: google_protobuf_wrappers_pb.Int64Value): GetArticlesRequest;

    hasTag(): boolean;
    clearTag(): void;
    getTag(): google_protobuf_wrappers_pb.StringValue | undefined;
    setTag(value?: google_protobuf_wrappers_pb.StringValue): GetArticlesRequest;
    clearFeedIdsList(): void;
    getFeedIdsList(): Array<google_protobuf_wrappers_pb.StringValue>;
    setFeedIdsList(value: Array<google_protobuf_wrappers_pb.StringValue>): GetArticlesRequest;
    addFeedIds(value?: google_protobuf_wrappers_pb.StringValue, index?: number): google_protobuf_wrappers_pb.StringValue;
    getCursor(): string;
    setCursor(value: string): GetArticlesRequest;
    getLimit(): number;
    setLimit(value: number): GetArticlesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetArticlesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetArticlesRequest): GetArticlesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetArticlesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetArticlesRequest;
    static deserializeBinaryFromReader(message: GetArticlesRequest, reader: jspb.BinaryReader): GetArticlesRequest;
}

export namespace GetArticlesRequest {
    export type AsObject = {
        userId?: google_protobuf_wrappers_pb.StringValue.AsObject,
        languageStatus?: google_protobuf_wrappers_pb.Int64Value.AsObject,
        tag?: google_protobuf_wrappers_pb.StringValue.AsObject,
        feedIdsList: Array<google_protobuf_wrappers_pb.StringValue.AsObject>,
        cursor: string,
        limit: number,
    }
}

export class GetArticlesResponse extends jspb.Message { 
    clearArticlesedgeList(): void;
    getArticlesedgeList(): Array<ArticleEdge>;
    setArticlesedgeList(value: Array<ArticleEdge>): GetArticlesResponse;
    addArticlesedge(value?: ArticleEdge, index?: number): ArticleEdge;

    hasPageInfo(): boolean;
    clearPageInfo(): void;
    getPageInfo(): PageInfo | undefined;
    setPageInfo(value?: PageInfo): GetArticlesResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetArticlesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetArticlesResponse): GetArticlesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetArticlesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetArticlesResponse;
    static deserializeBinaryFromReader(message: GetArticlesResponse, reader: jspb.BinaryReader): GetArticlesResponse;
}

export namespace GetArticlesResponse {
    export type AsObject = {
        articlesedgeList: Array<ArticleEdge.AsObject>,
        pageInfo?: PageInfo.AsObject,
    }
}

export class PageInfo extends jspb.Message { 
    getEndCursor(): string;
    setEndCursor(value: string): PageInfo;
    getHasNextPage(): boolean;
    setHasNextPage(value: boolean): PageInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PageInfo.AsObject;
    static toObject(includeInstance: boolean, msg: PageInfo): PageInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PageInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PageInfo;
    static deserializeBinaryFromReader(message: PageInfo, reader: jspb.BinaryReader): PageInfo;
}

export namespace PageInfo {
    export type AsObject = {
        endCursor: string,
        hasNextPage: boolean,
    }
}

export class Feed extends jspb.Message { 
    getId(): string;
    setId(value: string): Feed;

    hasPlatform(): boolean;
    clearPlatform(): void;
    getPlatform(): Platform | undefined;
    setPlatform(value?: Platform): Feed;

    hasCategory(): boolean;
    clearCategory(): void;
    getCategory(): Category | undefined;
    setCategory(value?: Category): Feed;
    getName(): string;
    setName(value: string): Feed;
    getDescription(): string;
    setDescription(value: string): Feed;
    getRssurl(): string;
    setRssurl(value: string): Feed;
    getSiteurl(): string;
    setSiteurl(value: string): Feed;
    getThumbnailUrl(): string;
    setThumbnailUrl(value: string): Feed;
    getTrendPlatformType(): number;
    setTrendPlatformType(value: number): Feed;

    hasApiQueryParam(): boolean;
    clearApiQueryParam(): void;
    getApiQueryParam(): google_protobuf_wrappers_pb.StringValue | undefined;
    setApiQueryParam(value?: google_protobuf_wrappers_pb.StringValue): Feed;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Feed;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Feed;

    hasDeletedAt(): boolean;
    clearDeletedAt(): void;
    getDeletedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setDeletedAt(value?: google_protobuf_timestamp_pb.Timestamp): Feed;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Feed.AsObject;
    static toObject(includeInstance: boolean, msg: Feed): Feed.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Feed, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Feed;
    static deserializeBinaryFromReader(message: Feed, reader: jspb.BinaryReader): Feed;
}

export namespace Feed {
    export type AsObject = {
        id: string,
        platform?: Platform.AsObject,
        category?: Category.AsObject,
        name: string,
        description: string,
        rssurl: string,
        siteurl: string,
        thumbnailUrl: string,
        trendPlatformType: number,
        apiQueryParam?: google_protobuf_wrappers_pb.StringValue.AsObject,
        createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        deletedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class Category extends jspb.Message { 
    getId(): string;
    setId(value: string): Category;
    getName(): string;
    setName(value: string): Category;
    getType(): number;
    setType(value: number): Category;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Category;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Category;

    hasDeletedAt(): boolean;
    clearDeletedAt(): void;
    getDeletedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setDeletedAt(value?: google_protobuf_timestamp_pb.Timestamp): Category;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Category.AsObject;
    static toObject(includeInstance: boolean, msg: Category): Category.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Category, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Category;
    static deserializeBinaryFromReader(message: Category, reader: jspb.BinaryReader): Category;
}

export namespace Category {
    export type AsObject = {
        id: string,
        name: string,
        type: number,
        createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        deletedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class Platform extends jspb.Message { 
    getId(): string;
    setId(value: string): Platform;
    getName(): string;
    setName(value: string): Platform;
    getSiteUrl(): string;
    setSiteUrl(value: string): Platform;
    getPlatformSiteType(): number;
    setPlatformSiteType(value: number): Platform;
    getFaviconUrl(): string;
    setFaviconUrl(value: string): Platform;
    getIsEng(): boolean;
    setIsEng(value: boolean): Platform;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Platform;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Platform;

    hasDeletedAt(): boolean;
    clearDeletedAt(): void;
    getDeletedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setDeletedAt(value?: google_protobuf_timestamp_pb.Timestamp): Platform;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Platform.AsObject;
    static toObject(includeInstance: boolean, msg: Platform): Platform.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Platform, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Platform;
    static deserializeBinaryFromReader(message: Platform, reader: jspb.BinaryReader): Platform;
}

export namespace Platform {
    export type AsObject = {
        id: string,
        name: string,
        siteUrl: string,
        platformSiteType: number,
        faviconUrl: string,
        isEng: boolean,
        createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        deletedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class Article extends jspb.Message { 
    getId(): string;
    setId(value: string): Article;

    hasPlatform(): boolean;
    clearPlatform(): void;
    getPlatform(): Platform | undefined;
    setPlatform(value?: Platform): Article;
    clearFeedsList(): void;
    getFeedsList(): Array<Feed>;
    setFeedsList(value: Array<Feed>): Article;
    addFeeds(value?: Feed, index?: number): Feed;
    getTitle(): string;
    setTitle(value: string): Article;
    getDescription(): string;
    setDescription(value: string): Article;
    getArticleUrl(): string;
    setArticleUrl(value: string): Article;

    hasPublishedAt(): boolean;
    clearPublishedAt(): void;
    getPublishedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setPublishedAt(value?: google_protobuf_timestamp_pb.Timestamp): Article;

    hasAuthorName(): boolean;
    clearAuthorName(): void;
    getAuthorName(): google_protobuf_wrappers_pb.StringValue | undefined;
    setAuthorName(value?: google_protobuf_wrappers_pb.StringValue): Article;

    hasTags(): boolean;
    clearTags(): void;
    getTags(): google_protobuf_wrappers_pb.StringValue | undefined;
    setTags(value?: google_protobuf_wrappers_pb.StringValue): Article;
    getThumbnailUrl(): string;
    setThumbnailUrl(value: string): Article;
    getIsEng(): boolean;
    setIsEng(value: boolean): Article;
    getIsPrivate(): boolean;
    setIsPrivate(value: boolean): Article;

    hasBookmarkId(): boolean;
    clearBookmarkId(): void;
    getBookmarkId(): google_protobuf_wrappers_pb.StringValue | undefined;
    setBookmarkId(value?: google_protobuf_wrappers_pb.StringValue): Article;
    getIsBookmarked(): boolean;
    setIsBookmarked(value: boolean): Article;
    getIsFollowing(): boolean;
    setIsFollowing(value: boolean): Article;
    clearFavoriteArticleFolderIdsList(): void;
    getFavoriteArticleFolderIdsList(): Array<string>;
    setFavoriteArticleFolderIdsList(value: Array<string>): Article;
    addFavoriteArticleFolderIds(value: string, index?: number): string;
    getLikeCount(): number;
    setLikeCount(value: number): Article;
    getIsTrend(): boolean;
    setIsTrend(value: boolean): Article;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Article;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Article;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Article.AsObject;
    static toObject(includeInstance: boolean, msg: Article): Article.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Article, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Article;
    static deserializeBinaryFromReader(message: Article, reader: jspb.BinaryReader): Article;
}

export namespace Article {
    export type AsObject = {
        id: string,
        platform?: Platform.AsObject,
        feedsList: Array<Feed.AsObject>,
        title: string,
        description: string,
        articleUrl: string,
        publishedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        authorName?: google_protobuf_wrappers_pb.StringValue.AsObject,
        tags?: google_protobuf_wrappers_pb.StringValue.AsObject,
        thumbnailUrl: string,
        isEng: boolean,
        isPrivate: boolean,
        bookmarkId?: google_protobuf_wrappers_pb.StringValue.AsObject,
        isBookmarked: boolean,
        isFollowing: boolean,
        favoriteArticleFolderIdsList: Array<string>,
        likeCount: number,
        isTrend: boolean,
        createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class ArticleEdge extends jspb.Message { 

    hasArticle(): boolean;
    clearArticle(): void;
    getArticle(): Article | undefined;
    setArticle(value?: Article): ArticleEdge;
    getCursor(): string;
    setCursor(value: string): ArticleEdge;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ArticleEdge.AsObject;
    static toObject(includeInstance: boolean, msg: ArticleEdge): ArticleEdge.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ArticleEdge, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ArticleEdge;
    static deserializeBinaryFromReader(message: ArticleEdge, reader: jspb.BinaryReader): ArticleEdge;
}

export namespace ArticleEdge {
    export type AsObject = {
        article?: Article.AsObject,
        cursor: string,
    }
}