// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var bookmark_bookmark_pb = require('../bookmark/bookmark_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

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


var BookmarkServiceService = exports.BookmarkServiceService = {
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
};

exports.BookmarkServiceClient = grpc.makeGenericClientConstructor(BookmarkServiceService);
