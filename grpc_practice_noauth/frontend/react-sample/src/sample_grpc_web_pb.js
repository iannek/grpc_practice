/**
 * @fileoverview gRPC-Web generated client stub for sample
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.sample = require('./sample_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sample.GreeterClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sample.GreeterPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.sample.TemparatureReply>}
 */
const methodDescriptor_Greeter_ReturnTemparature = new grpc.web.MethodDescriptor(
  '/sample.Greeter/ReturnTemparature',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.sample.TemparatureReply,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sample.TemparatureReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.sample.TemparatureReply>}
 */
const methodInfo_Greeter_ReturnTemparature = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sample.TemparatureReply,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sample.TemparatureReply.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sample.TemparatureReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sample.TemparatureReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sample.GreeterClient.prototype.returnTemparature =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sample.Greeter/ReturnTemparature',
      request,
      metadata || {},
      methodDescriptor_Greeter_ReturnTemparature,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sample.TemparatureReply>}
 *     A native promise that resolves to the response
 */
proto.sample.GreeterPromiseClient.prototype.returnTemparature =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sample.Greeter/ReturnTemparature',
      request,
      metadata || {},
      methodDescriptor_Greeter_ReturnTemparature);
};


module.exports = proto.sample;

