// source: common.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
goog.object.extend(proto, google_protobuf_any_pb);
goog.exportSymbol('proto.nxngstarter.Entity', null, global);
goog.exportSymbol('proto.nxngstarter.EntityById', null, global);
goog.exportSymbol('proto.nxngstarter.SubEntity', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.nxngstarter.Entity = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.nxngstarter.Entity.repeatedFields_, null);
};
goog.inherits(proto.nxngstarter.Entity, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.nxngstarter.Entity.displayName = 'proto.nxngstarter.Entity';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.nxngstarter.SubEntity = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.nxngstarter.SubEntity, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.nxngstarter.SubEntity.displayName = 'proto.nxngstarter.SubEntity';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.nxngstarter.EntityById = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.nxngstarter.EntityById, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.nxngstarter.EntityById.displayName = 'proto.nxngstarter.EntityById';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.nxngstarter.Entity.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.nxngstarter.Entity.prototype.toObject = function(opt_includeInstance) {
  return proto.nxngstarter.Entity.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.nxngstarter.Entity} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nxngstarter.Entity.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    integer: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pb_boolean: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    pb_float: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    any: (f = msg.getAny()) && google_protobuf_any_pb.Any.toObject(includeInstance, f),
    subentitiesList: jspb.Message.toObjectList(msg.getSubentitiesList(),
    proto.nxngstarter.SubEntity.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.nxngstarter.Entity}
 */
proto.nxngstarter.Entity.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.nxngstarter.Entity;
  return proto.nxngstarter.Entity.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.nxngstarter.Entity} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.nxngstarter.Entity}
 */
proto.nxngstarter.Entity.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInteger(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBoolean(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setFloat(value);
      break;
    case 5:
      var value = new google_protobuf_any_pb.Any;
      reader.readMessage(value,google_protobuf_any_pb.Any.deserializeBinaryFromReader);
      msg.setAny(value);
      break;
    case 6:
      var value = new proto.nxngstarter.SubEntity;
      reader.readMessage(value,proto.nxngstarter.SubEntity.deserializeBinaryFromReader);
      msg.addSubentities(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.nxngstarter.Entity.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.nxngstarter.Entity.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.nxngstarter.Entity} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nxngstarter.Entity.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getInteger();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getBoolean();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getFloat();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getAny();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_any_pb.Any.serializeBinaryToWriter
    );
  }
  f = message.getSubentitiesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.nxngstarter.SubEntity.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.nxngstarter.Entity.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.nxngstarter.Entity} returns this
 */
proto.nxngstarter.Entity.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 integer = 2;
 * @return {number}
 */
proto.nxngstarter.Entity.prototype.getInteger = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.nxngstarter.Entity} returns this
 */
proto.nxngstarter.Entity.prototype.setInteger = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bool boolean = 3;
 * @return {boolean}
 */
proto.nxngstarter.Entity.prototype.getBoolean = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.nxngstarter.Entity} returns this
 */
proto.nxngstarter.Entity.prototype.setBoolean = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional float float = 4;
 * @return {number}
 */
proto.nxngstarter.Entity.prototype.getFloat = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.nxngstarter.Entity} returns this
 */
proto.nxngstarter.Entity.prototype.setFloat = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional google.protobuf.Any any = 5;
 * @return {?proto.google.protobuf.Any}
 */
proto.nxngstarter.Entity.prototype.getAny = function() {
  return /** @type{?proto.google.protobuf.Any} */ (
    jspb.Message.getWrapperField(this, google_protobuf_any_pb.Any, 5));
};


/**
 * @param {?proto.google.protobuf.Any|undefined} value
 * @return {!proto.nxngstarter.Entity} returns this
*/
proto.nxngstarter.Entity.prototype.setAny = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.nxngstarter.Entity} returns this
 */
proto.nxngstarter.Entity.prototype.clearAny = function() {
  return this.setAny(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.nxngstarter.Entity.prototype.hasAny = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * repeated SubEntity subEntities = 6;
 * @return {!Array<!proto.nxngstarter.SubEntity>}
 */
proto.nxngstarter.Entity.prototype.getSubentitiesList = function() {
  return /** @type{!Array<!proto.nxngstarter.SubEntity>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.nxngstarter.SubEntity, 6));
};


/**
 * @param {!Array<!proto.nxngstarter.SubEntity>} value
 * @return {!proto.nxngstarter.Entity} returns this
*/
proto.nxngstarter.Entity.prototype.setSubentitiesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.nxngstarter.SubEntity=} opt_value
 * @param {number=} opt_index
 * @return {!proto.nxngstarter.SubEntity}
 */
proto.nxngstarter.Entity.prototype.addSubentities = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.nxngstarter.SubEntity, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.nxngstarter.Entity} returns this
 */
proto.nxngstarter.Entity.prototype.clearSubentitiesList = function() {
  return this.setSubentitiesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.nxngstarter.SubEntity.prototype.toObject = function(opt_includeInstance) {
  return proto.nxngstarter.SubEntity.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.nxngstarter.SubEntity} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nxngstarter.SubEntity.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.nxngstarter.SubEntity}
 */
proto.nxngstarter.SubEntity.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.nxngstarter.SubEntity;
  return proto.nxngstarter.SubEntity.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.nxngstarter.SubEntity} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.nxngstarter.SubEntity}
 */
proto.nxngstarter.SubEntity.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.nxngstarter.SubEntity.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.nxngstarter.SubEntity.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.nxngstarter.SubEntity} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nxngstarter.SubEntity.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.nxngstarter.SubEntity.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.nxngstarter.SubEntity} returns this
 */
proto.nxngstarter.SubEntity.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.nxngstarter.EntityById.prototype.toObject = function(opt_includeInstance) {
  return proto.nxngstarter.EntityById.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.nxngstarter.EntityById} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nxngstarter.EntityById.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.nxngstarter.EntityById}
 */
proto.nxngstarter.EntityById.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.nxngstarter.EntityById;
  return proto.nxngstarter.EntityById.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.nxngstarter.EntityById} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.nxngstarter.EntityById}
 */
proto.nxngstarter.EntityById.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.nxngstarter.EntityById.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.nxngstarter.EntityById.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.nxngstarter.EntityById} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nxngstarter.EntityById.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.nxngstarter.EntityById.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.nxngstarter.EntityById} returns this
 */
proto.nxngstarter.EntityById.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


goog.object.extend(exports, proto.nxngstarter);
