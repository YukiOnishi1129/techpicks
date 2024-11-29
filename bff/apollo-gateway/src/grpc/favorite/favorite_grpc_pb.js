// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var favorite_favorite_pb = require('../favorite/favorite_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
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

function serialize_checkpicks_favorite_v1_CreateFavoriteArticleForUploadArticleRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.CreateFavoriteArticleForUploadArticleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_CreateFavoriteArticleForUploadArticleRequest(buffer_arg) {
  return favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_CreateFavoriteArticleRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.CreateFavoriteArticleRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.CreateFavoriteArticleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_CreateFavoriteArticleRequest(buffer_arg) {
  return favorite_favorite_pb.CreateFavoriteArticleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_CreateFavoriteArticleResponse(arg) {
  if (!(arg instanceof favorite_favorite_pb.CreateFavoriteArticleResponse)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.CreateFavoriteArticleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_CreateFavoriteArticleResponse(buffer_arg) {
  return favorite_favorite_pb.CreateFavoriteArticleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_DeleteFavoriteArticleByArticleIdRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.DeleteFavoriteArticleByArticleIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_DeleteFavoriteArticleByArticleIdRequest(buffer_arg) {
  return favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_DeleteFavoriteArticleFolderRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.DeleteFavoriteArticleFolderRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.DeleteFavoriteArticleFolderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_DeleteFavoriteArticleFolderRequest(buffer_arg) {
  return favorite_favorite_pb.DeleteFavoriteArticleFolderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_DeleteFavoriteArticleRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.DeleteFavoriteArticleRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.DeleteFavoriteArticleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_DeleteFavoriteArticleRequest(buffer_arg) {
  return favorite_favorite_pb.DeleteFavoriteArticleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_GetFavoriteAllFolderArticlesRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.GetFavoriteAllFolderArticlesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_GetFavoriteAllFolderArticlesRequest(buffer_arg) {
  return favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_GetFavoriteAllFolderArticlesResponse(arg) {
  if (!(arg instanceof favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.GetFavoriteAllFolderArticlesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_GetFavoriteAllFolderArticlesResponse(buffer_arg) {
  return favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_GetFavoriteArticleFolderByIdRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.GetFavoriteArticleFolderByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_GetFavoriteArticleFolderByIdRequest(buffer_arg) {
  return favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersByArticleIdRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.GetFavoriteArticleFoldersByArticleIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersByArticleIdRequest(buffer_arg) {
  return favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.GetFavoriteArticleFoldersRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.GetFavoriteArticleFoldersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersRequest(buffer_arg) {
  return favorite_favorite_pb.GetFavoriteArticleFoldersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersResponse(arg) {
  if (!(arg instanceof favorite_favorite_pb.GetFavoriteArticleFoldersResponse)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.GetFavoriteArticleFoldersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersResponse(buffer_arg) {
  return favorite_favorite_pb.GetFavoriteArticleFoldersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_GetFavoriteArticlesRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.GetFavoriteArticlesRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.GetFavoriteArticlesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_GetFavoriteArticlesRequest(buffer_arg) {
  return favorite_favorite_pb.GetFavoriteArticlesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_GetFavoriteArticlesResponse(arg) {
  if (!(arg instanceof favorite_favorite_pb.GetFavoriteArticlesResponse)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.GetFavoriteArticlesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_GetFavoriteArticlesResponse(buffer_arg) {
  return favorite_favorite_pb.GetFavoriteArticlesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_UpdateFavoriteArticleFolderRequest(arg) {
  if (!(arg instanceof favorite_favorite_pb.UpdateFavoriteArticleFolderRequest)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.UpdateFavoriteArticleFolderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_UpdateFavoriteArticleFolderRequest(buffer_arg) {
  return favorite_favorite_pb.UpdateFavoriteArticleFolderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_favorite_v1_UpdateFavoriteArticleFolderResponse(arg) {
  if (!(arg instanceof favorite_favorite_pb.UpdateFavoriteArticleFolderResponse)) {
    throw new Error('Expected argument of type checkpicks.favorite.v1.UpdateFavoriteArticleFolderResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_favorite_v1_UpdateFavoriteArticleFolderResponse(buffer_arg) {
  return favorite_favorite_pb.UpdateFavoriteArticleFolderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var FavoriteServiceService = exports.FavoriteServiceService = {
  getFavoriteArticleFolders: {
    path: '/checkpicks.favorite.v1.FavoriteService/GetFavoriteArticleFolders',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.GetFavoriteArticleFoldersRequest,
    responseType: favorite_favorite_pb.GetFavoriteArticleFoldersResponse,
    requestSerialize: serialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersRequest,
    responseSerialize: serialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersResponse,
    responseDeserialize: deserialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersResponse,
  },
  getFavoriteArticleFoldersByArticleId: {
    path: '/checkpicks.favorite.v1.FavoriteService/GetFavoriteArticleFoldersByArticleId',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.GetFavoriteArticleFoldersByArticleIdRequest,
    responseType: favorite_favorite_pb.GetFavoriteArticleFoldersResponse,
    requestSerialize: serialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersByArticleIdRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersByArticleIdRequest,
    responseSerialize: serialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersResponse,
    responseDeserialize: deserialize_checkpicks_favorite_v1_GetFavoriteArticleFoldersResponse,
  },
  getFavoriteArticleFolderById: {
    path: '/checkpicks.favorite.v1.FavoriteService/GetFavoriteArticleFolderById',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.GetFavoriteArticleFolderByIdRequest,
    responseType: favorite_favorite_pb.GetFavoriteArticleFolderResponse,
    requestSerialize: serialize_checkpicks_favorite_v1_GetFavoriteArticleFolderByIdRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_GetFavoriteArticleFolderByIdRequest,
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
  updateFavoriteArticleFolder: {
    path: '/checkpicks.favorite.v1.FavoriteService/UpdateFavoriteArticleFolder',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.UpdateFavoriteArticleFolderRequest,
    responseType: favorite_favorite_pb.UpdateFavoriteArticleFolderResponse,
    requestSerialize: serialize_checkpicks_favorite_v1_UpdateFavoriteArticleFolderRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_UpdateFavoriteArticleFolderRequest,
    responseSerialize: serialize_checkpicks_favorite_v1_UpdateFavoriteArticleFolderResponse,
    responseDeserialize: deserialize_checkpicks_favorite_v1_UpdateFavoriteArticleFolderResponse,
  },
  deleteFavoriteArticleFolder: {
    path: '/checkpicks.favorite.v1.FavoriteService/DeleteFavoriteArticleFolder',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.DeleteFavoriteArticleFolderRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_checkpicks_favorite_v1_DeleteFavoriteArticleFolderRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_DeleteFavoriteArticleFolderRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  getFavoriteArticles: {
    path: '/checkpicks.favorite.v1.FavoriteService/GetFavoriteArticles',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.GetFavoriteArticlesRequest,
    responseType: favorite_favorite_pb.GetFavoriteArticlesResponse,
    requestSerialize: serialize_checkpicks_favorite_v1_GetFavoriteArticlesRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_GetFavoriteArticlesRequest,
    responseSerialize: serialize_checkpicks_favorite_v1_GetFavoriteArticlesResponse,
    responseDeserialize: deserialize_checkpicks_favorite_v1_GetFavoriteArticlesResponse,
  },
  getFavoriteAllFolderArticles: {
    path: '/checkpicks.favorite.v1.FavoriteService/GetFavoriteAllFolderArticles',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.GetFavoriteAllFolderArticlesRequest,
    responseType: favorite_favorite_pb.GetFavoriteAllFolderArticlesResponse,
    requestSerialize: serialize_checkpicks_favorite_v1_GetFavoriteAllFolderArticlesRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_GetFavoriteAllFolderArticlesRequest,
    responseSerialize: serialize_checkpicks_favorite_v1_GetFavoriteAllFolderArticlesResponse,
    responseDeserialize: deserialize_checkpicks_favorite_v1_GetFavoriteAllFolderArticlesResponse,
  },
  createFavoriteArticle: {
    path: '/checkpicks.favorite.v1.FavoriteService/CreateFavoriteArticle',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.CreateFavoriteArticleRequest,
    responseType: favorite_favorite_pb.CreateFavoriteArticleResponse,
    requestSerialize: serialize_checkpicks_favorite_v1_CreateFavoriteArticleRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_CreateFavoriteArticleRequest,
    responseSerialize: serialize_checkpicks_favorite_v1_CreateFavoriteArticleResponse,
    responseDeserialize: deserialize_checkpicks_favorite_v1_CreateFavoriteArticleResponse,
  },
  createFavoriteArticleForUploadArticle: {
    path: '/checkpicks.favorite.v1.FavoriteService/CreateFavoriteArticleForUploadArticle',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.CreateFavoriteArticleForUploadArticleRequest,
    responseType: favorite_favorite_pb.CreateFavoriteArticleResponse,
    requestSerialize: serialize_checkpicks_favorite_v1_CreateFavoriteArticleForUploadArticleRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_CreateFavoriteArticleForUploadArticleRequest,
    responseSerialize: serialize_checkpicks_favorite_v1_CreateFavoriteArticleResponse,
    responseDeserialize: deserialize_checkpicks_favorite_v1_CreateFavoriteArticleResponse,
  },
  deleteFavoriteArticle: {
    path: '/checkpicks.favorite.v1.FavoriteService/DeleteFavoriteArticle',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.DeleteFavoriteArticleRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_checkpicks_favorite_v1_DeleteFavoriteArticleRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_DeleteFavoriteArticleRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  deleteFavoriteArticlesByArticleId: {
    path: '/checkpicks.favorite.v1.FavoriteService/DeleteFavoriteArticlesByArticleId',
    requestStream: false,
    responseStream: false,
    requestType: favorite_favorite_pb.DeleteFavoriteArticleByArticleIdRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_checkpicks_favorite_v1_DeleteFavoriteArticleByArticleIdRequest,
    requestDeserialize: deserialize_checkpicks_favorite_v1_DeleteFavoriteArticleByArticleIdRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.FavoriteServiceClient = grpc.makeGenericClientConstructor(FavoriteServiceService);
