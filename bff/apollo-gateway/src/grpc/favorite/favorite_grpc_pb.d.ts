// package: checkpicks.favorite.v1
// file: favorite/favorite.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as favorite_favorite_pb from "../favorite/favorite_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

interface IFavoriteServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getFavoriteArticleFolderByArticleId: IFavoriteServiceService_IGetFavoriteArticleFolderByArticleId;
}

interface IFavoriteServiceService_IGetFavoriteArticleFolderByArticleId extends grpc.MethodDefinition<favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, favorite_favorite_pb.GetFavoriteArticleFolderResponse> {
    path: "/checkpicks.favorite.v1.FavoriteService/GetFavoriteArticleFolderByArticleId";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest>;
    responseSerialize: grpc.serialize<favorite_favorite_pb.GetFavoriteArticleFolderResponse>;
    responseDeserialize: grpc.deserialize<favorite_favorite_pb.GetFavoriteArticleFolderResponse>;
}

export const FavoriteServiceService: IFavoriteServiceService;

export interface IFavoriteServiceServer extends grpc.UntypedServiceImplementation {
    getFavoriteArticleFolderByArticleId: grpc.handleUnaryCall<favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, favorite_favorite_pb.GetFavoriteArticleFolderResponse>;
}

export interface IFavoriteServiceClient {
    getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
}

export class FavoriteServiceClient extends grpc.Client implements IFavoriteServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
}
