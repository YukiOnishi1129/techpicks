// package: checkpicks.my_feed.v1
// file: my_feed/my_feed.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as my_feed_my_feed_pb from "../my_feed/my_feed_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

interface IMyFeedServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getMyFeedFolders: IMyFeedServiceService_IGetMyFeedFolders;
}

interface IMyFeedServiceService_IGetMyFeedFolders extends grpc.MethodDefinition<my_feed_my_feed_pb.GetMyFeedFoldersRequest, my_feed_my_feed_pb.GetMyFeedFoldersResponse> {
    path: "/checkpicks.my_feed.v1.MyFeedService/GetMyFeedFolders";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<my_feed_my_feed_pb.GetMyFeedFoldersRequest>;
    requestDeserialize: grpc.deserialize<my_feed_my_feed_pb.GetMyFeedFoldersRequest>;
    responseSerialize: grpc.serialize<my_feed_my_feed_pb.GetMyFeedFoldersResponse>;
    responseDeserialize: grpc.deserialize<my_feed_my_feed_pb.GetMyFeedFoldersResponse>;
}

export const MyFeedServiceService: IMyFeedServiceService;

export interface IMyFeedServiceServer extends grpc.UntypedServiceImplementation {
    getMyFeedFolders: grpc.handleUnaryCall<my_feed_my_feed_pb.GetMyFeedFoldersRequest, my_feed_my_feed_pb.GetMyFeedFoldersResponse>;
}

export interface IMyFeedServiceClient {
    getMyFeedFolders(request: my_feed_my_feed_pb.GetMyFeedFoldersRequest, callback: (error: grpc.ServiceError | null, response: my_feed_my_feed_pb.GetMyFeedFoldersResponse) => void): grpc.ClientUnaryCall;
    getMyFeedFolders(request: my_feed_my_feed_pb.GetMyFeedFoldersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: my_feed_my_feed_pb.GetMyFeedFoldersResponse) => void): grpc.ClientUnaryCall;
    getMyFeedFolders(request: my_feed_my_feed_pb.GetMyFeedFoldersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: my_feed_my_feed_pb.GetMyFeedFoldersResponse) => void): grpc.ClientUnaryCall;
}

export class MyFeedServiceClient extends grpc.Client implements IMyFeedServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getMyFeedFolders(request: my_feed_my_feed_pb.GetMyFeedFoldersRequest, callback: (error: grpc.ServiceError | null, response: my_feed_my_feed_pb.GetMyFeedFoldersResponse) => void): grpc.ClientUnaryCall;
    public getMyFeedFolders(request: my_feed_my_feed_pb.GetMyFeedFoldersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: my_feed_my_feed_pb.GetMyFeedFoldersResponse) => void): grpc.ClientUnaryCall;
    public getMyFeedFolders(request: my_feed_my_feed_pb.GetMyFeedFoldersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: my_feed_my_feed_pb.GetMyFeedFoldersResponse) => void): grpc.ClientUnaryCall;
}
