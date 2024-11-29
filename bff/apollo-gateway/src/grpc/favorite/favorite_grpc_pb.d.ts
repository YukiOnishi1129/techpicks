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
    getFavoriteArticleFoldersByArticleId: IFavoriteServiceService_IGetFavoriteArticleFoldersByArticleId;
    getFavoriteArticleFolderById: IFavoriteServiceService_IGetFavoriteArticleFolderById;
    createFavoriteArticleFolder: IFavoriteServiceService_ICreateFavoriteArticleFolder;
    updateFavoriteArticleFolder: IFavoriteServiceService_IUpdateFavoriteArticleFolder;
    deleteFavoriteArticleFolder: IFavoriteServiceService_IDeleteFavoriteArticleFolder;
    getFavoriteArticles: IFavoriteServiceService_IGetFavoriteArticles;
    getFavoriteAllFolderArticles: IFavoriteServiceService_IGetFavoriteAllFolderArticles;
    createFavoriteArticle: IFavoriteServiceService_ICreateFavoriteArticle;
    createFavoriteArticleForUploadArticle: IFavoriteServiceService_ICreateFavoriteArticleForUploadArticle;
    deleteFavoriteArticle: IFavoriteServiceService_IDeleteFavoriteArticle;
    deleteFavoriteArticlesByArticleId: IFavoriteServiceService_IDeleteFavoriteArticlesByArticleId;
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
interface IFavoriteServiceService_IGetFavoriteArticleFoldersByArticleId extends grpc.MethodDefinition<favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest, favorite_favorite_pb.GetFavoriteArticleFoldersResponse> {
    path: "/checkpicks.favorite.v1.FavoriteService/GetFavoriteArticleFoldersByArticleId";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest>;
    responseSerialize: grpc.serialize<favorite_favorite_pb.GetFavoriteArticleFoldersResponse>;
    responseDeserialize: grpc.deserialize<favorite_favorite_pb.GetFavoriteArticleFoldersResponse>;
}
interface IFavoriteServiceService_IGetFavoriteArticleFolderById extends grpc.MethodDefinition<favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest, favorite_favorite_pb.GetFavoriteArticleFolderResponse> {
    path: "/checkpicks.favorite.v1.FavoriteService/GetFavoriteArticleFolderById";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest>;
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
interface IFavoriteServiceService_IGetFavoriteArticles extends grpc.MethodDefinition<favorite_favorite_pb.GetFavoriteArticlesRequest, favorite_favorite_pb.GetFavoriteArticlesResponse> {
    path: "/checkpicks.favorite.v1.FavoriteService/GetFavoriteArticles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.GetFavoriteArticlesRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.GetFavoriteArticlesRequest>;
    responseSerialize: grpc.serialize<favorite_favorite_pb.GetFavoriteArticlesResponse>;
    responseDeserialize: grpc.deserialize<favorite_favorite_pb.GetFavoriteArticlesResponse>;
}
interface IFavoriteServiceService_IGetFavoriteAllFolderArticles extends grpc.MethodDefinition<favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest, favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse> {
    path: "/checkpicks.favorite.v1.FavoriteService/GetFavoriteAllFolderArticles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest>;
    responseSerialize: grpc.serialize<favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse>;
    responseDeserialize: grpc.deserialize<favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse>;
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
interface IFavoriteServiceService_ICreateFavoriteArticleForUploadArticle extends grpc.MethodDefinition<favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest, favorite_favorite_pb.CreateFavoriteArticleResponse> {
    path: "/checkpicks.favorite.v1.FavoriteService/CreateFavoriteArticleForUploadArticle";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest>;
    responseSerialize: grpc.serialize<favorite_favorite_pb.CreateFavoriteArticleResponse>;
    responseDeserialize: grpc.deserialize<favorite_favorite_pb.CreateFavoriteArticleResponse>;
}
interface IFavoriteServiceService_IDeleteFavoriteArticle extends grpc.MethodDefinition<favorite_favorite_pb.DeleteFavoriteArticleRequest, google_protobuf_empty_pb.Empty> {
    path: "/checkpicks.favorite.v1.FavoriteService/DeleteFavoriteArticle";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.DeleteFavoriteArticleRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.DeleteFavoriteArticleRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IFavoriteServiceService_IDeleteFavoriteArticlesByArticleId extends grpc.MethodDefinition<favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest, google_protobuf_empty_pb.Empty> {
    path: "/checkpicks.favorite.v1.FavoriteService/DeleteFavoriteArticlesByArticleId";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest>;
    requestDeserialize: grpc.deserialize<favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const FavoriteServiceService: IFavoriteServiceService;

export interface IFavoriteServiceServer extends grpc.UntypedServiceImplementation {
    getFavoriteArticleFolders: grpc.handleUnaryCall<favorite_favorite_pb.GetFavoriteArticleFoldersRequest, favorite_favorite_pb.GetFavoriteArticleFoldersResponse>;
    getFavoriteArticleFoldersByArticleId: grpc.handleUnaryCall<favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest, favorite_favorite_pb.GetFavoriteArticleFoldersResponse>;
    getFavoriteArticleFolderById: grpc.handleUnaryCall<favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest, favorite_favorite_pb.GetFavoriteArticleFolderResponse>;
    createFavoriteArticleFolder: grpc.handleUnaryCall<favorite_favorite_pb.CreateFavoriteArticleFolderRequest, favorite_favorite_pb.CreateFavoriteArticleFolderResponse>;
    updateFavoriteArticleFolder: grpc.handleUnaryCall<favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, favorite_favorite_pb.UpdateFavoriteArticleFolderResponse>;
    deleteFavoriteArticleFolder: grpc.handleUnaryCall<favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, google_protobuf_empty_pb.Empty>;
    getFavoriteArticles: grpc.handleUnaryCall<favorite_favorite_pb.GetFavoriteArticlesRequest, favorite_favorite_pb.GetFavoriteArticlesResponse>;
    getFavoriteAllFolderArticles: grpc.handleUnaryCall<favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest, favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse>;
    createFavoriteArticle: grpc.handleUnaryCall<favorite_favorite_pb.CreateFavoriteArticleRequest, favorite_favorite_pb.CreateFavoriteArticleResponse>;
    createFavoriteArticleForUploadArticle: grpc.handleUnaryCall<favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest, favorite_favorite_pb.CreateFavoriteArticleResponse>;
    deleteFavoriteArticle: grpc.handleUnaryCall<favorite_favorite_pb.DeleteFavoriteArticleRequest, google_protobuf_empty_pb.Empty>;
    deleteFavoriteArticlesByArticleId: grpc.handleUnaryCall<favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest, google_protobuf_empty_pb.Empty>;
}

export interface IFavoriteServiceClient {
    getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFoldersByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFoldersByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFoldersByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolderById(request: favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolderById(request: favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticleFolderById(request: favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    getFavoriteArticles(request: favorite_favorite_pb.GetFavoriteArticlesRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticlesResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticles(request: favorite_favorite_pb.GetFavoriteArticlesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticlesResponse) => void): grpc.ClientUnaryCall;
    getFavoriteArticles(request: favorite_favorite_pb.GetFavoriteArticlesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticlesResponse) => void): grpc.ClientUnaryCall;
    getFavoriteAllFolderArticles(request: favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse) => void): grpc.ClientUnaryCall;
    getFavoriteAllFolderArticles(request: favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse) => void): grpc.ClientUnaryCall;
    getFavoriteAllFolderArticles(request: favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticleForUploadArticle(request: favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticleForUploadArticle(request: favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    createFavoriteArticleForUploadArticle(request: favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticle(request: favorite_favorite_pb.DeleteFavoriteArticleRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticle(request: favorite_favorite_pb.DeleteFavoriteArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticle(request: favorite_favorite_pb.DeleteFavoriteArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticlesByArticleId(request: favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticlesByArticleId(request: favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteFavoriteArticlesByArticleId(request: favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class FavoriteServiceClient extends grpc.Client implements IFavoriteServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolders(request: favorite_favorite_pb.GetFavoriteArticleFoldersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFoldersByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFoldersByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFoldersByArticleId(request: favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFoldersResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolderById(request: favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolderById(request: favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticleFolderById(request: favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticleFolder(request: favorite_favorite_pb.CreateFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public updateFavoriteArticleFolder(request: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticleFolder(request: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public getFavoriteArticles(request: favorite_favorite_pb.GetFavoriteArticlesRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticlesResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticles(request: favorite_favorite_pb.GetFavoriteArticlesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticlesResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteArticles(request: favorite_favorite_pb.GetFavoriteArticlesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteArticlesResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteAllFolderArticles(request: favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteAllFolderArticles(request: favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse) => void): grpc.ClientUnaryCall;
    public getFavoriteAllFolderArticles(request: favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticle(request: favorite_favorite_pb.CreateFavoriteArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticleForUploadArticle(request: favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticleForUploadArticle(request: favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    public createFavoriteArticleForUploadArticle(request: favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: favorite_favorite_pb.CreateFavoriteArticleResponse) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticle(request: favorite_favorite_pb.DeleteFavoriteArticleRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticle(request: favorite_favorite_pb.DeleteFavoriteArticleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticle(request: favorite_favorite_pb.DeleteFavoriteArticleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticlesByArticleId(request: favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticlesByArticleId(request: favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteFavoriteArticlesByArticleId(request: favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
