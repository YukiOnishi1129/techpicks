// package: checkpicks.bookmark.v1
// file: bookmark/bookmark.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as bookmark_bookmark_pb from "../bookmark/bookmark_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

interface IBookmarkServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getBookmarks: IBookmarkServiceService_IGetBookmarks;
    getBookmarkByArticleID: IBookmarkServiceService_IGetBookmarkByArticleID;
    createBookmark: IBookmarkServiceService_ICreateBookmark;
    createBookmarkForUploadArticle: IBookmarkServiceService_ICreateBookmarkForUploadArticle;
    deleteBookmark: IBookmarkServiceService_IDeleteBookmark;
}

interface IBookmarkServiceService_IGetBookmarks extends grpc.MethodDefinition<bookmark_bookmark_pb.GetBookmarksRequest, bookmark_bookmark_pb.GetBookmarksResponse> {
    path: "/checkpicks.bookmark.v1.BookmarkService/GetBookmarks";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bookmark_bookmark_pb.GetBookmarksRequest>;
    requestDeserialize: grpc.deserialize<bookmark_bookmark_pb.GetBookmarksRequest>;
    responseSerialize: grpc.serialize<bookmark_bookmark_pb.GetBookmarksResponse>;
    responseDeserialize: grpc.deserialize<bookmark_bookmark_pb.GetBookmarksResponse>;
}
interface IBookmarkServiceService_IGetBookmarkByArticleID extends grpc.MethodDefinition<bookmark_bookmark_pb.GetBookmarkByArticleIDRequest, bookmark_bookmark_pb.GetBookmarkResponse> {
    path: "/checkpicks.bookmark.v1.BookmarkService/GetBookmarkByArticleID";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bookmark_bookmark_pb.GetBookmarkByArticleIDRequest>;
    requestDeserialize: grpc.deserialize<bookmark_bookmark_pb.GetBookmarkByArticleIDRequest>;
    responseSerialize: grpc.serialize<bookmark_bookmark_pb.GetBookmarkResponse>;
    responseDeserialize: grpc.deserialize<bookmark_bookmark_pb.GetBookmarkResponse>;
}
interface IBookmarkServiceService_ICreateBookmark extends grpc.MethodDefinition<bookmark_bookmark_pb.CreateBookmarkRequest, bookmark_bookmark_pb.CreateBookmarkResponse> {
    path: "/checkpicks.bookmark.v1.BookmarkService/CreateBookmark";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bookmark_bookmark_pb.CreateBookmarkRequest>;
    requestDeserialize: grpc.deserialize<bookmark_bookmark_pb.CreateBookmarkRequest>;
    responseSerialize: grpc.serialize<bookmark_bookmark_pb.CreateBookmarkResponse>;
    responseDeserialize: grpc.deserialize<bookmark_bookmark_pb.CreateBookmarkResponse>;
}
interface IBookmarkServiceService_ICreateBookmarkForUploadArticle extends grpc.MethodDefinition<bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest, bookmark_bookmark_pb.CreateBookmarkResponse> {
    path: "/checkpicks.bookmark.v1.BookmarkService/CreateBookmarkForUploadArticle";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest>;
    requestDeserialize: grpc.deserialize<bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest>;
    responseSerialize: grpc.serialize<bookmark_bookmark_pb.CreateBookmarkResponse>;
    responseDeserialize: grpc.deserialize<bookmark_bookmark_pb.CreateBookmarkResponse>;
}
interface IBookmarkServiceService_IDeleteBookmark extends grpc.MethodDefinition<bookmark_bookmark_pb.DeleteBookmarkRequest, google_protobuf_empty_pb.Empty> {
    path: "/checkpicks.bookmark.v1.BookmarkService/DeleteBookmark";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bookmark_bookmark_pb.DeleteBookmarkRequest>;
    requestDeserialize: grpc.deserialize<bookmark_bookmark_pb.DeleteBookmarkRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const BookmarkServiceService: IBookmarkServiceService;

export interface IBookmarkServiceServer extends grpc.UntypedServiceImplementation {
    getBookmarks: grpc.handleUnaryCall<bookmark_bookmark_pb.GetBookmarksRequest, bookmark_bookmark_pb.GetBookmarksResponse>;
    getBookmarkByArticleID: grpc.handleUnaryCall<bookmark_bookmark_pb.GetBookmarkByArticleIDRequest, bookmark_bookmark_pb.GetBookmarkResponse>;
    createBookmark: grpc.handleUnaryCall<bookmark_bookmark_pb.CreateBookmarkRequest, bookmark_bookmark_pb.CreateBookmarkResponse>;
    createBookmarkForUploadArticle: grpc.handleUnaryCall<bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest, bookmark_bookmark_pb.CreateBookmarkResponse>;
    deleteBookmark: grpc.handleUnaryCall<bookmark_bookmark_pb.DeleteBookmarkRequest, google_protobuf_empty_pb.Empty>;
}

export interface IBookmarkServiceClient {
    getBookmarks(request: bookmark_bookmark_pb.GetBookmarksRequest, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarksResponse) => void): grpc.ClientUnaryCall;
    getBookmarks(request: bookmark_bookmark_pb.GetBookmarksRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarksResponse) => void): grpc.ClientUnaryCall;
    getBookmarks(request: bookmark_bookmark_pb.GetBookmarksRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarksResponse) => void): grpc.ClientUnaryCall;
    getBookmarkByArticleID(request: bookmark_bookmark_pb.GetBookmarkByArticleIDRequest, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
    getBookmarkByArticleID(request: bookmark_bookmark_pb.GetBookmarkByArticleIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
    getBookmarkByArticleID(request: bookmark_bookmark_pb.GetBookmarkByArticleIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
    createBookmark(request: bookmark_bookmark_pb.CreateBookmarkRequest, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    createBookmark(request: bookmark_bookmark_pb.CreateBookmarkRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    createBookmark(request: bookmark_bookmark_pb.CreateBookmarkRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    createBookmarkForUploadArticle(request: bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    createBookmarkForUploadArticle(request: bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    createBookmarkForUploadArticle(request: bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    deleteBookmark(request: bookmark_bookmark_pb.DeleteBookmarkRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteBookmark(request: bookmark_bookmark_pb.DeleteBookmarkRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteBookmark(request: bookmark_bookmark_pb.DeleteBookmarkRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class BookmarkServiceClient extends grpc.Client implements IBookmarkServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getBookmarks(request: bookmark_bookmark_pb.GetBookmarksRequest, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarksResponse) => void): grpc.ClientUnaryCall;
    public getBookmarks(request: bookmark_bookmark_pb.GetBookmarksRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarksResponse) => void): grpc.ClientUnaryCall;
    public getBookmarks(request: bookmark_bookmark_pb.GetBookmarksRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarksResponse) => void): grpc.ClientUnaryCall;
    public getBookmarkByArticleID(request: bookmark_bookmark_pb.GetBookmarkByArticleIDRequest, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
    public getBookmarkByArticleID(request: bookmark_bookmark_pb.GetBookmarkByArticleIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
    public getBookmarkByArticleID(request: bookmark_bookmark_pb.GetBookmarkByArticleIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.GetBookmarkResponse) => void): grpc.ClientUnaryCall;
    public createBookmark(request: bookmark_bookmark_pb.CreateBookmarkRequest, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    public createBookmark(request: bookmark_bookmark_pb.CreateBookmarkRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    public createBookmark(request: bookmark_bookmark_pb.CreateBookmarkRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    public createBookmarkForUploadArticle(request: bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    public createBookmarkForUploadArticle(request: bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    public createBookmarkForUploadArticle(request: bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bookmark_bookmark_pb.CreateBookmarkResponse) => void): grpc.ClientUnaryCall;
    public deleteBookmark(request: bookmark_bookmark_pb.DeleteBookmarkRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteBookmark(request: bookmark_bookmark_pb.DeleteBookmarkRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteBookmark(request: bookmark_bookmark_pb.DeleteBookmarkRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
