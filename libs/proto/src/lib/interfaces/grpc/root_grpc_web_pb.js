/**
 * @fileoverview gRPC-Web generated client stub for nxngstarter
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var common_pb = require('./common_pb.js')
const proto = {};
proto.nxngstarter = require('./root_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.nxngstarter.SampleServiceClient =
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
proto.nxngstarter.SampleServicePromiseClient =
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
 *   !proto.nxngstarter.SampleServiceRequest,
 *   !proto.nxngstarter.SampleServiceResponse>}
 */
const methodDescriptor_SampleService_SampleServiceMethod = new grpc.web.MethodDescriptor(
  '/nxngstarter.SampleService/SampleServiceMethod',
  grpc.web.MethodType.UNARY,
  common_pb.SampleServiceRequest,
  common_pb.SampleServiceResponse,
  /**
   * @param {!proto.nxngstarter.SampleServiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.SampleServiceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.nxngstarter.SampleServiceRequest,
 *   !proto.nxngstarter.SampleServiceResponse>}
 */
const methodInfo_SampleService_SampleServiceMethod = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.SampleServiceResponse,
  /**
   * @param {!proto.nxngstarter.SampleServiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.SampleServiceResponse.deserializeBinary
);


/**
 * @param {!proto.nxngstarter.SampleServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.nxngstarter.SampleServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.nxngstarter.SampleServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.nxngstarter.SampleServiceClient.prototype.sampleServiceMethod =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/nxngstarter.SampleService/SampleServiceMethod',
      request,
      metadata || {},
      methodDescriptor_SampleService_SampleServiceMethod,
      callback);
};


/**
 * @param {!proto.nxngstarter.SampleServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.nxngstarter.SampleServiceResponse>}
 *     A native promise that resolves to the response
 */
proto.nxngstarter.SampleServicePromiseClient.prototype.sampleServiceMethod =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/nxngstarter.SampleService/SampleServiceMethod',
      request,
      metadata || {},
      methodDescriptor_SampleService_SampleServiceMethod);
};


module.exports = proto.nxngstarter;

