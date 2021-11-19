/**
 * @fileoverview gRPC-Web generated client stub for nxngstarter
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var common_pb = require('./common_pb.js')
const proto = {};
proto.nxngstarter = require('./root_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.nxngstarter.EntityServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

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
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.nxngstarter.EntityServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

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
 *   !proto.nxngstarter.EntityById,
 *   !proto.nxngstarter.Entity>}
 */
const methodDescriptor_EntityService_FindOne = new grpc.web.MethodDescriptor(
  '/nxngstarter.EntityService/FindOne',
  grpc.web.MethodType.UNARY,
  common_pb.EntityById,
  common_pb.Entity,
  /**
   * @param {!proto.nxngstarter.EntityById} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.Entity.deserializeBinary
);


/**
 * @param {!proto.nxngstarter.EntityById} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.nxngstarter.Entity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.nxngstarter.Entity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.nxngstarter.EntityServiceClient.prototype.findOne =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/nxngstarter.EntityService/FindOne',
      request,
      metadata || {},
      methodDescriptor_EntityService_FindOne,
      callback);
};


/**
 * @param {!proto.nxngstarter.EntityById} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.nxngstarter.Entity>}
 *     Promise that resolves to the response
 */
proto.nxngstarter.EntityServicePromiseClient.prototype.findOne =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/nxngstarter.EntityService/FindOne',
      request,
      metadata || {},
      methodDescriptor_EntityService_FindOne);
};


module.exports = proto.nxngstarter;

