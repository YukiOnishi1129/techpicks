// package: checkpicks.favorite.v1
// file: favorite/favorite.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class GetFavoriteArticleFoldersRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): GetFavoriteArticleFoldersRequest;

    hasKeyword(): boolean;
    clearKeyword(): void;
    getKeyword(): google_protobuf_wrappers_pb.StringValue | undefined;
    setKeyword(value?: google_protobuf_wrappers_pb.StringValue): GetFavoriteArticleFoldersRequest;

    hasCursor(): boolean;
    clearCursor(): void;
    getCursor(): google_protobuf_wrappers_pb.StringValue | undefined;
    setCursor(value?: google_protobuf_wrappers_pb.StringValue): GetFavoriteArticleFoldersRequest;

    hasLimit(): boolean;
    clearLimit(): void;
    getLimit(): google_protobuf_wrappers_pb.Int64Value | undefined;
    setLimit(value?: google_protobuf_wrappers_pb.Int64Value): GetFavoriteArticleFoldersRequest;

    hasFavoriteArticleLimit(): boolean;
    clearFavoriteArticleLimit(): void;
    getFavoriteArticleLimit(): google_protobuf_wrappers_pb.Int64Value | undefined;
    setFavoriteArticleLimit(value?: google_protobuf_wrappers_pb.Int64Value): GetFavoriteArticleFoldersRequest;

    hasIsFolderOnly(): boolean;
    clearIsFolderOnly(): void;
    getIsFolderOnly(): google_protobuf_wrappers_pb.BoolValue | undefined;
    setIsFolderOnly(value?: google_protobuf_wrappers_pb.BoolValue): GetFavoriteArticleFoldersRequest;

    hasIsAllFetch(): boolean;
    clearIsAllFetch(): void;
    getIsAllFetch(): google_protobuf_wrappers_pb.BoolValue | undefined;
    setIsAllFetch(value?: google_protobuf_wrappers_pb.BoolValue): GetFavoriteArticleFoldersRequest;

    hasIsFavoriteArticleAllFetch(): boolean;
    clearIsFavoriteArticleAllFetch(): void;
    getIsFavoriteArticleAllFetch(): google_protobuf_wrappers_pb.BoolValue | undefined;
    setIsFavoriteArticleAllFetch(value?: google_protobuf_wrappers_pb.BoolValue): GetFavoriteArticleFoldersRequest;

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
        cursor?: google_protobuf_wrappers_pb.StringValue.AsObject,
        limit?: google_protobuf_wrappers_pb.Int64Value.AsObject,
        favoriteArticleLimit?: google_protobuf_wrappers_pb.Int64Value.AsObject,
        isFolderOnly?: google_protobuf_wrappers_pb.BoolValue.AsObject,
        isAllFetch?: google_protobuf_wrappers_pb.BoolValue.AsObject,
        isFavoriteArticleAllFetch?: google_protobuf_wrappers_pb.BoolValue.AsObject,
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

export class GetFavoriteAllFolderArticlesRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): GetFavoriteAllFolderArticlesRequest;

    hasKeyword(): boolean;
    clearKeyword(): void;
    getKeyword(): google_protobuf_wrappers_pb.StringValue | undefined;
    setKeyword(value?: google_protobuf_wrappers_pb.StringValue): GetFavoriteAllFolderArticlesRequest;

    hasCursor(): boolean;
    clearCursor(): void;
    getCursor(): google_protobuf_wrappers_pb.StringValue | undefined;
    setCursor(value?: google_protobuf_wrappers_pb.StringValue): GetFavoriteAllFolderArticlesRequest;

    hasLimit(): boolean;
    clearLimit(): void;
    getLimit(): google_protobuf_wrappers_pb.Int64Value | undefined;
    setLimit(value?: google_protobuf_wrappers_pb.Int64Value): GetFavoriteAllFolderArticlesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFavoriteAllFolderArticlesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetFavoriteAllFolderArticlesRequest): GetFavoriteAllFolderArticlesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFavoriteAllFolderArticlesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFavoriteAllFolderArticlesRequest;
    static deserializeBinaryFromReader(message: GetFavoriteAllFolderArticlesRequest, reader: jspb.BinaryReader): GetFavoriteAllFolderArticlesRequest;
}

export namespace GetFavoriteAllFolderArticlesRequest {
    export type AsObject = {
        userId: string,
        keyword?: google_protobuf_wrappers_pb.StringValue.AsObject,
        cursor?: google_protobuf_wrappers_pb.StringValue.AsObject,
        limit?: google_protobuf_wrappers_pb.Int64Value.AsObject,
    }
}

export class GetFavoriteAllFolderArticlesResponse extends jspb.Message { 
    clearFavoriteAllFolderArticleEdgeList(): void;
    getFavoriteAllFolderArticleEdgeList(): Array<FavoriteAllFolderArticleEdge>;
    setFavoriteAllFolderArticleEdgeList(value: Array<FavoriteAllFolderArticleEdge>): GetFavoriteAllFolderArticlesResponse;
    addFavoriteAllFolderArticleEdge(value?: FavoriteAllFolderArticleEdge, index?: number): FavoriteAllFolderArticleEdge;

    hasPageInfo(): boolean;
    clearPageInfo(): void;
    getPageInfo(): PageInfo | undefined;
    setPageInfo(value?: PageInfo): GetFavoriteAllFolderArticlesResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFavoriteAllFolderArticlesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetFavoriteAllFolderArticlesResponse): GetFavoriteAllFolderArticlesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFavoriteAllFolderArticlesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFavoriteAllFolderArticlesResponse;
    static deserializeBinaryFromReader(message: GetFavoriteAllFolderArticlesResponse, reader: jspb.BinaryReader): GetFavoriteAllFolderArticlesResponse;
}

export namespace GetFavoriteAllFolderArticlesResponse {
    export type AsObject = {
        favoriteAllFolderArticleEdgeList: Array<FavoriteAllFolderArticleEdge.AsObject>,
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

export class GetFavoriteArticleFolderByIdRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): GetFavoriteArticleFolderByIdRequest;
    getUserId(): string;
    setUserId(value: string): GetFavoriteArticleFolderByIdRequest;

    hasIsFolderOnly(): boolean;
    clearIsFolderOnly(): void;
    getIsFolderOnly(): google_protobuf_wrappers_pb.BoolValue | undefined;
    setIsFolderOnly(value?: google_protobuf_wrappers_pb.BoolValue): GetFavoriteArticleFolderByIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFavoriteArticleFolderByIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetFavoriteArticleFolderByIdRequest): GetFavoriteArticleFolderByIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFavoriteArticleFolderByIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFavoriteArticleFolderByIdRequest;
    static deserializeBinaryFromReader(message: GetFavoriteArticleFolderByIdRequest, reader: jspb.BinaryReader): GetFavoriteArticleFolderByIdRequest;
}

export namespace GetFavoriteArticleFolderByIdRequest {
    export type AsObject = {
        id: string,
        userId: string,
        isFolderOnly?: google_protobuf_wrappers_pb.BoolValue.AsObject,
    }
}

export class GetFavoriteArticleFoldersByArticleIdRequest extends jspb.Message { 
    getArticleId(): string;
    setArticleId(value: string): GetFavoriteArticleFoldersByArticleIdRequest;
    getUserId(): string;
    setUserId(value: string): GetFavoriteArticleFoldersByArticleIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFavoriteArticleFoldersByArticleIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetFavoriteArticleFoldersByArticleIdRequest): GetFavoriteArticleFoldersByArticleIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFavoriteArticleFoldersByArticleIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFavoriteArticleFoldersByArticleIdRequest;
    static deserializeBinaryFromReader(message: GetFavoriteArticleFoldersByArticleIdRequest, reader: jspb.BinaryReader): GetFavoriteArticleFoldersByArticleIdRequest;
}

export namespace GetFavoriteArticleFoldersByArticleIdRequest {
    export type AsObject = {
        articleId: string,
        userId: string,
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

    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): google_protobuf_wrappers_pb.StringValue | undefined;
    setDescription(value?: google_protobuf_wrappers_pb.StringValue): CreateFavoriteArticleFolderRequest;

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
        description?: google_protobuf_wrappers_pb.StringValue.AsObject,
    }
}

export class UpdateFavoriteArticleFolderResponse extends jspb.Message { 

    hasFavoriteArticleFolder(): boolean;
    clearFavoriteArticleFolder(): void;
    getFavoriteArticleFolder(): FavoriteArticleFolder | undefined;
    setFavoriteArticleFolder(value?: FavoriteArticleFolder): UpdateFavoriteArticleFolderResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateFavoriteArticleFolderResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateFavoriteArticleFolderResponse): UpdateFavoriteArticleFolderResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateFavoriteArticleFolderResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateFavoriteArticleFolderResponse;
    static deserializeBinaryFromReader(message: UpdateFavoriteArticleFolderResponse, reader: jspb.BinaryReader): UpdateFavoriteArticleFolderResponse;
}

export namespace UpdateFavoriteArticleFolderResponse {
    export type AsObject = {
        favoriteArticleFolder?: FavoriteArticleFolder.AsObject,
    }
}

export class UpdateFavoriteArticleFolderRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): UpdateFavoriteArticleFolderRequest;
    getUserId(): string;
    setUserId(value: string): UpdateFavoriteArticleFolderRequest;
    getTitle(): string;
    setTitle(value: string): UpdateFavoriteArticleFolderRequest;

    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): google_protobuf_wrappers_pb.StringValue | undefined;
    setDescription(value?: google_protobuf_wrappers_pb.StringValue): UpdateFavoriteArticleFolderRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateFavoriteArticleFolderRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateFavoriteArticleFolderRequest): UpdateFavoriteArticleFolderRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateFavoriteArticleFolderRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateFavoriteArticleFolderRequest;
    static deserializeBinaryFromReader(message: UpdateFavoriteArticleFolderRequest, reader: jspb.BinaryReader): UpdateFavoriteArticleFolderRequest;
}

export namespace UpdateFavoriteArticleFolderRequest {
    export type AsObject = {
        id: string,
        userId: string,
        title: string,
        description?: google_protobuf_wrappers_pb.StringValue.AsObject,
    }
}

export class DeleteFavoriteArticleFolderRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): DeleteFavoriteArticleFolderRequest;
    getUserId(): string;
    setUserId(value: string): DeleteFavoriteArticleFolderRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteFavoriteArticleFolderRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteFavoriteArticleFolderRequest): DeleteFavoriteArticleFolderRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteFavoriteArticleFolderRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteFavoriteArticleFolderRequest;
    static deserializeBinaryFromReader(message: DeleteFavoriteArticleFolderRequest, reader: jspb.BinaryReader): DeleteFavoriteArticleFolderRequest;
}

export namespace DeleteFavoriteArticleFolderRequest {
    export type AsObject = {
        id: string,
        userId: string,
    }
}

export class GetFavoriteArticlesResponse extends jspb.Message { 
    clearFavoriteArticlesEdgeList(): void;
    getFavoriteArticlesEdgeList(): Array<FavoriteArticleEdge>;
    setFavoriteArticlesEdgeList(value: Array<FavoriteArticleEdge>): GetFavoriteArticlesResponse;
    addFavoriteArticlesEdge(value?: FavoriteArticleEdge, index?: number): FavoriteArticleEdge;

    hasPageInfo(): boolean;
    clearPageInfo(): void;
    getPageInfo(): PageInfo | undefined;
    setPageInfo(value?: PageInfo): GetFavoriteArticlesResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFavoriteArticlesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetFavoriteArticlesResponse): GetFavoriteArticlesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFavoriteArticlesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFavoriteArticlesResponse;
    static deserializeBinaryFromReader(message: GetFavoriteArticlesResponse, reader: jspb.BinaryReader): GetFavoriteArticlesResponse;
}

export namespace GetFavoriteArticlesResponse {
    export type AsObject = {
        favoriteArticlesEdgeList: Array<FavoriteArticleEdge.AsObject>,
        pageInfo?: PageInfo.AsObject,
    }
}

export class GetFavoriteArticlesRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): GetFavoriteArticlesRequest;

    hasKeyword(): boolean;
    clearKeyword(): void;
    getKeyword(): google_protobuf_wrappers_pb.StringValue | undefined;
    setKeyword(value?: google_protobuf_wrappers_pb.StringValue): GetFavoriteArticlesRequest;

    hasCursor(): boolean;
    clearCursor(): void;
    getCursor(): google_protobuf_wrappers_pb.StringValue | undefined;
    setCursor(value?: google_protobuf_wrappers_pb.StringValue): GetFavoriteArticlesRequest;

    hasLimit(): boolean;
    clearLimit(): void;
    getLimit(): google_protobuf_wrappers_pb.Int64Value | undefined;
    setLimit(value?: google_protobuf_wrappers_pb.Int64Value): GetFavoriteArticlesRequest;

    hasFavoriteArticleFolderId(): boolean;
    clearFavoriteArticleFolderId(): void;
    getFavoriteArticleFolderId(): google_protobuf_wrappers_pb.StringValue | undefined;
    setFavoriteArticleFolderId(value?: google_protobuf_wrappers_pb.StringValue): GetFavoriteArticlesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFavoriteArticlesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetFavoriteArticlesRequest): GetFavoriteArticlesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFavoriteArticlesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFavoriteArticlesRequest;
    static deserializeBinaryFromReader(message: GetFavoriteArticlesRequest, reader: jspb.BinaryReader): GetFavoriteArticlesRequest;
}

export namespace GetFavoriteArticlesRequest {
    export type AsObject = {
        userId: string,
        keyword?: google_protobuf_wrappers_pb.StringValue.AsObject,
        cursor?: google_protobuf_wrappers_pb.StringValue.AsObject,
        limit?: google_protobuf_wrappers_pb.Int64Value.AsObject,
        favoriteArticleFolderId?: google_protobuf_wrappers_pb.StringValue.AsObject,
    }
}

export class CreateFavoriteArticleResponse extends jspb.Message { 

    hasFavoriteArticle(): boolean;
    clearFavoriteArticle(): void;
    getFavoriteArticle(): FavoriteArticle | undefined;
    setFavoriteArticle(value?: FavoriteArticle): CreateFavoriteArticleResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateFavoriteArticleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateFavoriteArticleResponse): CreateFavoriteArticleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateFavoriteArticleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateFavoriteArticleResponse;
    static deserializeBinaryFromReader(message: CreateFavoriteArticleResponse, reader: jspb.BinaryReader): CreateFavoriteArticleResponse;
}

export namespace CreateFavoriteArticleResponse {
    export type AsObject = {
        favoriteArticle?: FavoriteArticle.AsObject,
    }
}

export class CreateFavoriteArticleRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): CreateFavoriteArticleRequest;
    getArticleId(): string;
    setArticleId(value: string): CreateFavoriteArticleRequest;
    getFavoriteArticleFolderId(): string;
    setFavoriteArticleFolderId(value: string): CreateFavoriteArticleRequest;

    hasPlatformId(): boolean;
    clearPlatformId(): void;
    getPlatformId(): google_protobuf_wrappers_pb.StringValue | undefined;
    setPlatformId(value?: google_protobuf_wrappers_pb.StringValue): CreateFavoriteArticleRequest;
    getTitle(): string;
    setTitle(value: string): CreateFavoriteArticleRequest;

    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): google_protobuf_wrappers_pb.StringValue | undefined;
    setDescription(value?: google_protobuf_wrappers_pb.StringValue): CreateFavoriteArticleRequest;
    getThumbnailUrl(): string;
    setThumbnailUrl(value: string): CreateFavoriteArticleRequest;
    getArticleUrl(): string;
    setArticleUrl(value: string): CreateFavoriteArticleRequest;

    hasPublishedAt(): boolean;
    clearPublishedAt(): void;
    getPublishedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setPublishedAt(value?: google_protobuf_timestamp_pb.Timestamp): CreateFavoriteArticleRequest;

    hasAuthorName(): boolean;
    clearAuthorName(): void;
    getAuthorName(): google_protobuf_wrappers_pb.StringValue | undefined;
    setAuthorName(value?: google_protobuf_wrappers_pb.StringValue): CreateFavoriteArticleRequest;

    hasTags(): boolean;
    clearTags(): void;
    getTags(): google_protobuf_wrappers_pb.StringValue | undefined;
    setTags(value?: google_protobuf_wrappers_pb.StringValue): CreateFavoriteArticleRequest;
    getPlatformName(): string;
    setPlatformName(value: string): CreateFavoriteArticleRequest;
    getPlatformUrl(): string;
    setPlatformUrl(value: string): CreateFavoriteArticleRequest;
    getPlatformFaviconUrl(): string;
    setPlatformFaviconUrl(value: string): CreateFavoriteArticleRequest;
    getIsEng(): boolean;
    setIsEng(value: boolean): CreateFavoriteArticleRequest;
    getIsPrivate(): boolean;
    setIsPrivate(value: boolean): CreateFavoriteArticleRequest;
    getIsRead(): boolean;
    setIsRead(value: boolean): CreateFavoriteArticleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateFavoriteArticleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateFavoriteArticleRequest): CreateFavoriteArticleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateFavoriteArticleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateFavoriteArticleRequest;
    static deserializeBinaryFromReader(message: CreateFavoriteArticleRequest, reader: jspb.BinaryReader): CreateFavoriteArticleRequest;
}

export namespace CreateFavoriteArticleRequest {
    export type AsObject = {
        userId: string,
        articleId: string,
        favoriteArticleFolderId: string,
        platformId?: google_protobuf_wrappers_pb.StringValue.AsObject,
        title: string,
        description?: google_protobuf_wrappers_pb.StringValue.AsObject,
        thumbnailUrl: string,
        articleUrl: string,
        publishedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        authorName?: google_protobuf_wrappers_pb.StringValue.AsObject,
        tags?: google_protobuf_wrappers_pb.StringValue.AsObject,
        platformName: string,
        platformUrl: string,
        platformFaviconUrl: string,
        isEng: boolean,
        isPrivate: boolean,
        isRead: boolean,
    }
}

export class CreateFavoriteArticleForUploadArticleRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): CreateFavoriteArticleForUploadArticleRequest;
    getFavoriteArticleFolderId(): string;
    setFavoriteArticleFolderId(value: string): CreateFavoriteArticleForUploadArticleRequest;
    getTitle(): string;
    setTitle(value: string): CreateFavoriteArticleForUploadArticleRequest;
    getDescription(): string;
    setDescription(value: string): CreateFavoriteArticleForUploadArticleRequest;
    getThumbnailUrl(): string;
    setThumbnailUrl(value: string): CreateFavoriteArticleForUploadArticleRequest;
    getArticleUrl(): string;
    setArticleUrl(value: string): CreateFavoriteArticleForUploadArticleRequest;
    getPlatformName(): string;
    setPlatformName(value: string): CreateFavoriteArticleForUploadArticleRequest;
    getPlatformUrl(): string;
    setPlatformUrl(value: string): CreateFavoriteArticleForUploadArticleRequest;
    getPlatformFaviconUrl(): string;
    setPlatformFaviconUrl(value: string): CreateFavoriteArticleForUploadArticleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateFavoriteArticleForUploadArticleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateFavoriteArticleForUploadArticleRequest): CreateFavoriteArticleForUploadArticleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateFavoriteArticleForUploadArticleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateFavoriteArticleForUploadArticleRequest;
    static deserializeBinaryFromReader(message: CreateFavoriteArticleForUploadArticleRequest, reader: jspb.BinaryReader): CreateFavoriteArticleForUploadArticleRequest;
}

export namespace CreateFavoriteArticleForUploadArticleRequest {
    export type AsObject = {
        userId: string,
        favoriteArticleFolderId: string,
        title: string,
        description: string,
        thumbnailUrl: string,
        articleUrl: string,
        platformName: string,
        platformUrl: string,
        platformFaviconUrl: string,
    }
}

export class DeleteFavoriteArticleRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): DeleteFavoriteArticleRequest;
    getUserId(): string;
    setUserId(value: string): DeleteFavoriteArticleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteFavoriteArticleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteFavoriteArticleRequest): DeleteFavoriteArticleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteFavoriteArticleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteFavoriteArticleRequest;
    static deserializeBinaryFromReader(message: DeleteFavoriteArticleRequest, reader: jspb.BinaryReader): DeleteFavoriteArticleRequest;
}

export namespace DeleteFavoriteArticleRequest {
    export type AsObject = {
        id: string,
        userId: string,
    }
}

export class DeleteFavoriteArticleByArticleIdRequest extends jspb.Message { 
    getArticleId(): string;
    setArticleId(value: string): DeleteFavoriteArticleByArticleIdRequest;
    getUserId(): string;
    setUserId(value: string): DeleteFavoriteArticleByArticleIdRequest;
    getFavoriteArticleFolderId(): string;
    setFavoriteArticleFolderId(value: string): DeleteFavoriteArticleByArticleIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteFavoriteArticleByArticleIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteFavoriteArticleByArticleIdRequest): DeleteFavoriteArticleByArticleIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteFavoriteArticleByArticleIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteFavoriteArticleByArticleIdRequest;
    static deserializeBinaryFromReader(message: DeleteFavoriteArticleByArticleIdRequest, reader: jspb.BinaryReader): DeleteFavoriteArticleByArticleIdRequest;
}

export namespace DeleteFavoriteArticleByArticleIdRequest {
    export type AsObject = {
        articleId: string,
        userId: string,
        favoriteArticleFolderId: string,
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

export class FavoriteArticleEdge extends jspb.Message { 

    hasNode(): boolean;
    clearNode(): void;
    getNode(): FavoriteArticle | undefined;
    setNode(value?: FavoriteArticle): FavoriteArticleEdge;
    getCursor(): string;
    setCursor(value: string): FavoriteArticleEdge;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FavoriteArticleEdge.AsObject;
    static toObject(includeInstance: boolean, msg: FavoriteArticleEdge): FavoriteArticleEdge.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FavoriteArticleEdge, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FavoriteArticleEdge;
    static deserializeBinaryFromReader(message: FavoriteArticleEdge, reader: jspb.BinaryReader): FavoriteArticleEdge;
}

export namespace FavoriteArticleEdge {
    export type AsObject = {
        node?: FavoriteArticle.AsObject,
        cursor: string,
    }
}

export class FavoriteAllFolderArticleEdge extends jspb.Message { 

    hasNode(): boolean;
    clearNode(): void;
    getNode(): FavoriteArticle | undefined;
    setNode(value?: FavoriteArticle): FavoriteAllFolderArticleEdge;
    getCursor(): string;
    setCursor(value: string): FavoriteAllFolderArticleEdge;
    clearFavoriteArticleFoldersList(): void;
    getFavoriteArticleFoldersList(): Array<FavoriteArticleFolder>;
    setFavoriteArticleFoldersList(value: Array<FavoriteArticleFolder>): FavoriteAllFolderArticleEdge;
    addFavoriteArticleFolders(value?: FavoriteArticleFolder, index?: number): FavoriteArticleFolder;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FavoriteAllFolderArticleEdge.AsObject;
    static toObject(includeInstance: boolean, msg: FavoriteAllFolderArticleEdge): FavoriteAllFolderArticleEdge.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FavoriteAllFolderArticleEdge, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FavoriteAllFolderArticleEdge;
    static deserializeBinaryFromReader(message: FavoriteAllFolderArticleEdge, reader: jspb.BinaryReader): FavoriteAllFolderArticleEdge;
}

export namespace FavoriteAllFolderArticleEdge {
    export type AsObject = {
        node?: FavoriteArticle.AsObject,
        cursor: string,
        favoriteArticleFoldersList: Array<FavoriteArticleFolder.AsObject>,
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
    getDescription(): string;
    setDescription(value: string): FavoriteArticle;
    getThumbnailUrl(): string;
    setThumbnailUrl(value: string): FavoriteArticle;
    getArticleUrl(): string;
    setArticleUrl(value: string): FavoriteArticle;

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
    getPlatformFaviconUrl(): string;
    setPlatformFaviconUrl(value: string): FavoriteArticle;
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
        description: string,
        thumbnailUrl: string,
        articleUrl: string,
        publishedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        authorName?: google_protobuf_wrappers_pb.StringValue.AsObject,
        tags?: google_protobuf_wrappers_pb.StringValue.AsObject,
        platformName: string,
        platformUrl: string,
        platformFaviconUrl: string,
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
    clearFavoriteArticlesList(): void;
    getFavoriteArticlesList(): Array<FavoriteArticle>;
    setFavoriteArticlesList(value: Array<FavoriteArticle>): FavoriteArticleFolder;
    addFavoriteArticles(value?: FavoriteArticle, index?: number): FavoriteArticle;

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
        favoriteArticlesList: Array<FavoriteArticle.AsObject>,
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
