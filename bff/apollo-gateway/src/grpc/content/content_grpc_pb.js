// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var content_content_pb = require('../content/content_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

function serialize_checkpicks_content_v1_CreateArticleResponse(arg) {
  if (!(arg instanceof content_content_pb.CreateArticleResponse)) {
    throw new Error('Expected argument of type checkpicks.content.v1.CreateArticleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_content_v1_CreateArticleResponse(buffer_arg) {
  return content_content_pb.CreateArticleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_content_v1_CreateUploadArticleRequest(arg) {
  if (!(arg instanceof content_content_pb.CreateUploadArticleRequest)) {
    throw new Error('Expected argument of type checkpicks.content.v1.CreateUploadArticleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_content_v1_CreateUploadArticleRequest(buffer_arg) {
  return content_content_pb.CreateUploadArticleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_content_v1_GetArticleOGPRequest(arg) {
  if (!(arg instanceof content_content_pb.GetArticleOGPRequest)) {
    throw new Error('Expected argument of type checkpicks.content.v1.GetArticleOGPRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_content_v1_GetArticleOGPRequest(buffer_arg) {
  return content_content_pb.GetArticleOGPRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_content_v1_GetArticleOGPResponse(arg) {
  if (!(arg instanceof content_content_pb.GetArticleOGPResponse)) {
    throw new Error('Expected argument of type checkpicks.content.v1.GetArticleOGPResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_content_v1_GetArticleOGPResponse(buffer_arg) {
  return content_content_pb.GetArticleOGPResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

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

function serialize_checkpicks_content_v1_GetFeedRequest(arg) {
  if (!(arg instanceof content_content_pb.GetFeedRequest)) {
    throw new Error('Expected argument of type checkpicks.content.v1.GetFeedRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_content_v1_GetFeedRequest(buffer_arg) {
  return content_content_pb.GetFeedRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_content_v1_GetFeedResponse(arg) {
  if (!(arg instanceof content_content_pb.GetFeedResponse)) {
    throw new Error('Expected argument of type checkpicks.content.v1.GetFeedResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_content_v1_GetFeedResponse(buffer_arg) {
  return content_content_pb.GetFeedResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_content_v1_GetFeedsRequest(arg) {
  if (!(arg instanceof content_content_pb.GetFeedsRequest)) {
    throw new Error('Expected argument of type checkpicks.content.v1.GetFeedsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_content_v1_GetFeedsRequest(buffer_arg) {
  return content_content_pb.GetFeedsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_content_v1_GetFeedsResponse(arg) {
  if (!(arg instanceof content_content_pb.GetFeedsResponse)) {
    throw new Error('Expected argument of type checkpicks.content.v1.GetFeedsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_content_v1_GetFeedsResponse(buffer_arg) {
  return content_content_pb.GetFeedsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ContentServiceService = exports.ContentServiceService = {
  getArticles: {
    path: '/checkpicks.content.v1.ContentService/GetArticles',
    requestStream: false,
    responseStream: false,
    requestType: content_content_pb.GetArticlesRequest,
    responseType: content_content_pb.GetArticlesResponse,
    requestSerialize: serialize_checkpicks_content_v1_GetArticlesRequest,
    requestDeserialize: deserialize_checkpicks_content_v1_GetArticlesRequest,
    responseSerialize: serialize_checkpicks_content_v1_GetArticlesResponse,
    responseDeserialize: deserialize_checkpicks_content_v1_GetArticlesResponse,
  },
  createUploadArticle: {
    path: '/checkpicks.content.v1.ContentService/CreateUploadArticle',
    requestStream: false,
    responseStream: false,
    requestType: content_content_pb.CreateUploadArticleRequest,
    responseType: content_content_pb.CreateArticleResponse,
    requestSerialize: serialize_checkpicks_content_v1_CreateUploadArticleRequest,
    requestDeserialize: deserialize_checkpicks_content_v1_CreateUploadArticleRequest,
    responseSerialize: serialize_checkpicks_content_v1_CreateArticleResponse,
    responseDeserialize: deserialize_checkpicks_content_v1_CreateArticleResponse,
  },
  getArticleOGP: {
    path: '/checkpicks.content.v1.ContentService/GetArticleOGP',
    requestStream: false,
    responseStream: false,
    requestType: content_content_pb.GetArticleOGPRequest,
    responseType: content_content_pb.GetArticleOGPResponse,
    requestSerialize: serialize_checkpicks_content_v1_GetArticleOGPRequest,
    requestDeserialize: deserialize_checkpicks_content_v1_GetArticleOGPRequest,
    responseSerialize: serialize_checkpicks_content_v1_GetArticleOGPResponse,
    responseDeserialize: deserialize_checkpicks_content_v1_GetArticleOGPResponse,
  },
  getFeeds: {
    path: '/checkpicks.content.v1.ContentService/GetFeeds',
    requestStream: false,
    responseStream: false,
    requestType: content_content_pb.GetFeedsRequest,
    responseType: content_content_pb.GetFeedsResponse,
    requestSerialize: serialize_checkpicks_content_v1_GetFeedsRequest,
    requestDeserialize: deserialize_checkpicks_content_v1_GetFeedsRequest,
    responseSerialize: serialize_checkpicks_content_v1_GetFeedsResponse,
    responseDeserialize: deserialize_checkpicks_content_v1_GetFeedsResponse,
  },
  getFeed: {
    path: '/checkpicks.content.v1.ContentService/GetFeed',
    requestStream: false,
    responseStream: false,
    requestType: content_content_pb.GetFeedRequest,
    responseType: content_content_pb.GetFeedResponse,
    requestSerialize: serialize_checkpicks_content_v1_GetFeedRequest,
    requestDeserialize: deserialize_checkpicks_content_v1_GetFeedRequest,
    responseSerialize: serialize_checkpicks_content_v1_GetFeedResponse,
    responseDeserialize: deserialize_checkpicks_content_v1_GetFeedResponse,
  },
};

exports.ContentServiceClient = grpc.makeGenericClientConstructor(ContentServiceService);
