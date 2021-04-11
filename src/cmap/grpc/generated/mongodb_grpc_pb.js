// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var src_cmap_grpc_mongodb_pb = require('./mongodb_pb.js');

function serialize_mongodb_Message(arg) {
  if (!(arg instanceof src_cmap_grpc_mongodb_pb.Message)) {
    throw new Error('Expected argument of type mongodb.Message');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mongodb_Message(buffer_arg) {
  return src_cmap_grpc_mongodb_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}


var TransportService = exports.TransportService = {
  sendMessage: {
    path: '/mongodb.Transport/SendMessage',
    requestStream: false,
    responseStream: false,
    requestType: src_cmap_grpc_mongodb_pb.Message,
    responseType: src_cmap_grpc_mongodb_pb.Message,
    requestSerialize: serialize_mongodb_Message,
    requestDeserialize: deserialize_mongodb_Message,
    responseSerialize: serialize_mongodb_Message,
    responseDeserialize: deserialize_mongodb_Message,
  },
};

exports.TransportClient = grpc.makeGenericClientConstructor(TransportService);
