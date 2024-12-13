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

export class CreateArticleResponse extends jspb.Message { 

    hasArticle(): boolean;
    clearArticle(): void;
    getArticle(): Article | undefined;
    setArticle(value?: Article): CreateArticleResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateArticleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateArticleResponse): CreateArticleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateArticleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateArticleResponse;
    static deserializeBinaryFromReader(message: CreateArticleResponse, reader: jspb.BinaryReader): CreateArticleResponse;
}

export namespace CreateArticleResponse {
    export type AsObject = {
        article?: Article.AsObject,
    }
}

export class CreateUploadArticleRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): CreateUploadArticleRequest;
    getTitle(): string;
    setTitle(value: string): CreateUploadArticleRequest;
    getDescription(): string;
    setDescription(value: string): CreateUploadArticleRequest;
    getArticleUrl(): string;
    setArticleUrl(value: string): CreateUploadArticleRequest;
    getThumbnailUrl(): string;
    setThumbnailUrl(value: string): CreateUploadArticleRequest;
    getPlatformName(): string;
    setPlatformName(value: string): CreateUploadArticleRequest;
    getPlatformUrl(): string;
    setPlatformUrl(value: string): CreateUploadArticleRequest;
    getPlatformFaviconUrl(): string;
    setPlatformFaviconUrl(value: string): CreateUploadArticleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateUploadArticleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateUploadArticleRequest): CreateUploadArticleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateUploadArticleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateUploadArticleRequest;
    static deserializeBinaryFromReader(message: CreateUploadArticleRequest, reader: jspb.BinaryReader): CreateUploadArticleRequest;
}

export namespace CreateUploadArticleRequest {
    export type AsObject = {
        userId: string,
        title: string,
        description: string,
        articleUrl: string,
        thumbnailUrl: string,
        platformName: string,
        platformUrl: string,
        platformFaviconUrl: string,
    }
}

export class GetArticleOGPResponse extends jspb.Message { 

    hasOgp(): boolean;
    clearOgp(): void;
    getOgp(): OGP | undefined;
    setOgp(value?: OGP): GetArticleOGPResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetArticleOGPResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetArticleOGPResponse): GetArticleOGPResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetArticleOGPResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetArticleOGPResponse;
    static deserializeBinaryFromReader(message: GetArticleOGPResponse, reader: jspb.BinaryReader): GetArticleOGPResponse;
}

export namespace GetArticleOGPResponse {
    export type AsObject = {
        ogp?: OGP.AsObject,
    }
}

export class GetArticleOGPRequest extends jspb.Message { 
    getArticleUrl(): string;
    setArticleUrl(value: string): GetArticleOGPRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetArticleOGPRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetArticleOGPRequest): GetArticleOGPRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetArticleOGPRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetArticleOGPRequest;
    static deserializeBinaryFromReader(message: GetArticleOGPRequest, reader: jspb.BinaryReader): GetArticleOGPRequest;
}

export namespace GetArticleOGPRequest {
    export type AsObject = {
        articleUrl: string,
    }
}

export class GetFeedsResponse extends jspb.Message { 
    clearFeedEdgeList(): void;
    getFeedEdgeList(): Array<FeedEdge>;
    setFeedEdgeList(value: Array<FeedEdge>): GetFeedsResponse;
    addFeedEdge(value?: FeedEdge, index?: number): FeedEdge;

    hasPageInfo(): boolean;
    clearPageInfo(): void;
    getPageInfo(): PageInfo | undefined;
    setPageInfo(value?: PageInfo): GetFeedsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFeedsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetFeedsResponse): GetFeedsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFeedsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFeedsResponse;
    static deserializeBinaryFromReader(message: GetFeedsResponse, reader: jspb.BinaryReader): GetFeedsResponse;
}

export namespace GetFeedsResponse {
    export type AsObject = {
        feedEdgeList: Array<FeedEdge.AsObject>,
        pageInfo?: PageInfo.AsObject,
    }
}

export class GetFeedsRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): GetFeedsRequest;

    hasPlatformSiteType(): boolean;
    clearPlatformSiteType(): void;
    getPlatformSiteType(): google_protobuf_wrappers_pb.Int64Value | undefined;
    setPlatformSiteType(value?: google_protobuf_wrappers_pb.Int64Value): GetFeedsRequest;

    hasPlatformId(): boolean;
    clearPlatformId(): void;
    getPlatformId(): google_protobuf_wrappers_pb.StringValue | undefined;
    setPlatformId(value?: google_protobuf_wrappers_pb.StringValue): GetFeedsRequest;

    hasKeyword(): boolean;
    clearKeyword(): void;
    getKeyword(): google_protobuf_wrappers_pb.StringValue | undefined;
    setKeyword(value?: google_protobuf_wrappers_pb.StringValue): GetFeedsRequest;
    getCursor(): string;
    setCursor(value: string): GetFeedsRequest;
    getLimit(): number;
    setLimit(value: number): GetFeedsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFeedsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetFeedsRequest): GetFeedsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFeedsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFeedsRequest;
    static deserializeBinaryFromReader(message: GetFeedsRequest, reader: jspb.BinaryReader): GetFeedsRequest;
}

export namespace GetFeedsRequest {
    export type AsObject = {
        userId: string,
        platformSiteType?: google_protobuf_wrappers_pb.Int64Value.AsObject,
        platformId?: google_protobuf_wrappers_pb.StringValue.AsObject,
        keyword?: google_protobuf_wrappers_pb.StringValue.AsObject,
        cursor: string,
        limit: number,
    }
}

export class GetFeedResponse extends jspb.Message { 

    hasFeed(): boolean;
    clearFeed(): void;
    getFeed(): Feed | undefined;
    setFeed(value?: Feed): GetFeedResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFeedResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetFeedResponse): GetFeedResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFeedResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFeedResponse;
    static deserializeBinaryFromReader(message: GetFeedResponse, reader: jspb.BinaryReader): GetFeedResponse;
}

export namespace GetFeedResponse {
    export type AsObject = {
        feed?: Feed.AsObject,
    }
}

export class GetFeedRequest extends jspb.Message { 
    getFeedId(): string;
    setFeedId(value: string): GetFeedRequest;
    getUserId(): string;
    setUserId(value: string): GetFeedRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFeedRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetFeedRequest): GetFeedRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFeedRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFeedRequest;
    static deserializeBinaryFromReader(message: GetFeedRequest, reader: jspb.BinaryReader): GetFeedRequest;
}

export namespace GetFeedRequest {
    export type AsObject = {
        feedId: string,
        userId: string,
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
    clearMyFeedIdsList(): void;
    getMyFeedIdsList(): Array<string>;
    setMyFeedIdsList(value: Array<string>): Feed;
    addMyFeedIds(value: string, index?: number): string;
    getName(): string;
    setName(value: string): Feed;
    getDescription(): string;
    setDescription(value: string): Feed;
    getRssUrl(): string;
    setRssUrl(value: string): Feed;
    getSiteUrl(): string;
    setSiteUrl(value: string): Feed;
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
        myFeedIdsList: Array<string>,
        name: string,
        description: string,
        rssUrl: string,
        siteUrl: string,
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

export class FeedEdge extends jspb.Message { 

    hasFeed(): boolean;
    clearFeed(): void;
    getFeed(): Feed | undefined;
    setFeed(value?: Feed): FeedEdge;
    getCursor(): string;
    setCursor(value: string): FeedEdge;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FeedEdge.AsObject;
    static toObject(includeInstance: boolean, msg: FeedEdge): FeedEdge.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FeedEdge, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FeedEdge;
    static deserializeBinaryFromReader(message: FeedEdge, reader: jspb.BinaryReader): FeedEdge;
}

export namespace FeedEdge {
    export type AsObject = {
        feed?: Feed.AsObject,
        cursor: string,
    }
}

export class OGP extends jspb.Message { 
    getTitle(): string;
    setTitle(value: string): OGP;

    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): google_protobuf_wrappers_pb.StringValue | undefined;
    setDescription(value?: google_protobuf_wrappers_pb.StringValue): OGP;
    getArticleUrl(): string;
    setArticleUrl(value: string): OGP;
    getSiteUrl(): string;
    setSiteUrl(value: string): OGP;
    getSiteName(): string;
    setSiteName(value: string): OGP;
    getThumbnailUrl(): string;
    setThumbnailUrl(value: string): OGP;
    getFaviconUrl(): string;
    setFaviconUrl(value: string): OGP;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OGP.AsObject;
    static toObject(includeInstance: boolean, msg: OGP): OGP.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: OGP, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OGP;
    static deserializeBinaryFromReader(message: OGP, reader: jspb.BinaryReader): OGP;
}

export namespace OGP {
    export type AsObject = {
        title: string,
        description?: google_protobuf_wrappers_pb.StringValue.AsObject,
        articleUrl: string,
        siteUrl: string,
        siteName: string,
        thumbnailUrl: string,
        faviconUrl: string,
    }
}
