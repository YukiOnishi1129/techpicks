// package: checkpicks.content.v1
// file: content/content.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as content_content_pb from "../content/content_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

interface IContentServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getArticles: IContentServiceService_IGetArticles;
    createUploadArticle: IContentServiceService_ICreateUploadArticle;
    getArticleOGP: IContentServiceService_IGetArticleOGP;
    getFeeds: IContentServiceService_IGetFeeds;
    getFeed: IContentServiceService_IGetFeed;
}

interface IContentServiceService_IGetArticles extends grpc.MethodDefinition<content_content_pb.GetArticlesRequest, content_content_pb.GetArticlesResponse> {
    path: "/checkpicks.content.v1.ContentService/GetArticles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<content_content_pb.GetArticlesRequest>;
    requestDeserialize: grpc.deserialize<content_content_pb.GetArticlesRequest>;
    responseSerialize: grpc.serialize<content_content_pb.GetArticlesResponse>;
    responseDeserialize: grpc.deserialize<content_content_pb.GetArticlesResponse>;
}
interface IContentServiceService_ICreateUploadArticle extends grpc.MethodDefinition<content_content_pb.CreateUploadArticleRequest, content_content_pb.CreateArticleResponse> {
    path: "/checkpicks.content.v1.ContentService/CreateUploadArticle";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<content_content_pb.CreateUploadArticleRequest>;
    requestDeserialize: grpc.deserialize<content_content_pb.CreateUploadArticleRequest>;
    responseSerialize: grpc.serialize<content_content_pb.CreateArticleResponse>;
    responseDeserialize: grpc.deserialize<content_content_pb.CreateArticleResponse>;
}
interface IContentServiceService_IGetArticleOGP extends grpc.MethodDefinition<content_content_pb.GetArticleOGPRequest, content_content_pb.GetArticleOGPResponse> {
    path: "/checkpicks.content.v1.ContentService/GetArticleOGP";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<content_content_pb.GetArticleOGPRequest>;
    requestDeserialize: grpc.deserialize<content_content_pb.GetArticleOGPRequest>;
    responseSerialize: grpc.serialize<content_content_pb.GetArticleOGPResponse>;
    responseDeserialize: grpc.deserialize<content_content_pb.GetArticleOGPResponse>;
}
interface IContentServiceService_IGetFeeds extends grpc.MethodDefinition<content_content_pb.GetFeedsRequest, content_content_pb.GetFeedsResponse> {
    path: "/checkpicks.content.v1.ContentService/GetFeeds";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<content_content_pb.GetFeedsRequest>;
    requestDeserialize: grpc.deserialize<content_content_pb.GetFeedsRequest>;
    responseSerialize: grpc.serialize<content_content_pb.GetFeedsResponse>;
    responseDeserialize: grpc.deserialize<content_content_pb.GetFeedsResponse>;
}
interface IContentServiceService_IGetFeed extends grpc.MethodDefinition<content_content_pb.GetFeedRequest, content_content_pb.GetFeedResponse> {
    path: "/checkpicks.content.v1.ContentService/GetFeed";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<content_content_pb.GetFeedRequest>;
    requestDeserialize: grpc.deserialize<content_content_pb.GetFeedRequest>;
    responseSerialize: grpc.serialize<content_content_pb.GetFeedResponse>;
    responseDeserialize: grpc.deserialize<content_content_pb.GetFeedResponse>;
}

export const ContentServiceService: IContentServiceService;

export interface IContentServiceServer extends grpc.UntypedServiceImplementation {
    getArticles: grpc.handleUnaryCall<content_content_pb.GetArticlesRequest, content_content_pb.GetArticlesResponse>;
    createUploadArticle: grpc.handleUnaryCall<content_content_pb.CreateUploadArticleRequest, content_content_pb.CreateArticleResponse>;
    getArticleOGP: grpc.handleUnaryCall<content_content_pb.GetArticleOGPRequest, content_content_pb.GetArticleOGPResponse>;
    getFeeds: grpc.handleUnaryCall<content_content_pb.GetFeedsRequest, content_content_pb.GetFeedsResponse>;
    getFeed: grpc.handleUnaryCall<content_content_pb.GetFeedRequest, content_content_pb.GetFeedResponse>;
}

export interface IContentServiceClient {
    getArticles(request: content_content_pb.GetArticlesRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
    getArticles(request: content_content_pb.GetArticlesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
    getArticles(request: content_content_pb.GetArticlesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
    createUploadArticle(request: content_content_pb.CreateUploadArticleRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.CreateArticleResponse) => void): grpc.ClientUnaryCall;
    createUploadArticle(request: content_content_pb.CreateUploadArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.CreateArticleResponse) => void): grpc.ClientUnaryCall;
    createUploadArticle(request: content_content_pb.CreateUploadArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.CreateArticleResponse) => void): grpc.ClientUnaryCall;
    getArticleOGP(request: content_content_pb.GetArticleOGPRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticleOGPResponse) => void): grpc.ClientUnaryCall;
    getArticleOGP(request: content_content_pb.GetArticleOGPRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticleOGPResponse) => void): grpc.ClientUnaryCall;
    getArticleOGP(request: content_content_pb.GetArticleOGPRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticleOGPResponse) => void): grpc.ClientUnaryCall;
    getFeeds(request: content_content_pb.GetFeedsRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedsResponse) => void): grpc.ClientUnaryCall;
    getFeeds(request: content_content_pb.GetFeedsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedsResponse) => void): grpc.ClientUnaryCall;
    getFeeds(request: content_content_pb.GetFeedsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedsResponse) => void): grpc.ClientUnaryCall;
    getFeed(request: content_content_pb.GetFeedRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedResponse) => void): grpc.ClientUnaryCall;
    getFeed(request: content_content_pb.GetFeedRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedResponse) => void): grpc.ClientUnaryCall;
    getFeed(request: content_content_pb.GetFeedRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedResponse) => void): grpc.ClientUnaryCall;
}

export class ContentServiceClient extends grpc.Client implements IContentServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getArticles(request: content_content_pb.GetArticlesRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
    public getArticles(request: content_content_pb.GetArticlesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
    public getArticles(request: content_content_pb.GetArticlesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
    public createUploadArticle(request: content_content_pb.CreateUploadArticleRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.CreateArticleResponse) => void): grpc.ClientUnaryCall;
    public createUploadArticle(request: content_content_pb.CreateUploadArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.CreateArticleResponse) => void): grpc.ClientUnaryCall;
    public createUploadArticle(request: content_content_pb.CreateUploadArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.CreateArticleResponse) => void): grpc.ClientUnaryCall;
    public getArticleOGP(request: content_content_pb.GetArticleOGPRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticleOGPResponse) => void): grpc.ClientUnaryCall;
    public getArticleOGP(request: content_content_pb.GetArticleOGPRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticleOGPResponse) => void): grpc.ClientUnaryCall;
    public getArticleOGP(request: content_content_pb.GetArticleOGPRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticleOGPResponse) => void): grpc.ClientUnaryCall;
    public getFeeds(request: content_content_pb.GetFeedsRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedsResponse) => void): grpc.ClientUnaryCall;
    public getFeeds(request: content_content_pb.GetFeedsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedsResponse) => void): grpc.ClientUnaryCall;
    public getFeeds(request: content_content_pb.GetFeedsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedsResponse) => void): grpc.ClientUnaryCall;
    public getFeed(request: content_content_pb.GetFeedRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedResponse) => void): grpc.ClientUnaryCall;
    public getFeed(request: content_content_pb.GetFeedRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedResponse) => void): grpc.ClientUnaryCall;
    public getFeed(request: content_content_pb.GetFeedRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetFeedResponse) => void): grpc.ClientUnaryCall;
}
