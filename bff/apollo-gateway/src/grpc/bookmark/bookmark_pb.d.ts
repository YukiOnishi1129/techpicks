// package: checkpicks.bookmark.v1
// file: bookmark/bookmark.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class GetBookmarkResponse extends jspb.Message { 

    hasBookmark(): boolean;
    clearBookmark(): void;
    getBookmark(): Bookmark | undefined;
    setBookmark(value?: Bookmark): GetBookmarkResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBookmarkResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetBookmarkResponse): GetBookmarkResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBookmarkResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBookmarkResponse;
    static deserializeBinaryFromReader(message: GetBookmarkResponse, reader: jspb.BinaryReader): GetBookmarkResponse;
}

export namespace GetBookmarkResponse {
    export type AsObject = {
        bookmark?: Bookmark.AsObject,
    }
}

export class GetBookmarkByArticleIDRequest extends jspb.Message { 
    getArticleId(): string;
    setArticleId(value: string): GetBookmarkByArticleIDRequest;
    getUserId(): string;
    setUserId(value: string): GetBookmarkByArticleIDRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBookmarkByArticleIDRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBookmarkByArticleIDRequest): GetBookmarkByArticleIDRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBookmarkByArticleIDRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBookmarkByArticleIDRequest;
    static deserializeBinaryFromReader(message: GetBookmarkByArticleIDRequest, reader: jspb.BinaryReader): GetBookmarkByArticleIDRequest;
}

export namespace GetBookmarkByArticleIDRequest {
    export type AsObject = {
        articleId: string,
        userId: string,
    }
}

export class CreateBookmarkResponse extends jspb.Message { 

    hasBookmark(): boolean;
    clearBookmark(): void;
    getBookmark(): Bookmark | undefined;
    setBookmark(value?: Bookmark): CreateBookmarkResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateBookmarkResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateBookmarkResponse): CreateBookmarkResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateBookmarkResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateBookmarkResponse;
    static deserializeBinaryFromReader(message: CreateBookmarkResponse, reader: jspb.BinaryReader): CreateBookmarkResponse;
}

export namespace CreateBookmarkResponse {
    export type AsObject = {
        bookmark?: Bookmark.AsObject,
    }
}

export class CreateBookmarkRequest extends jspb.Message { 
    getArticleId(): string;
    setArticleId(value: string): CreateBookmarkRequest;
    getUserId(): string;
    setUserId(value: string): CreateBookmarkRequest;

    hasPlatformId(): boolean;
    clearPlatformId(): void;
    getPlatformId(): google_protobuf_wrappers_pb.StringValue | undefined;
    setPlatformId(value?: google_protobuf_wrappers_pb.StringValue): CreateBookmarkRequest;
    getTitle(): string;
    setTitle(value: string): CreateBookmarkRequest;
    getDescription(): string;
    setDescription(value: string): CreateBookmarkRequest;
    getArticleUrl(): string;
    setArticleUrl(value: string): CreateBookmarkRequest;
    getThumbnailUrl(): string;
    setThumbnailUrl(value: string): CreateBookmarkRequest;

    hasPublishedAt(): boolean;
    clearPublishedAt(): void;
    getPublishedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setPublishedAt(value?: google_protobuf_timestamp_pb.Timestamp): CreateBookmarkRequest;
    getPlatformName(): string;
    setPlatformName(value: string): CreateBookmarkRequest;
    getPlatformUrl(): string;
    setPlatformUrl(value: string): CreateBookmarkRequest;
    getPlatformFaviconUrl(): string;
    setPlatformFaviconUrl(value: string): CreateBookmarkRequest;
    getIsEng(): boolean;
    setIsEng(value: boolean): CreateBookmarkRequest;
    getIsRead(): boolean;
    setIsRead(value: boolean): CreateBookmarkRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateBookmarkRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateBookmarkRequest): CreateBookmarkRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateBookmarkRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateBookmarkRequest;
    static deserializeBinaryFromReader(message: CreateBookmarkRequest, reader: jspb.BinaryReader): CreateBookmarkRequest;
}

export namespace CreateBookmarkRequest {
    export type AsObject = {
        articleId: string,
        userId: string,
        platformId?: google_protobuf_wrappers_pb.StringValue.AsObject,
        title: string,
        description: string,
        articleUrl: string,
        thumbnailUrl: string,
        publishedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        platformName: string,
        platformUrl: string,
        platformFaviconUrl: string,
        isEng: boolean,
        isRead: boolean,
    }
}

export class DeleteBookmarkRequest extends jspb.Message { 
    getBookmarkId(): string;
    setBookmarkId(value: string): DeleteBookmarkRequest;
    getUserId(): string;
    setUserId(value: string): DeleteBookmarkRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteBookmarkRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteBookmarkRequest): DeleteBookmarkRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteBookmarkRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteBookmarkRequest;
    static deserializeBinaryFromReader(message: DeleteBookmarkRequest, reader: jspb.BinaryReader): DeleteBookmarkRequest;
}

export namespace DeleteBookmarkRequest {
    export type AsObject = {
        bookmarkId: string,
        userId: string,
    }
}

export class Bookmark extends jspb.Message { 
    getId(): string;
    setId(value: string): Bookmark;
    getArticleId(): string;
    setArticleId(value: string): Bookmark;
    getUserId(): string;
    setUserId(value: string): Bookmark;

    hasPlatformId(): boolean;
    clearPlatformId(): void;
    getPlatformId(): google_protobuf_wrappers_pb.StringValue | undefined;
    setPlatformId(value?: google_protobuf_wrappers_pb.StringValue): Bookmark;
    getTitle(): string;
    setTitle(value: string): Bookmark;
    getDescription(): string;
    setDescription(value: string): Bookmark;
    getArticleUrl(): string;
    setArticleUrl(value: string): Bookmark;
    getThumbnailUrl(): string;
    setThumbnailUrl(value: string): Bookmark;

    hasPublishedAt(): boolean;
    clearPublishedAt(): void;
    getPublishedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setPublishedAt(value?: google_protobuf_timestamp_pb.Timestamp): Bookmark;
    getPlatformName(): string;
    setPlatformName(value: string): Bookmark;
    getPlatformUrl(): string;
    setPlatformUrl(value: string): Bookmark;
    getPlatformFaviconUrl(): string;
    setPlatformFaviconUrl(value: string): Bookmark;
    getIsEng(): boolean;
    setIsEng(value: boolean): Bookmark;
    getIsRead(): boolean;
    setIsRead(value: boolean): Bookmark;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Bookmark;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Bookmark;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Bookmark.AsObject;
    static toObject(includeInstance: boolean, msg: Bookmark): Bookmark.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Bookmark, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Bookmark;
    static deserializeBinaryFromReader(message: Bookmark, reader: jspb.BinaryReader): Bookmark;
}

export namespace Bookmark {
    export type AsObject = {
        id: string,
        articleId: string,
        userId: string,
        platformId?: google_protobuf_wrappers_pb.StringValue.AsObject,
        title: string,
        description: string,
        articleUrl: string,
        thumbnailUrl: string,
        publishedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        platformName: string,
        platformUrl: string,
        platformFaviconUrl: string,
        isEng: boolean,
        isRead: boolean,
        createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}
