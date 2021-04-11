// GENERATED CODE -- DO NOT EDIT!

// package: mongodb
// file: src/cmap/grpc/mongodb.proto

import * as mongodb_pb from "./mongodb_pb";
import * as grpc from "@grpc/grpc-js";

interface ITransportService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  sendMessage: grpc.MethodDefinition<mongodb_pb.Message, mongodb_pb.Message>;
}

export const TransportService: ITransportService;

export interface ITransportServer extends grpc.UntypedServiceImplementation {
  sendMessage: grpc.handleUnaryCall<mongodb_pb.Message, mongodb_pb.Message>;
}

export class TransportClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  sendMessage(argument: mongodb_pb.Message, callback: grpc.requestCallback<mongodb_pb.Message>): grpc.ClientUnaryCall;
  sendMessage(argument: mongodb_pb.Message, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<mongodb_pb.Message>): grpc.ClientUnaryCall;
  sendMessage(argument: mongodb_pb.Message, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<mongodb_pb.Message>): grpc.ClientUnaryCall;
}
