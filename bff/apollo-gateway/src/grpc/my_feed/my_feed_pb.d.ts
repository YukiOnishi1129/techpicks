// package: checkpicks.my_feed.v1
// file: my_feed/my_feed.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as content_content_pb from "../content/content_pb";

export class GetMyFeedFoldersResponse extends jspb.Message { 
    clearMyFeedFolderEdgesList(): void;
    getMyFeedFolderEdgesList(): Array<MyFeedFolderEdge>;
    setMyFeedFolderEdgesList(value: Array<MyFeedFolderEdge>): GetMyFeedFoldersResponse;
    addMyFeedFolderEdges(value?: MyFeedFolderEdge, index?: number): MyFeedFolderEdge;

    hasPageInfo(): boolean;
    clearPageInfo(): void;
    getPageInfo(): content_content_pb.PageInfo | undefined;
    setPageInfo(value?: content_content_pb.PageInfo): GetMyFeedFoldersResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMyFeedFoldersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMyFeedFoldersResponse): GetMyFeedFoldersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMyFeedFoldersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMyFeedFoldersResponse;
    static deserializeBinaryFromReader(message: GetMyFeedFoldersResponse, reader: jspb.BinaryReader): GetMyFeedFoldersResponse;
}

export namespace GetMyFeedFoldersResponse {
    export type AsObject = {
        myFeedFolderEdgesList: Array<MyFeedFolderEdge.AsObject>,
        pageInfo?: content_content_pb.PageInfo.AsObject,
    }
}

export class GetMyFeedFoldersRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): GetMyFeedFoldersRequest;

    hasKeyword(): boolean;
    clearKeyword(): void;
    getKeyword(): google_protobuf_wrappers_pb.StringValue | undefined;
    setKeyword(value?: google_protobuf_wrappers_pb.StringValue): GetMyFeedFoldersRequest;
    getCursor(): string;
    setCursor(value: string): GetMyFeedFoldersRequest;
    getLimit(): number;
    setLimit(value: number): GetMyFeedFoldersRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMyFeedFoldersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMyFeedFoldersRequest): GetMyFeedFoldersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMyFeedFoldersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMyFeedFoldersRequest;
    static deserializeBinaryFromReader(message: GetMyFeedFoldersRequest, reader: jspb.BinaryReader): GetMyFeedFoldersRequest;
}

export namespace GetMyFeedFoldersRequest {
    export type AsObject = {
        userId: string,
        keyword?: google_protobuf_wrappers_pb.StringValue.AsObject,
        cursor: string,
        limit: number,
    }
}

export class MyFeedFolderEdge extends jspb.Message { 

    hasNode(): boolean;
    clearNode(): void;
    getNode(): MyFeedFolder | undefined;
    setNode(value?: MyFeedFolder): MyFeedFolderEdge;
    getCursor(): string;
    setCursor(value: string): MyFeedFolderEdge;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MyFeedFolderEdge.AsObject;
    static toObject(includeInstance: boolean, msg: MyFeedFolderEdge): MyFeedFolderEdge.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MyFeedFolderEdge, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MyFeedFolderEdge;
    static deserializeBinaryFromReader(message: MyFeedFolderEdge, reader: jspb.BinaryReader): MyFeedFolderEdge;
}

export namespace MyFeedFolderEdge {
    export type AsObject = {
        node?: MyFeedFolder.AsObject,
        cursor: string,
    }
}

export class MyFeedFolder extends jspb.Message { 
    getId(): string;
    setId(value: string): MyFeedFolder;
    getUserId(): string;
    setUserId(value: string): MyFeedFolder;
    getTitle(): string;
    setTitle(value: string): MyFeedFolder;
    clearFeedsList(): void;
    getFeedsList(): Array<content_content_pb.Feed>;
    setFeedsList(value: Array<content_content_pb.Feed>): MyFeedFolder;
    addFeeds(value?: content_content_pb.Feed, index?: number): content_content_pb.Feed;

    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): google_protobuf_wrappers_pb.StringValue | undefined;
    setDescription(value?: google_protobuf_wrappers_pb.StringValue): MyFeedFolder;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): MyFeedFolder;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): MyFeedFolder;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MyFeedFolder.AsObject;
    static toObject(includeInstance: boolean, msg: MyFeedFolder): MyFeedFolder.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MyFeedFolder, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MyFeedFolder;
    static deserializeBinaryFromReader(message: MyFeedFolder, reader: jspb.BinaryReader): MyFeedFolder;
}

export namespace MyFeedFolder {
    export type AsObject = {
        id: string,
        userId: string,
        title: string,
        feedsList: Array<content_content_pb.Feed.AsObject>,
        description?: google_protobuf_wrappers_pb.StringValue.AsObject,
        createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}
