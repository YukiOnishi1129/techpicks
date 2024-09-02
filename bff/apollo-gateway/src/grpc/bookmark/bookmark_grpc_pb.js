// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var bookmark_bookmark_pb = require('../bookmark/bookmark_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

function serialize_checkpicks_bookmark_v1_GetBookmarkByArticleIdRequest(arg) {
  if (!(arg instanceof bookmark_bookmark_pb.GetBookmarkByArticleIdRequest)) {
    throw new Error('Expected argument of type checkpicks.bookmark.v1.GetBookmarkByArticleIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_bookmark_v1_GetBookmarkByArticleIdRequest(buffer_arg) {
  return bookmark_bookmark_pb.GetBookmarkByArticleIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
  getBookmarkByArticleId: {
    path: '/checkpicks.bookmark.v1.BookmarkService/GetBookmarkByArticleId',
    requestStream: false,
    responseStream: false,
    requestType: bookmark_bookmark_pb.GetBookmarkByArticleIdRequest,
    responseType: bookmark_bookmark_pb.GetBookmarkResponse,
    requestSerialize: serialize_checkpicks_bookmark_v1_GetBookmarkByArticleIdRequest,
    requestDeserialize: deserialize_checkpicks_bookmark_v1_GetBookmarkByArticleIdRequest,
    responseSerialize: serialize_checkpicks_bookmark_v1_GetBookmarkResponse,
    responseDeserialize: deserialize_checkpicks_bookmark_v1_GetBookmarkResponse,
  },
};

exports.BookmarkServiceClient = grpc.makeGenericClientConstructor(BookmarkServiceService);
