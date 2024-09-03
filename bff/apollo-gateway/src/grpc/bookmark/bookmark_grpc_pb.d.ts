// package: checkpicks.bookmark.v1
// file: bookmark/bookmark.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as bookmark_bookmark_pb from "../bookmark/bookmark_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

interface IBookmarkServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getBookmarkByArticleId: IBookmarkServiceService_IGetBookmarkByArticleId;
}

interface IBookmarkServiceService_IGetBookmarkByArticleId extends grpc.MethodDefinition<bookmark_bookmark_pb.GetBookmarkByArticleIdRequest, bookmark_bookmark_pb.GetBookmarkResponse> {
    path: "/checkpicks.bookmark.v1.BookmarkService/GetBookmarkByArticleId";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bookmark_bookmark_pb.GetBookmarkByArticleIdRequest>;
    requestDeserialize: grpc.deserialize<bookmark_bookmark_pb.GetBookmarkByArticleIdRequest>;
    responseSerialize: grpc.serialize<bookmark_bookmark_pb.GetBookmarkResponse>;
    responseDeserialize: grpc.deserialize<bookmark_bookmark_pb.GetBookmarkResponse>;
}

export const BookmarkServiceService: IBookmarkServiceService;

export interface IBookmarkServiceServer extends grpc.UntypedServiceImplementation {
    getBookmarkByArticleId: grpc.handleUnaryCall<bookmark_bookmark_pb.GetBookmarkByArticleIdRequest, bookmark_bookmark_pb.GetBookmarkResponse>;
}

export interface IBookmarkServiceClient {
    getBookmarkByArticleId(request: bookmark_bookmark_pb.GetBookmarkByArticleIdRequest, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
    getBookmarkByArticleId(request: bookmark_bookmark_pb.GetBookmarkByArticleIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
    getBookmarkByArticleId(request: bookmark_bookmark_pb.GetBookmarkByArticleIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
}

export class BookmarkServiceClient extends grpc.Client implements IBookmarkServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getBookmarkByArticleId(request: bookmark_bookmark_pb.GetBookmarkByArticleIdRequest, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
    public getBookmarkByArticleId(request: bookmark_bookmark_pb.GetBookmarkByArticleIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
    public getBookmarkByArticleId(request: bookmark_bookmark_pb.GetBookmarkByArticleIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
}
