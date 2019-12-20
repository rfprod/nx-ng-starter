/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const nxngstarter = $root.nxngstarter = (() => {

    /**
     * Namespace nxngstarter.
     * @exports nxngstarter
     * @namespace
     */
    const nxngstarter = {};

    nxngstarter.CommonEntities = (function() {

        /**
         * Properties of a CommonEntities.
         * @memberof nxngstarter
         * @interface ICommonEntities
         * @property {number|null} [count] CommonEntities count
         * @property {Array.<nxngstarter.ICommonEntity>|null} [entities] CommonEntities entities
         */

        /**
         * Constructs a new CommonEntities.
         * @memberof nxngstarter
         * @classdesc Represents a CommonEntities.
         * @implements ICommonEntities
         * @constructor
         * @param {nxngstarter.ICommonEntities=} [properties] Properties to set
         */
        function CommonEntities(properties) {
            this.entities = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CommonEntities count.
         * @member {number} count
         * @memberof nxngstarter.CommonEntities
         * @instance
         */
        CommonEntities.prototype.count = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * CommonEntities entities.
         * @member {Array.<nxngstarter.ICommonEntity>} entities
         * @memberof nxngstarter.CommonEntities
         * @instance
         */
        CommonEntities.prototype.entities = $util.emptyArray;

        /**
         * Creates a new CommonEntities instance using the specified properties.
         * @function create
         * @memberof nxngstarter.CommonEntities
         * @static
         * @param {nxngstarter.ICommonEntities=} [properties] Properties to set
         * @returns {nxngstarter.CommonEntities} CommonEntities instance
         */
        CommonEntities.create = function create(properties) {
            return new CommonEntities(properties);
        };

        /**
         * Encodes the specified CommonEntities message. Does not implicitly {@link nxngstarter.CommonEntities.verify|verify} messages.
         * @function encode
         * @memberof nxngstarter.CommonEntities
         * @static
         * @param {nxngstarter.ICommonEntities} message CommonEntities message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommonEntities.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.count != null && message.hasOwnProperty("count"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.count);
            if (message.entities != null && message.entities.length)
                for (let i = 0; i < message.entities.length; ++i)
                    $root.nxngstarter.CommonEntity.encode(message.entities[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CommonEntities message, length delimited. Does not implicitly {@link nxngstarter.CommonEntities.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nxngstarter.CommonEntities
         * @static
         * @param {nxngstarter.ICommonEntities} message CommonEntities message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommonEntities.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CommonEntities message from the specified reader or buffer.
         * @function decode
         * @memberof nxngstarter.CommonEntities
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nxngstarter.CommonEntities} CommonEntities
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommonEntities.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.nxngstarter.CommonEntities();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.count = reader.int64();
                    break;
                case 2:
                    if (!(message.entities && message.entities.length))
                        message.entities = [];
                    message.entities.push($root.nxngstarter.CommonEntity.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CommonEntities message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nxngstarter.CommonEntities
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nxngstarter.CommonEntities} CommonEntities
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommonEntities.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CommonEntities message.
         * @function verify
         * @memberof nxngstarter.CommonEntities
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CommonEntities.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                    return "count: integer|Long expected";
            if (message.entities != null && message.hasOwnProperty("entities")) {
                if (!Array.isArray(message.entities))
                    return "entities: array expected";
                for (let i = 0; i < message.entities.length; ++i) {
                    let error = $root.nxngstarter.CommonEntity.verify(message.entities[i]);
                    if (error)
                        return "entities." + error;
                }
            }
            return null;
        };

        /**
         * Creates a CommonEntities message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nxngstarter.CommonEntities
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nxngstarter.CommonEntities} CommonEntities
         */
        CommonEntities.fromObject = function fromObject(object) {
            if (object instanceof $root.nxngstarter.CommonEntities)
                return object;
            let message = new $root.nxngstarter.CommonEntities();
            if (object.count != null)
                if ($util.Long)
                    (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                else if (typeof object.count === "string")
                    message.count = parseInt(object.count, 10);
                else if (typeof object.count === "number")
                    message.count = object.count;
                else if (typeof object.count === "object")
                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
            if (object.entities) {
                if (!Array.isArray(object.entities))
                    throw TypeError(".nxngstarter.CommonEntities.entities: array expected");
                message.entities = [];
                for (let i = 0; i < object.entities.length; ++i) {
                    if (typeof object.entities[i] !== "object")
                        throw TypeError(".nxngstarter.CommonEntities.entities: object expected");
                    message.entities[i] = $root.nxngstarter.CommonEntity.fromObject(object.entities[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a CommonEntities message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nxngstarter.CommonEntities
         * @static
         * @param {nxngstarter.CommonEntities} message CommonEntities
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CommonEntities.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.entities = [];
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.count = options.longs === String ? "0" : 0;
            if (message.count != null && message.hasOwnProperty("count"))
                if (typeof message.count === "number")
                    object.count = options.longs === String ? String(message.count) : message.count;
                else
                    object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
            if (message.entities && message.entities.length) {
                object.entities = [];
                for (let j = 0; j < message.entities.length; ++j)
                    object.entities[j] = $root.nxngstarter.CommonEntity.toObject(message.entities[j], options);
            }
            return object;
        };

        /**
         * Converts this CommonEntities to JSON.
         * @function toJSON
         * @memberof nxngstarter.CommonEntities
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CommonEntities.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CommonEntities;
    })();

    nxngstarter.CommonEntity = (function() {

        /**
         * Properties of a CommonEntity.
         * @memberof nxngstarter
         * @interface ICommonEntity
         * @property {string|null} [string1] CommonEntity string1
         * @property {number|null} [num1] CommonEntity num1
         * @property {number|null} [num2] CommonEntity num2
         * @property {boolean|null} [boolean1] CommonEntity boolean1
         * @property {number|null} [float1] CommonEntity float1
         * @property {google.protobuf.IAny|null} [any1] CommonEntity any1
         * @property {Array.<nxngstarter.ISubEntity>|null} [subEntitiesArray] CommonEntity subEntitiesArray
         * @property {nxngstarter.ISubEntity|null} [subEntittObj] CommonEntity subEntittObj
         */

        /**
         * Constructs a new CommonEntity.
         * @memberof nxngstarter
         * @classdesc Represents a CommonEntity.
         * @implements ICommonEntity
         * @constructor
         * @param {nxngstarter.ICommonEntity=} [properties] Properties to set
         */
        function CommonEntity(properties) {
            this.subEntitiesArray = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CommonEntity string1.
         * @member {string} string1
         * @memberof nxngstarter.CommonEntity
         * @instance
         */
        CommonEntity.prototype.string1 = "";

        /**
         * CommonEntity num1.
         * @member {number} num1
         * @memberof nxngstarter.CommonEntity
         * @instance
         */
        CommonEntity.prototype.num1 = 0;

        /**
         * CommonEntity num2.
         * @member {number} num2
         * @memberof nxngstarter.CommonEntity
         * @instance
         */
        CommonEntity.prototype.num2 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * CommonEntity boolean1.
         * @member {boolean} boolean1
         * @memberof nxngstarter.CommonEntity
         * @instance
         */
        CommonEntity.prototype.boolean1 = false;

        /**
         * CommonEntity float1.
         * @member {number} float1
         * @memberof nxngstarter.CommonEntity
         * @instance
         */
        CommonEntity.prototype.float1 = 0;

        /**
         * CommonEntity any1.
         * @member {google.protobuf.IAny|null|undefined} any1
         * @memberof nxngstarter.CommonEntity
         * @instance
         */
        CommonEntity.prototype.any1 = null;

        /**
         * CommonEntity subEntitiesArray.
         * @member {Array.<nxngstarter.ISubEntity>} subEntitiesArray
         * @memberof nxngstarter.CommonEntity
         * @instance
         */
        CommonEntity.prototype.subEntitiesArray = $util.emptyArray;

        /**
         * CommonEntity subEntittObj.
         * @member {nxngstarter.ISubEntity|null|undefined} subEntittObj
         * @memberof nxngstarter.CommonEntity
         * @instance
         */
        CommonEntity.prototype.subEntittObj = null;

        /**
         * Creates a new CommonEntity instance using the specified properties.
         * @function create
         * @memberof nxngstarter.CommonEntity
         * @static
         * @param {nxngstarter.ICommonEntity=} [properties] Properties to set
         * @returns {nxngstarter.CommonEntity} CommonEntity instance
         */
        CommonEntity.create = function create(properties) {
            return new CommonEntity(properties);
        };

        /**
         * Encodes the specified CommonEntity message. Does not implicitly {@link nxngstarter.CommonEntity.verify|verify} messages.
         * @function encode
         * @memberof nxngstarter.CommonEntity
         * @static
         * @param {nxngstarter.ICommonEntity} message CommonEntity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommonEntity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.string1 != null && message.hasOwnProperty("string1"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.string1);
            if (message.num1 != null && message.hasOwnProperty("num1"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.num1);
            if (message.num2 != null && message.hasOwnProperty("num2"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.num2);
            if (message.boolean1 != null && message.hasOwnProperty("boolean1"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.boolean1);
            if (message.float1 != null && message.hasOwnProperty("float1"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.float1);
            if (message.subEntitiesArray != null && message.subEntitiesArray.length)
                for (let i = 0; i < message.subEntitiesArray.length; ++i)
                    $root.nxngstarter.SubEntity.encode(message.subEntitiesArray[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.subEntittObj != null && message.hasOwnProperty("subEntittObj"))
                $root.nxngstarter.SubEntity.encode(message.subEntittObj, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.any1 != null && message.hasOwnProperty("any1"))
                $root.google.protobuf.Any.encode(message.any1, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CommonEntity message, length delimited. Does not implicitly {@link nxngstarter.CommonEntity.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nxngstarter.CommonEntity
         * @static
         * @param {nxngstarter.ICommonEntity} message CommonEntity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommonEntity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CommonEntity message from the specified reader or buffer.
         * @function decode
         * @memberof nxngstarter.CommonEntity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nxngstarter.CommonEntity} CommonEntity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommonEntity.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.nxngstarter.CommonEntity();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.string1 = reader.string();
                    break;
                case 2:
                    message.num1 = reader.int32();
                    break;
                case 3:
                    message.num2 = reader.int64();
                    break;
                case 4:
                    message.boolean1 = reader.bool();
                    break;
                case 5:
                    message.float1 = reader.float();
                    break;
                case 8:
                    message.any1 = $root.google.protobuf.Any.decode(reader, reader.uint32());
                    break;
                case 6:
                    if (!(message.subEntitiesArray && message.subEntitiesArray.length))
                        message.subEntitiesArray = [];
                    message.subEntitiesArray.push($root.nxngstarter.SubEntity.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.subEntittObj = $root.nxngstarter.SubEntity.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CommonEntity message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nxngstarter.CommonEntity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nxngstarter.CommonEntity} CommonEntity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommonEntity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CommonEntity message.
         * @function verify
         * @memberof nxngstarter.CommonEntity
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CommonEntity.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.string1 != null && message.hasOwnProperty("string1"))
                if (!$util.isString(message.string1))
                    return "string1: string expected";
            if (message.num1 != null && message.hasOwnProperty("num1"))
                if (!$util.isInteger(message.num1))
                    return "num1: integer expected";
            if (message.num2 != null && message.hasOwnProperty("num2"))
                if (!$util.isInteger(message.num2) && !(message.num2 && $util.isInteger(message.num2.low) && $util.isInteger(message.num2.high)))
                    return "num2: integer|Long expected";
            if (message.boolean1 != null && message.hasOwnProperty("boolean1"))
                if (typeof message.boolean1 !== "boolean")
                    return "boolean1: boolean expected";
            if (message.float1 != null && message.hasOwnProperty("float1"))
                if (typeof message.float1 !== "number")
                    return "float1: number expected";
            if (message.any1 != null && message.hasOwnProperty("any1")) {
                let error = $root.google.protobuf.Any.verify(message.any1);
                if (error)
                    return "any1." + error;
            }
            if (message.subEntitiesArray != null && message.hasOwnProperty("subEntitiesArray")) {
                if (!Array.isArray(message.subEntitiesArray))
                    return "subEntitiesArray: array expected";
                for (let i = 0; i < message.subEntitiesArray.length; ++i) {
                    let error = $root.nxngstarter.SubEntity.verify(message.subEntitiesArray[i]);
                    if (error)
                        return "subEntitiesArray." + error;
                }
            }
            if (message.subEntittObj != null && message.hasOwnProperty("subEntittObj")) {
                let error = $root.nxngstarter.SubEntity.verify(message.subEntittObj);
                if (error)
                    return "subEntittObj." + error;
            }
            return null;
        };

        /**
         * Creates a CommonEntity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nxngstarter.CommonEntity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nxngstarter.CommonEntity} CommonEntity
         */
        CommonEntity.fromObject = function fromObject(object) {
            if (object instanceof $root.nxngstarter.CommonEntity)
                return object;
            let message = new $root.nxngstarter.CommonEntity();
            if (object.string1 != null)
                message.string1 = String(object.string1);
            if (object.num1 != null)
                message.num1 = object.num1 | 0;
            if (object.num2 != null)
                if ($util.Long)
                    (message.num2 = $util.Long.fromValue(object.num2)).unsigned = false;
                else if (typeof object.num2 === "string")
                    message.num2 = parseInt(object.num2, 10);
                else if (typeof object.num2 === "number")
                    message.num2 = object.num2;
                else if (typeof object.num2 === "object")
                    message.num2 = new $util.LongBits(object.num2.low >>> 0, object.num2.high >>> 0).toNumber();
            if (object.boolean1 != null)
                message.boolean1 = Boolean(object.boolean1);
            if (object.float1 != null)
                message.float1 = Number(object.float1);
            if (object.any1 != null) {
                if (typeof object.any1 !== "object")
                    throw TypeError(".nxngstarter.CommonEntity.any1: object expected");
                message.any1 = $root.google.protobuf.Any.fromObject(object.any1);
            }
            if (object.subEntitiesArray) {
                if (!Array.isArray(object.subEntitiesArray))
                    throw TypeError(".nxngstarter.CommonEntity.subEntitiesArray: array expected");
                message.subEntitiesArray = [];
                for (let i = 0; i < object.subEntitiesArray.length; ++i) {
                    if (typeof object.subEntitiesArray[i] !== "object")
                        throw TypeError(".nxngstarter.CommonEntity.subEntitiesArray: object expected");
                    message.subEntitiesArray[i] = $root.nxngstarter.SubEntity.fromObject(object.subEntitiesArray[i]);
                }
            }
            if (object.subEntittObj != null) {
                if (typeof object.subEntittObj !== "object")
                    throw TypeError(".nxngstarter.CommonEntity.subEntittObj: object expected");
                message.subEntittObj = $root.nxngstarter.SubEntity.fromObject(object.subEntittObj);
            }
            return message;
        };

        /**
         * Creates a plain object from a CommonEntity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nxngstarter.CommonEntity
         * @static
         * @param {nxngstarter.CommonEntity} message CommonEntity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CommonEntity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.subEntitiesArray = [];
            if (options.defaults) {
                object.string1 = "";
                object.num1 = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.num2 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.num2 = options.longs === String ? "0" : 0;
                object.boolean1 = false;
                object.float1 = 0;
                object.subEntittObj = null;
                object.any1 = null;
            }
            if (message.string1 != null && message.hasOwnProperty("string1"))
                object.string1 = message.string1;
            if (message.num1 != null && message.hasOwnProperty("num1"))
                object.num1 = message.num1;
            if (message.num2 != null && message.hasOwnProperty("num2"))
                if (typeof message.num2 === "number")
                    object.num2 = options.longs === String ? String(message.num2) : message.num2;
                else
                    object.num2 = options.longs === String ? $util.Long.prototype.toString.call(message.num2) : options.longs === Number ? new $util.LongBits(message.num2.low >>> 0, message.num2.high >>> 0).toNumber() : message.num2;
            if (message.boolean1 != null && message.hasOwnProperty("boolean1"))
                object.boolean1 = message.boolean1;
            if (message.float1 != null && message.hasOwnProperty("float1"))
                object.float1 = options.json && !isFinite(message.float1) ? String(message.float1) : message.float1;
            if (message.subEntitiesArray && message.subEntitiesArray.length) {
                object.subEntitiesArray = [];
                for (let j = 0; j < message.subEntitiesArray.length; ++j)
                    object.subEntitiesArray[j] = $root.nxngstarter.SubEntity.toObject(message.subEntitiesArray[j], options);
            }
            if (message.subEntittObj != null && message.hasOwnProperty("subEntittObj"))
                object.subEntittObj = $root.nxngstarter.SubEntity.toObject(message.subEntittObj, options);
            if (message.any1 != null && message.hasOwnProperty("any1"))
                object.any1 = $root.google.protobuf.Any.toObject(message.any1, options);
            return object;
        };

        /**
         * Converts this CommonEntity to JSON.
         * @function toJSON
         * @memberof nxngstarter.CommonEntity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CommonEntity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CommonEntity;
    })();

    nxngstarter.SubEntity = (function() {

        /**
         * Properties of a SubEntity.
         * @memberof nxngstarter
         * @interface ISubEntity
         * @property {string|null} [id] SubEntity id
         */

        /**
         * Constructs a new SubEntity.
         * @memberof nxngstarter
         * @classdesc Represents a SubEntity.
         * @implements ISubEntity
         * @constructor
         * @param {nxngstarter.ISubEntity=} [properties] Properties to set
         */
        function SubEntity(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SubEntity id.
         * @member {string} id
         * @memberof nxngstarter.SubEntity
         * @instance
         */
        SubEntity.prototype.id = "";

        /**
         * Creates a new SubEntity instance using the specified properties.
         * @function create
         * @memberof nxngstarter.SubEntity
         * @static
         * @param {nxngstarter.ISubEntity=} [properties] Properties to set
         * @returns {nxngstarter.SubEntity} SubEntity instance
         */
        SubEntity.create = function create(properties) {
            return new SubEntity(properties);
        };

        /**
         * Encodes the specified SubEntity message. Does not implicitly {@link nxngstarter.SubEntity.verify|verify} messages.
         * @function encode
         * @memberof nxngstarter.SubEntity
         * @static
         * @param {nxngstarter.ISubEntity} message SubEntity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubEntity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            return writer;
        };

        /**
         * Encodes the specified SubEntity message, length delimited. Does not implicitly {@link nxngstarter.SubEntity.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nxngstarter.SubEntity
         * @static
         * @param {nxngstarter.ISubEntity} message SubEntity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubEntity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SubEntity message from the specified reader or buffer.
         * @function decode
         * @memberof nxngstarter.SubEntity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nxngstarter.SubEntity} SubEntity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubEntity.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.nxngstarter.SubEntity();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SubEntity message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nxngstarter.SubEntity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nxngstarter.SubEntity} SubEntity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubEntity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SubEntity message.
         * @function verify
         * @memberof nxngstarter.SubEntity
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SubEntity.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            return null;
        };

        /**
         * Creates a SubEntity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nxngstarter.SubEntity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nxngstarter.SubEntity} SubEntity
         */
        SubEntity.fromObject = function fromObject(object) {
            if (object instanceof $root.nxngstarter.SubEntity)
                return object;
            let message = new $root.nxngstarter.SubEntity();
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a SubEntity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nxngstarter.SubEntity
         * @static
         * @param {nxngstarter.SubEntity} message SubEntity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubEntity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.id = "";
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this SubEntity to JSON.
         * @function toJSON
         * @memberof nxngstarter.SubEntity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubEntity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SubEntity;
    })();

    nxngstarter.CommonEntityFilterDto = (function() {

        /**
         * Properties of a CommonEntityFilterDto.
         * @memberof nxngstarter
         * @interface ICommonEntityFilterDto
         * @property {number|null} [num1] CommonEntityFilterDto num1
         */

        /**
         * Constructs a new CommonEntityFilterDto.
         * @memberof nxngstarter
         * @classdesc Represents a CommonEntityFilterDto.
         * @implements ICommonEntityFilterDto
         * @constructor
         * @param {nxngstarter.ICommonEntityFilterDto=} [properties] Properties to set
         */
        function CommonEntityFilterDto(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CommonEntityFilterDto num1.
         * @member {number} num1
         * @memberof nxngstarter.CommonEntityFilterDto
         * @instance
         */
        CommonEntityFilterDto.prototype.num1 = 0;

        /**
         * Creates a new CommonEntityFilterDto instance using the specified properties.
         * @function create
         * @memberof nxngstarter.CommonEntityFilterDto
         * @static
         * @param {nxngstarter.ICommonEntityFilterDto=} [properties] Properties to set
         * @returns {nxngstarter.CommonEntityFilterDto} CommonEntityFilterDto instance
         */
        CommonEntityFilterDto.create = function create(properties) {
            return new CommonEntityFilterDto(properties);
        };

        /**
         * Encodes the specified CommonEntityFilterDto message. Does not implicitly {@link nxngstarter.CommonEntityFilterDto.verify|verify} messages.
         * @function encode
         * @memberof nxngstarter.CommonEntityFilterDto
         * @static
         * @param {nxngstarter.ICommonEntityFilterDto} message CommonEntityFilterDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommonEntityFilterDto.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.num1 != null && message.hasOwnProperty("num1"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.num1);
            return writer;
        };

        /**
         * Encodes the specified CommonEntityFilterDto message, length delimited. Does not implicitly {@link nxngstarter.CommonEntityFilterDto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nxngstarter.CommonEntityFilterDto
         * @static
         * @param {nxngstarter.ICommonEntityFilterDto} message CommonEntityFilterDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommonEntityFilterDto.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CommonEntityFilterDto message from the specified reader or buffer.
         * @function decode
         * @memberof nxngstarter.CommonEntityFilterDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nxngstarter.CommonEntityFilterDto} CommonEntityFilterDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommonEntityFilterDto.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.nxngstarter.CommonEntityFilterDto();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.num1 = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CommonEntityFilterDto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nxngstarter.CommonEntityFilterDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nxngstarter.CommonEntityFilterDto} CommonEntityFilterDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommonEntityFilterDto.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CommonEntityFilterDto message.
         * @function verify
         * @memberof nxngstarter.CommonEntityFilterDto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CommonEntityFilterDto.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.num1 != null && message.hasOwnProperty("num1"))
                if (!$util.isInteger(message.num1))
                    return "num1: integer expected";
            return null;
        };

        /**
         * Creates a CommonEntityFilterDto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nxngstarter.CommonEntityFilterDto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nxngstarter.CommonEntityFilterDto} CommonEntityFilterDto
         */
        CommonEntityFilterDto.fromObject = function fromObject(object) {
            if (object instanceof $root.nxngstarter.CommonEntityFilterDto)
                return object;
            let message = new $root.nxngstarter.CommonEntityFilterDto();
            if (object.num1 != null)
                message.num1 = object.num1 | 0;
            return message;
        };

        /**
         * Creates a plain object from a CommonEntityFilterDto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nxngstarter.CommonEntityFilterDto
         * @static
         * @param {nxngstarter.CommonEntityFilterDto} message CommonEntityFilterDto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CommonEntityFilterDto.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.num1 = 0;
            if (message.num1 != null && message.hasOwnProperty("num1"))
                object.num1 = message.num1;
            return object;
        };

        /**
         * Converts this CommonEntityFilterDto to JSON.
         * @function toJSON
         * @memberof nxngstarter.CommonEntityFilterDto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CommonEntityFilterDto.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CommonEntityFilterDto;
    })();

    return nxngstarter;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Empty = (function() {

            /**
             * Properties of an Empty.
             * @memberof google.protobuf
             * @interface IEmpty
             */

            /**
             * Constructs a new Empty.
             * @memberof google.protobuf
             * @classdesc Represents an Empty.
             * @implements IEmpty
             * @constructor
             * @param {google.protobuf.IEmpty=} [properties] Properties to set
             */
            function Empty(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new Empty instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty=} [properties] Properties to set
             * @returns {google.protobuf.Empty} Empty instance
             */
            Empty.create = function create(properties) {
                return new Empty(properties);
            };

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Empty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Empty.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Empty();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Empty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Empty.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Empty message.
             * @function verify
             * @memberof google.protobuf.Empty
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Empty.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Empty
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Empty} Empty
             */
            Empty.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Empty)
                    return object;
                return new $root.google.protobuf.Empty();
            };

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.Empty} message Empty
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Empty.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Empty to JSON.
             * @function toJSON
             * @memberof google.protobuf.Empty
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Empty.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Empty;
        })();

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type_url = reader.string();
                        break;
                    case 2:
                        message.value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                let message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
