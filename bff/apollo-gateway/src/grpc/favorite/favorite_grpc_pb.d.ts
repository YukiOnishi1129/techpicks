// package: checkpicks.favorite.v1
// file: favorite/favorite.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as favorite_favorite_pb from "../favorite/favorite_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

interface IFavoriteServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getFavoriteArticleFolders: IFavoriteServiceService_IGetFavoriteArticleFolders;
    getFavoriteArticleFolderByArticleId: IFavoriteServiceService_IGetFavoriteArticleFolderByArticleId;
    createFavoriteArticleFolder: IFavoriteServiceService_ICreateFavoriteArticleFolder;
    updateFavoriteArticleFolder: IFavoriteServiceService_IUpdateFavoriteArticleFolder;
    deleteFavoriteArticleFolder: IFavoriteServiceService_IDeleteFavoriteArticleFolder;
    createFavoriteArticle: IFavoriteServiceService_ICreateFavoriteArticle;
}

interface IFavoriteServiceService_IGetFavoriteArticleFolders extends grpc.MethodDefinition<favorite_favorite_pb.GetFavoriteArticleFoldersRequest, favorite_favorite_pb.GetFavoriteArticleFoldersResponse> {
    path: "/checkpicks.favorite.v1.FavoriteService/GetFavoriteArticleFolders";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.GetFavoriteArticleFoldersRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.GetFavoriteArticleFoldersRequest>;
    responseSerialize: grpc.serialize<favorite_favorite_pb.GetFavoriteArticleFoldersResponse>;
    responseDeserialize: grpc.deserialize<favorite_favorite_pb.GetFavoriteArticleFoldersResponse>;
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
interface IFavoriteServiceService_ICreateFavoriteArticleFolder extends grpc.MethodDefinition<favorite_favorite_pb.CreateFavoriteArticleFolderRequest, favorite_favorite_pb.CreateFavoriteArticleFolderResponse> {
    path: "/checkpicks.favorite.v1.FavoriteService/CreateFavoriteArticleFolder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.CreateFavoriteArticleFolderRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.CreateFavoriteArticleFolderRequest>;
    responseSerialize: grpc.serialize<favorite_favorite_pb.CreateFavoriteArticleFolderResponse>;
    responseDeserialize: grpc.deserialize<favorite_favorite_pb.CreateFavoriteArticleFolderResponse>;
}
interface IFavoriteServiceService_IUpdateFavoriteArticleFolder extends grpc.MethodDefinition<favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, favorite_favorite_pb.UpdateFavoriteArticleFolderResponse> {
    path: "/checkpicks.favorite.v1.FavoriteService/UpdateFavoriteArticleFolder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.UpdateFavoriteArticleFolderRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.UpdateFavoriteArticleFolderRequest>;
    responseSerialize: grpc.serialize<favorite_favorite_pb.UpdateFavoriteArticleFolderResponse>;
    responseDeserialize: grpc.deserialize<favorite_favorite_pb.UpdateFavoriteArticleFolderResponse>;
}
interface IFavoriteServiceService_IDeleteFavoriteArticleFolder extends grpc.MethodDefinition<favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, google_protobuf_empty_pb.Empty> {
    path: "/checkpicks.favorite.v1.FavoriteService/DeleteFavoriteArticleFolder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.DeleteFavoriteArticleFolderRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.DeleteFavoriteArticleFolderRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IFavoriteServiceService_ICreateFavoriteArticle extends grpc.MethodDefinition<favorite_favorite_pb.CreateFavoriteArticleRequest, favorite_favorite_pb.CreateFavoriteArticleResponse> {
    path: "/checkpicks.favorite.v1.FavoriteService/CreateFavoriteArticle";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.CreateFavoriteArticleRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.CreateFavoriteArticleRequest>;
    responseSerialize: grpc.serialize<favorite_favorite_pb.CreateFavoriteArticleResponse>;
    responseDeserialize: grpc.deserialize<favorite_favorite_pb.CreateFavoriteArticleResponse>;
}

export const FavoriteServiceService: IFavoriteServiceService;

export interface IFavoriteServiceServer extends grpc.UntypedServiceImplementation {
    getFavoriteArticleFolders: grpc.handleUnaryCall<favorite_favorite_pb.GetFavoriteArticleFoldersRequest, favorite_favorite_pb.GetFavoriteArticleFoldersResponse>;
    getFavoriteArticleFolderByArticleId: grpc.handleUnaryCall<favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, favorite_favorite_pb.GetFavoriteArticleFolderResponse>;
    createFavoriteArticleFolder: grpc.handleUnaryCall<favorite_favorite_pb.CreateFavoriteArticleFolderRequest, favorite_favorite_pb.CreateFavoriteArticleFolderResponse>;
    updateFavoriteArticleFolder: grpc.handleUnaryCall<favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, favorite_favorite_pb.UpdateFavoriteArticleFolderResponse>;
    deleteFavoriteArticleFolder: grpc.handleUnaryCall<favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, google_protobuf_empty_pb.Empty>;
    createFavoriteArticle: grpc.handleUnaryCall<favorite_favorite_pb.CreateFavoriteArticleRequest, favorite_favorite_pb.CreateFavoriteArticleResponse>;
}

export interface IFavoriteServiceClient {
    getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
}

export class FavoriteServiceClient extends grpc.Client implements IFavoriteServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolderByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
}
