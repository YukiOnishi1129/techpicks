// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var favorite_favorite_pb = require('../favorite/favorite_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

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
};

exports.FavoriteServiceClient = grpc.makeGenericClientConstructor(FavoriteServiceService);
