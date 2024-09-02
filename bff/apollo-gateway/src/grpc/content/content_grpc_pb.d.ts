// package: checkpicks.content.v1
// file: content/content.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as content_content_pb from "../content/content_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

interface IArticleServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getArticles: IArticleServiceService_IGetArticles;
}

interface IArticleServiceService_IGetArticles extends grpc.MethodDefinition<content_content_pb.GetArticlesRequest, content_content_pb.GetArticlesResponse> {
    path: "/checkpicks.content.v1.ArticleService/GetArticles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<content_content_pb.GetArticlesRequest>;
    requestDeserialize: grpc.deserialize<content_content_pb.GetArticlesRequest>;
    responseSerialize: grpc.serialize<content_content_pb.GetArticlesResponse>;
    responseDeserialize: grpc.deserialize<content_content_pb.GetArticlesResponse>;
}

export const ArticleServiceService: IArticleServiceService;

export interface IArticleServiceServer extends grpc.UntypedServiceImplementation {
    getArticles: grpc.handleUnaryCall<content_content_pb.GetArticlesRequest, content_content_pb.GetArticlesResponse>;
}

export interface IArticleServiceClient {
    getArticles(request: content_content_pb.GetArticlesRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
    getArticles(request: content_content_pb.GetArticlesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
    getArticles(request: content_content_pb.GetArticlesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
}

export class ArticleServiceClient extends grpc.Client implements IArticleServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getArticles(request: content_content_pb.GetArticlesRequest, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
    public getArticles(request: content_content_pb.GetArticlesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
    public getArticles(request: content_content_pb.GetArticlesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: content_content_pb.GetArticlesResponse) => void): grpc.ClientUnaryCall;
}
