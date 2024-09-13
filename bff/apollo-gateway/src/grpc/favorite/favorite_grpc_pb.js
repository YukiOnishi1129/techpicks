// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var favorite_favorite_pb = require('../favorite/favorite_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

function serialize_checkpicks_favorite_v1_CreateFavoriteArticleFolderRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.CreateFavoriteArticleFolderRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.CreateFavoriteArticleFolderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_CreateFavoriteArticleFolderRequest(buffer_arg) {
  return favorite_favorite_pb.CreateFavoriteArticleFolderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_CreateFavoriteArticleFolderResponse(arg) {
  if (!(arg instanceof favorite_favorite_pb.CreateFavoriteArticleFolderResponse)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.CreateFavoriteArticleFolderResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_CreateFavoriteArticleFolderResponse(buffer_arg) {
  return favorite_favorite_pb.CreateFavoriteArticleFolderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_GetFavoriteArticleFolderByArticleIdRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.GetFavoriteArticleFolderByArticleIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_GetFavoriteArticleFolderByArticleIdRequest(buffer_arg) {
  return favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_GetFavoriteArticleFolderResponse(arg) {
  if (!(arg instanceof favorite_favorite_pb.GetFavoriteArticleFolderResponse)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.GetFavoriteArticleFolderResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_GetFavoriteArticleFolderResponse(buffer_arg) {
  return favorite_favorite_pb.GetFavoriteArticleFolderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var FavoriteServiceService = exports.FavoriteServiceService = {
  getFavoriteArticleFolderByArticleId: {
    path: '/checkpicks.favorite.v1.FavoriteService/GetFavoriteArticleFolderByArticleId',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.GetFavoriteArticleFolderByArticleIdRequest,
    responseType: favorite_favorite_pb.GetFavoriteArticleFolderResponse,
    requestSerialize: serialize_checkpicks_favorite_v1_GetFavoriteArticleFolderByArticleIdRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_GetFavoriteArticleFolderByArticleIdRequest,
    responseSerialize: serialize_checkpicks_favorite_v1_GetFavoriteArticleFolderResponse,
    responseDeserialize: deserialize_checkpicks_favorite_v1_GetFavoriteArticleFolderResponse,
  },
  createFavoriteArticleFolder: {
    path: '/checkpicks.favorite.v1.FavoriteService/CreateFavoriteArticleFolder',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.CreateFavoriteArticleFolderRequest,
    responseType: favorite_favorite_pb.CreateFavoriteArticleFolderResponse,
    requestSerialize: serialize_checkpicks_favorite_v1_CreateFavoriteArticleFolderRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_CreateFavoriteArticleFolderRequest,
    responseSerialize: serialize_checkpicks_favorite_v1_CreateFavoriteArticleFolderResponse,
    responseDeserialize: deserialize_checkpicks_favorite_v1_CreateFavoriteArticleFolderResponse,
  },
};

exports.FavoriteServiceClient = grpc.makeGenericClientConstructor(FavoriteServiceService);
