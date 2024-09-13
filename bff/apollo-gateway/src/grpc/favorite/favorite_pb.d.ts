// package: checkpicks.favorite.v1
// file: favorite/favorite.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class GetFavoriteArticleFoldersRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): GetFavoriteArticleFoldersRequest;

    hasKeyword(): boolean;
    clearKeyword(): void;
    getKeyword(): google_protobuf_wrappers_pb.StringValue | undefined;
    setKeyword(value?: google_protobuf_wrappers_pb.StringValue): GetFavoriteArticleFoldersRequest;
    getCursor(): string;
    setCursor(value: string): GetFavoriteArticleFoldersRequest;
    getLimit(): number;
    setLimit(value: number): GetFavoriteArticleFoldersRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFavoriteArticleFoldersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetFavoriteArticleFoldersRequest): GetFavoriteArticleFoldersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFavoriteArticleFoldersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFavoriteArticleFoldersRequest;
    static deserializeBinaryFromReader(message: GetFavoriteArticleFoldersRequest, reader: jspb.BinaryReader): GetFavoriteArticleFoldersRequest;
}

export namespace GetFavoriteArticleFoldersRequest {
    export type AsObject = {
        userId: string,
        keyword?: google_protobuf_wrappers_pb.StringValue.AsObject,
        cursor: string,
        limit: number,
    }
}

export class GetFavoriteArticleFoldersResponse extends jspb.Message { 
    clearFavoriteArticleFoldersEdgeList(): void;
    getFavoriteArticleFoldersEdgeList(): Array<FavoriteArticleFolderEdge>;
    setFavoriteArticleFoldersEdgeList(value: Array<FavoriteArticleFolderEdge>): GetFavoriteArticleFoldersResponse;
    addFavoriteArticleFoldersEdge(value?: FavoriteArticleFolderEdge, index?: number): FavoriteArticleFolderEdge;

    hasPageInfo(): boolean;
    clearPageInfo(): void;
    getPageInfo(): PageInfo | undefined;
    setPageInfo(value?: PageInfo): GetFavoriteArticleFoldersResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFavoriteArticleFoldersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetFavoriteArticleFoldersResponse): GetFavoriteArticleFoldersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFavoriteArticleFoldersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFavoriteArticleFoldersResponse;
    static deserializeBinaryFromReader(message: GetFavoriteArticleFoldersResponse, reader: jspb.BinaryReader): GetFavoriteArticleFoldersResponse;
}

export namespace GetFavoriteArticleFoldersResponse {
    export type AsObject = {
        favoriteArticleFoldersEdgeList: Array<FavoriteArticleFolderEdge.AsObject>,
        pageInfo?: PageInfo.AsObject,
    }
}

export class GetFavoriteArticleFolderResponse extends jspb.Message { 

    hasFavoriteArticleFolder(): boolean;
    clearFavoriteArticleFolder(): void;
    getFavoriteArticleFolder(): FavoriteArticleFolder | undefined;
    setFavoriteArticleFolder(value?: FavoriteArticleFolder): GetFavoriteArticleFolderResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFavoriteArticleFolderResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetFavoriteArticleFolderResponse): GetFavoriteArticleFolderResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFavoriteArticleFolderResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFavoriteArticleFolderResponse;
    static deserializeBinaryFromReader(message: GetFavoriteArticleFolderResponse, reader: jspb.BinaryReader): GetFavoriteArticleFolderResponse;
}

export namespace GetFavoriteArticleFolderResponse {
    export type AsObject = {
        favoriteArticleFolder?: FavoriteArticleFolder.AsObject,
    }
}

export class GetFavoriteArticleFolderByArticleIdRequest extends jspb.Message { 
    getArticleId(): string;
    setArticleId(value: string): GetFavoriteArticleFolderByArticleIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFavoriteArticleFolderByArticleIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetFavoriteArticleFolderByArticleIdRequest): GetFavoriteArticleFolderByArticleIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFavoriteArticleFolderByArticleIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFavoriteArticleFolderByArticleIdRequest;
    static deserializeBinaryFromReader(message: GetFavoriteArticleFolderByArticleIdRequest, reader: jspb.BinaryReader): GetFavoriteArticleFolderByArticleIdRequest;
}

export namespace GetFavoriteArticleFolderByArticleIdRequest {
    export type AsObject = {
        articleId: string,
    }
}

export class CreateFavoriteArticleFolderResponse extends jspb.Message { 

    hasFavoriteArticleFolder(): boolean;
    clearFavoriteArticleFolder(): void;
    getFavoriteArticleFolder(): FavoriteArticleFolder | undefined;
    setFavoriteArticleFolder(value?: FavoriteArticleFolder): CreateFavoriteArticleFolderResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateFavoriteArticleFolderResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateFavoriteArticleFolderResponse): CreateFavoriteArticleFolderResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateFavoriteArticleFolderResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateFavoriteArticleFolderResponse;
    static deserializeBinaryFromReader(message: CreateFavoriteArticleFolderResponse, reader: jspb.BinaryReader): CreateFavoriteArticleFolderResponse;
}

export namespace CreateFavoriteArticleFolderResponse {
    export type AsObject = {
        favoriteArticleFolder?: FavoriteArticleFolder.AsObject,
    }
}

export class CreateFavoriteArticleFolderRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): CreateFavoriteArticleFolderRequest;
    getTitle(): string;
    setTitle(value: string): CreateFavoriteArticleFolderRequest;
    getDescription(): string;
    setDescription(value: string): CreateFavoriteArticleFolderRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateFavoriteArticleFolderRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateFavoriteArticleFolderRequest): CreateFavoriteArticleFolderRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateFavoriteArticleFolderRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateFavoriteArticleFolderRequest;
    static deserializeBinaryFromReader(message: CreateFavoriteArticleFolderRequest, reader: jspb.BinaryReader): CreateFavoriteArticleFolderRequest;
}

export namespace CreateFavoriteArticleFolderRequest {
    export type AsObject = {
        userId: string,
        title: string,
        description: string,
    }
}

export class FavoriteArticleFolderEdge extends jspb.Message { 

    hasNode(): boolean;
    clearNode(): void;
    getNode(): FavoriteArticleFolder | undefined;
    setNode(value?: FavoriteArticleFolder): FavoriteArticleFolderEdge;
    getCursor(): string;
    setCursor(value: string): FavoriteArticleFolderEdge;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FavoriteArticleFolderEdge.AsObject;
    static toObject(includeInstance: boolean, msg: FavoriteArticleFolderEdge): FavoriteArticleFolderEdge.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FavoriteArticleFolderEdge, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FavoriteArticleFolderEdge;
    static deserializeBinaryFromReader(message: FavoriteArticleFolderEdge, reader: jspb.BinaryReader): FavoriteArticleFolderEdge;
}

export namespace FavoriteArticleFolderEdge {
    export type AsObject = {
        node?: FavoriteArticleFolder.AsObject,
        cursor: string,
    }
}

export class FavoriteArticle extends jspb.Message { 
    getId(): string;
    setId(value: string): FavoriteArticle;
    getArticleId(): string;
    setArticleId(value: string): FavoriteArticle;

    hasPlatformId(): boolean;
    clearPlatformId(): void;
    getPlatformId(): google_protobuf_wrappers_pb.StringValue | undefined;
    setPlatformId(value?: google_protobuf_wrappers_pb.StringValue): FavoriteArticle;
    getFavoriteArticleFolderId(): string;
    setFavoriteArticleFolderId(value: string): FavoriteArticle;
    getUserId(): string;
    setUserId(value: string): FavoriteArticle;
    getTitle(): string;
    setTitle(value: string): FavoriteArticle;
    getThumbnailUrl(): string;
    setThumbnailUrl(value: string): FavoriteArticle;
    getArticleUrl(): string;
    setArticleUrl(value: string): FavoriteArticle;
    getPlatformFaviconUrl(): string;
    setPlatformFaviconUrl(value: string): FavoriteArticle;

    hasPublishedAt(): boolean;
    clearPublishedAt(): void;
    getPublishedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setPublishedAt(value?: google_protobuf_timestamp_pb.Timestamp): FavoriteArticle;

    hasAuthorName(): boolean;
    clearAuthorName(): void;
    getAuthorName(): google_protobuf_wrappers_pb.StringValue | undefined;
    setAuthorName(value?: google_protobuf_wrappers_pb.StringValue): FavoriteArticle;

    hasTags(): boolean;
    clearTags(): void;
    getTags(): google_protobuf_wrappers_pb.StringValue | undefined;
    setTags(value?: google_protobuf_wrappers_pb.StringValue): FavoriteArticle;
    getPlatformName(): string;
    setPlatformName(value: string): FavoriteArticle;
    getPlatformUrl(): string;
    setPlatformUrl(value: string): FavoriteArticle;
    getIsEng(): boolean;
    setIsEng(value: boolean): FavoriteArticle;
    getIsPrivate(): boolean;
    setIsPrivate(value: boolean): FavoriteArticle;
    getIsRead(): boolean;
    setIsRead(value: boolean): FavoriteArticle;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): FavoriteArticle;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): FavoriteArticle;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FavoriteArticle.AsObject;
    static toObject(includeInstance: boolean, msg: FavoriteArticle): FavoriteArticle.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FavoriteArticle, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FavoriteArticle;
    static deserializeBinaryFromReader(message: FavoriteArticle, reader: jspb.BinaryReader): FavoriteArticle;
}

export namespace FavoriteArticle {
    export type AsObject = {
        id: string,
        articleId: string,
        platformId?: google_protobuf_wrappers_pb.StringValue.AsObject,
        favoriteArticleFolderId: string,
        userId: string,
        title: string,
        thumbnailUrl: string,
        articleUrl: string,
        platformFaviconUrl: string,
        publishedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        authorName?: google_protobuf_wrappers_pb.StringValue.AsObject,
        tags?: google_protobuf_wrappers_pb.StringValue.AsObject,
        platformName: string,
        platformUrl: string,
        isEng: boolean,
        isPrivate: boolean,
        isRead: boolean,
        createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class FavoriteArticleFolder extends jspb.Message { 
    getId(): string;
    setId(value: string): FavoriteArticleFolder;
    getUserId(): string;
    setUserId(value: string): FavoriteArticleFolder;
    getTitle(): string;
    setTitle(value: string): FavoriteArticleFolder;
    getDescription(): string;
    setDescription(value: string): FavoriteArticleFolder;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): FavoriteArticleFolder;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): FavoriteArticleFolder;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FavoriteArticleFolder.AsObject;
    static toObject(includeInstance: boolean, msg: FavoriteArticleFolder): FavoriteArticleFolder.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FavoriteArticleFolder, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FavoriteArticleFolder;
    static deserializeBinaryFromReader(message: FavoriteArticleFolder, reader: jspb.BinaryReader): FavoriteArticleFolder;
}

export namespace FavoriteArticleFolder {
    export type AsObject = {
        id: string,
        userId: string,
        title: string,
        description: string,
        createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
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
