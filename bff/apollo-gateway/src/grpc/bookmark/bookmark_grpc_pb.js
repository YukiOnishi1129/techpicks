// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var bookmark_bookmark_pb = require('../bookmark/bookmark_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

function serialize_checkpicks_bookmark_v1_CreateBookmarkForUploadArticleRequest(arg) {
  if (!(arg instanceof bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest)) {
    throw new Error('Expected argument of type checkpicks.bookmark.v1.CreateBookmarkForUploadArticleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_bookmark_v1_CreateBookmarkForUploadArticleRequest(buffer_arg) {
  return bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_bookmark_v1_CreateBookmarkRequest(arg) {
  if (!(arg instanceof bookmark_bookmark_pb.CreateBookmarkRequest)) {
    throw new Error('Expected argument of type checkpicks.bookmark.v1.CreateBookmarkRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_bookmark_v1_CreateBookmarkRequest(buffer_arg) {
  return bookmark_bookmark_pb.CreateBookmarkRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_bookmark_v1_CreateBookmarkResponse(arg) {
  if (!(arg instanceof bookmark_bookmark_pb.CreateBookmarkResponse)) {
    throw new Error('Expected argument of type checkpicks.bookmark.v1.CreateBookmarkResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_bookmark_v1_CreateBookmarkResponse(buffer_arg) {
  return bookmark_bookmark_pb.CreateBookmarkResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_bookmark_v1_DeleteBookmarkRequest(arg) {
  if (!(arg instanceof bookmark_bookmark_pb.DeleteBookmarkRequest)) {
    throw new Error('Expected argument of type checkpicks.bookmark.v1.DeleteBookmarkRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_bookmark_v1_DeleteBookmarkRequest(buffer_arg) {
  return bookmark_bookmark_pb.DeleteBookmarkRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_bookmark_v1_GetBookmarkByArticleIDRequest(arg) {
  if (!(arg instanceof bookmark_bookmark_pb.GetBookmarkByArticleIDRequest)) {
    throw new Error('Expected argument of type checkpicks.bookmark.v1.GetBookmarkByArticleIDRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_bookmark_v1_GetBookmarkByArticleIDRequest(buffer_arg) {
  return bookmark_bookmark_pb.GetBookmarkByArticleIDRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_bookmark_v1_GetBookmarkResponse(arg) {
  if (!(arg instanceof bookmark_bookmark_pb.GetBookmarkResponse)) {
    throw new Error('Expected argument of type checkpicks.bookmark.v1.GetBookmarkResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_bookmark_v1_GetBookmarkResponse(buffer_arg) {
  return bookmark_bookmark_pb.GetBookmarkResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_bookmark_v1_GetBookmarksRequest(arg) {
  if (!(arg instanceof bookmark_bookmark_pb.GetBookmarksRequest)) {
    throw new Error('Expected argument of type checkpicks.bookmark.v1.GetBookmarksRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_bookmark_v1_GetBookmarksRequest(buffer_arg) {
  return bookmark_bookmark_pb.GetBookmarksRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_bookmark_v1_GetBookmarksResponse(arg) {
  if (!(arg instanceof bookmark_bookmark_pb.GetBookmarksResponse)) {
    throw new Error('Expected argument of type checkpicks.bookmark.v1.GetBookmarksResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_bookmark_v1_GetBookmarksResponse(buffer_arg) {
  return bookmark_bookmark_pb.GetBookmarksResponse.deserializeBinary(new Uint8Array(buffer_arg));
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


var BookmarkServiceService = exports.BookmarkServiceService = {
  getBookmarks: {
    path: '/checkpicks.bookmark.v1.BookmarkService/GetBookmarks',
    requestStream: false,
    responseStream: false,
    requestType: bookmark_bookmark_pb.GetBookmarksRequest,
    responseType: bookmark_bookmark_pb.GetBookmarksResponse,
    requestSerialize: serialize_checkpicks_bookmark_v1_GetBookmarksRequest,
    requestDeserialize: deserialize_checkpicks_bookmark_v1_GetBookmarksRequest,
    responseSerialize: serialize_checkpicks_bookmark_v1_GetBookmarksResponse,
    responseDeserialize: deserialize_checkpicks_bookmark_v1_GetBookmarksResponse,
  },
  getBookmarkByArticleID: {
    path: '/checkpicks.bookmark.v1.BookmarkService/GetBookmarkByArticleID',
    requestStream: false,
    responseStream: false,
    requestType: bookmark_bookmark_pb.GetBookmarkByArticleIDRequest,
    responseType: bookmark_bookmark_pb.GetBookmarkResponse,
    requestSerialize: serialize_checkpicks_bookmark_v1_GetBookmarkByArticleIDRequest,
    requestDeserialize: deserialize_checkpicks_bookmark_v1_GetBookmarkByArticleIDRequest,
    responseSerialize: serialize_checkpicks_bookmark_v1_GetBookmarkResponse,
    responseDeserialize: deserialize_checkpicks_bookmark_v1_GetBookmarkResponse,
  },
  createBookmark: {
    path: '/checkpicks.bookmark.v1.BookmarkService/CreateBookmark',
    requestStream: false,
    responseStream: false,
    requestType: bookmark_bookmark_pb.CreateBookmarkRequest,
    responseType: bookmark_bookmark_pb.CreateBookmarkResponse,
    requestSerialize: serialize_checkpicks_bookmark_v1_CreateBookmarkRequest,
    requestDeserialize: deserialize_checkpicks_bookmark_v1_CreateBookmarkRequest,
    responseSerialize: serialize_checkpicks_bookmark_v1_CreateBookmarkResponse,
    responseDeserialize: deserialize_checkpicks_bookmark_v1_CreateBookmarkResponse,
  },
  createBookmarkForUploadArticle: {
    path: '/checkpicks.bookmark.v1.BookmarkService/CreateBookmarkForUploadArticle',
    requestStream: false,
    responseStream: false,
    requestType: bookmark_bookmark_pb.CreateBookmarkForUploadArticleRequest,
    responseType: bookmark_bookmark_pb.CreateBookmarkResponse,
    requestSerialize: serialize_checkpicks_bookmark_v1_CreateBookmarkForUploadArticleRequest,
    requestDeserialize: deserialize_checkpicks_bookmark_v1_CreateBookmarkForUploadArticleRequest,
    responseSerialize: serialize_checkpicks_bookmark_v1_CreateBookmarkResponse,
    responseDeserialize: deserialize_checkpicks_bookmark_v1_CreateBookmarkResponse,
  },
  deleteBookmark: {
    path: '/checkpicks.bookmark.v1.BookmarkService/DeleteBookmark',
    requestStream: false,
    responseStream: false,
    requestType: bookmark_bookmark_pb.DeleteBookmarkRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_checkpicks_bookmark_v1_DeleteBookmarkRequest,
    requestDeserialize: deserialize_checkpicks_bookmark_v1_DeleteBookmarkRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.BookmarkServiceClient = grpc.makeGenericClientConstructor(BookmarkServiceService);
