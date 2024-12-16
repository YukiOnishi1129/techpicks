// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var my_feed_my_feed_pb = require('../my_feed/my_feed_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');
var content_content_pb = require('../content/content_pb.js');

function serialize_checkpicks_my_feed_v1_GetMyFeedFoldersRequest(arg) {
  if (!(arg instanceof my_feed_my_feed_pb.GetMyFeedFoldersRequest)) {
    throw new Error('Expected argument of type checkpicks.my_feed.v1.GetMyFeedFoldersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_my_feed_v1_GetMyFeedFoldersRequest(buffer_arg) {
  return my_feed_my_feed_pb.GetMyFeedFoldersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_checkpicks_my_feed_v1_GetMyFeedFoldersResponse(arg) {
  if (!(arg instanceof my_feed_my_feed_pb.GetMyFeedFoldersResponse)) {
    throw new Error('Expected argument of type checkpicks.my_feed.v1.GetMyFeedFoldersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_checkpicks_my_feed_v1_GetMyFeedFoldersResponse(buffer_arg) {
  return my_feed_my_feed_pb.GetMyFeedFoldersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var MyFeedServiceService = exports.MyFeedServiceService = {
  getMyFeedFolders: {
    path: '/checkpicks.my_feed.v1.MyFeedService/GetMyFeedFolders',
    requestStream: false,
    responseStream: false,
    requestType: my_feed_my_feed_pb.GetMyFeedFoldersRequest,
    responseType: my_feed_my_feed_pb.GetMyFeedFoldersResponse,
    requestSerialize: serialize_checkpicks_my_feed_v1_GetMyFeedFoldersRequest,
    requestDeserialize: deserialize_checkpicks_my_feed_v1_GetMyFeedFoldersRequest,
    responseSerialize: serialize_checkpicks_my_feed_v1_GetMyFeedFoldersResponse,
    responseDeserialize: deserialize_checkpicks_my_feed_v1_GetMyFeedFoldersResponse,
  },
};

exports.MyFeedServiceClient = grpc.makeGenericClientConstructor(MyFeedServiceService);
