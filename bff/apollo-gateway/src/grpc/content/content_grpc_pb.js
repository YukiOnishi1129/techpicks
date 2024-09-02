// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var content_content_pb = require('../content/content_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

function serialize_checkpicks_content_v1_GetArticlesRequest(arg) {
  if (!(arg instanceof content_content_pb.GetArticlesRequest)) {
    throw new Error('Expected argument of type checkpicks.content.v1.GetArticlesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_content_v1_GetArticlesRequest(buffer_arg) {
  return content_content_pb.GetArticlesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_content_v1_GetArticlesResponse(arg) {
  if (!(arg instanceof content_content_pb.GetArticlesResponse)) {
    throw new Error('Expected argument of type checkpicks.content.v1.GetArticlesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_content_v1_GetArticlesResponse(buffer_arg) {
  return content_content_pb.GetArticlesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ArticleServiceService = exports.ArticleServiceService = {
  getArticles: {
    path: '/checkpicks.content.v1.ArticleService/GetArticles',
    requestStream: false,
    responseStream: false,
    requestType: content_content_pb.GetArticlesRequest,
    responseType: content_content_pb.GetArticlesResponse,
    requestSerialize: serialize_checkpicks_content_v1_GetArticlesRequest,
    requestDeserialize: deserialize_checkpicks_content_v1_GetArticlesRequest,
    responseSerialize: serialize_checkpicks_content_v1_GetArticlesResponse,
    responseDeserialize: deserialize_checkpicks_content_v1_GetArticlesResponse,
  },
};

exports.ArticleServiceClient = grpc.makeGenericClientConstructor(ArticleServiceService);
