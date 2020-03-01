/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

const $util = $protobuf.util;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const nxngstarter = $root.nxngstarter = (() => {

    const nxngstarter = {};

    nxngstarter.CommonEntities = (function() {

        function CommonEntities(p) {
            this.entities = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        CommonEntities.prototype.count = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        CommonEntities.prototype.entities = $util.emptyArray;

        CommonEntities.fromObject = function fromObject(d) {
            if (d instanceof $root.nxngstarter.CommonEntities)
                return d;
            var m = new $root.nxngstarter.CommonEntities();
            if (d.count != null) {
                if ($util.Long)
                    (m.count = $util.Long.fromValue(d.count)).unsigned = false;
                else if (typeof d.count === "string")
                    m.count = parseInt(d.count, 10);
                else if (typeof d.count === "number")
                    m.count = d.count;
                else if (typeof d.count === "object")
                    m.count = new $util.LongBits(d.count.low >>> 0, d.count.high >>> 0).toNumber();
            }
            if (d.entities) {
                if (!Array.isArray(d.entities))
                    throw TypeError(".nxngstarter.CommonEntities.entities: array expected");
                m.entities = [];
                for (var i = 0; i < d.entities.length; ++i) {
                    if (typeof d.entities[i] !== "object")
                        throw TypeError(".nxngstarter.CommonEntities.entities: object expected");
                    m.entities[i] = $root.nxngstarter.CommonEntity.fromObject(d.entities[i]);
                }
            }
            return m;
        };

        CommonEntities.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.arrays || o.defaults) {
                d.entities = [];
            }
            if (o.defaults) {
                if ($util.Long) {
                    var n = new $util.Long(0, 0, false);
                    d.count = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                } else
                    d.count = o.longs === String ? "0" : 0;
            }
            if (m.count != null && m.hasOwnProperty("count")) {
                if (typeof m.count === "number")
                    d.count = o.longs === String ? String(m.count) : m.count;
                else
                    d.count = o.longs === String ? $util.Long.prototype.toString.call(m.count) : o.longs === Number ? new $util.LongBits(m.count.low >>> 0, m.count.high >>> 0).toNumber() : m.count;
            }
            if (m.entities && m.entities.length) {
                d.entities = [];
                for (var j = 0; j < m.entities.length; ++j) {
                    d.entities[j] = $root.nxngstarter.CommonEntity.toObject(m.entities[j], o);
                }
            }
            return d;
        };

        CommonEntities.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CommonEntities;
    })();

    nxngstarter.CommonEntity = (function() {

        function CommonEntity(p) {
            this.subEntitiesArray = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        CommonEntity.prototype.string1 = "";
        CommonEntity.prototype.num1 = 0;
        CommonEntity.prototype.num2 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        CommonEntity.prototype.boolean1 = false;
        CommonEntity.prototype.float1 = 0;
        CommonEntity.prototype.any1 = null;
        CommonEntity.prototype.subEntitiesArray = $util.emptyArray;
        CommonEntity.prototype.subEntittObj = null;

        CommonEntity.fromObject = function fromObject(d) {
            if (d instanceof $root.nxngstarter.CommonEntity)
                return d;
            var m = new $root.nxngstarter.CommonEntity();
            if (d.string1 != null) {
                m.string1 = String(d.string1);
            }
            if (d.num1 != null) {
                m.num1 = d.num1 | 0;
            }
            if (d.num2 != null) {
                if ($util.Long)
                    (m.num2 = $util.Long.fromValue(d.num2)).unsigned = false;
                else if (typeof d.num2 === "string")
                    m.num2 = parseInt(d.num2, 10);
                else if (typeof d.num2 === "number")
                    m.num2 = d.num2;
                else if (typeof d.num2 === "object")
                    m.num2 = new $util.LongBits(d.num2.low >>> 0, d.num2.high >>> 0).toNumber();
            }
            if (d.boolean1 != null) {
                m.boolean1 = Boolean(d.boolean1);
            }
            if (d.float1 != null) {
                m.float1 = Number(d.float1);
            }
            if (d.any1 != null) {
                if (typeof d.any1 !== "object")
                    throw TypeError(".nxngstarter.CommonEntity.any1: object expected");
                m.any1 = $root.google.protobuf.Any.fromObject(d.any1);
            }
            if (d.subEntitiesArray) {
                if (!Array.isArray(d.subEntitiesArray))
                    throw TypeError(".nxngstarter.CommonEntity.subEntitiesArray: array expected");
                m.subEntitiesArray = [];
                for (var i = 0; i < d.subEntitiesArray.length; ++i) {
                    if (typeof d.subEntitiesArray[i] !== "object")
                        throw TypeError(".nxngstarter.CommonEntity.subEntitiesArray: object expected");
                    m.subEntitiesArray[i] = $root.nxngstarter.SubEntity.fromObject(d.subEntitiesArray[i]);
                }
            }
            if (d.subEntittObj != null) {
                if (typeof d.subEntittObj !== "object")
                    throw TypeError(".nxngstarter.CommonEntity.subEntittObj: object expected");
                m.subEntittObj = $root.nxngstarter.SubEntity.fromObject(d.subEntittObj);
            }
            return m;
        };

        CommonEntity.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.arrays || o.defaults) {
                d.subEntitiesArray = [];
            }
            if (o.defaults) {
                d.string1 = "";
                d.num1 = 0;
                if ($util.Long) {
                    var n = new $util.Long(0, 0, false);
                    d.num2 = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
                } else
                    d.num2 = o.longs === String ? "0" : 0;
                d.boolean1 = false;
                d.float1 = 0;
                d.subEntittObj = null;
                d.any1 = null;
            }
            if (m.string1 != null && m.hasOwnProperty("string1")) {
                d.string1 = m.string1;
            }
            if (m.num1 != null && m.hasOwnProperty("num1")) {
                d.num1 = m.num1;
            }
            if (m.num2 != null && m.hasOwnProperty("num2")) {
                if (typeof m.num2 === "number")
                    d.num2 = o.longs === String ? String(m.num2) : m.num2;
                else
                    d.num2 = o.longs === String ? $util.Long.prototype.toString.call(m.num2) : o.longs === Number ? new $util.LongBits(m.num2.low >>> 0, m.num2.high >>> 0).toNumber() : m.num2;
            }
            if (m.boolean1 != null && m.hasOwnProperty("boolean1")) {
                d.boolean1 = m.boolean1;
            }
            if (m.float1 != null && m.hasOwnProperty("float1")) {
                d.float1 = o.json && !isFinite(m.float1) ? String(m.float1) : m.float1;
            }
            if (m.subEntitiesArray && m.subEntitiesArray.length) {
                d.subEntitiesArray = [];
                for (var j = 0; j < m.subEntitiesArray.length; ++j) {
                    d.subEntitiesArray[j] = $root.nxngstarter.SubEntity.toObject(m.subEntitiesArray[j], o);
                }
            }
            if (m.subEntittObj != null && m.hasOwnProperty("subEntittObj")) {
                d.subEntittObj = $root.nxngstarter.SubEntity.toObject(m.subEntittObj, o);
            }
            if (m.any1 != null && m.hasOwnProperty("any1")) {
                d.any1 = $root.google.protobuf.Any.toObject(m.any1, o);
            }
            return d;
        };

        CommonEntity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CommonEntity;
    })();

    nxngstarter.SubEntity = (function() {

        function SubEntity(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        SubEntity.prototype.id = "";

        SubEntity.fromObject = function fromObject(d) {
            if (d instanceof $root.nxngstarter.SubEntity)
                return d;
            var m = new $root.nxngstarter.SubEntity();
            if (d.id != null) {
                m.id = String(d.id);
            }
            return m;
        };

        SubEntity.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.defaults) {
                d.id = "";
            }
            if (m.id != null && m.hasOwnProperty("id")) {
                d.id = m.id;
            }
            return d;
        };

        SubEntity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SubEntity;
    })();

    nxngstarter.CommonEntityFilterDto = (function() {

        function CommonEntityFilterDto(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        CommonEntityFilterDto.prototype.num1 = 0;

        CommonEntityFilterDto.fromObject = function fromObject(d) {
            if (d instanceof $root.nxngstarter.CommonEntityFilterDto)
                return d;
            var m = new $root.nxngstarter.CommonEntityFilterDto();
            if (d.num1 != null) {
                m.num1 = d.num1 | 0;
            }
            return m;
        };

        CommonEntityFilterDto.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.defaults) {
                d.num1 = 0;
            }
            if (m.num1 != null && m.hasOwnProperty("num1")) {
                d.num1 = m.num1;
            }
            return d;
        };

        CommonEntityFilterDto.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CommonEntityFilterDto;
    })();

    nxngstarter.SampleServiceRequest = (function() {

        function SampleServiceRequest(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        SampleServiceRequest.prototype.input1 = "";
        SampleServiceRequest.prototype.input2 = "";

        SampleServiceRequest.fromObject = function fromObject(d) {
            if (d instanceof $root.nxngstarter.SampleServiceRequest)
                return d;
            var m = new $root.nxngstarter.SampleServiceRequest();
            if (d.input1 != null) {
                m.input1 = String(d.input1);
            }
            if (d.input2 != null) {
                m.input2 = String(d.input2);
            }
            return m;
        };

        SampleServiceRequest.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.defaults) {
                d.input1 = "";
                d.input2 = "";
            }
            if (m.input1 != null && m.hasOwnProperty("input1")) {
                d.input1 = m.input1;
            }
            if (m.input2 != null && m.hasOwnProperty("input2")) {
                d.input2 = m.input2;
            }
            return d;
        };

        SampleServiceRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SampleServiceRequest;
    })();

    nxngstarter.SampleServiceResponse = (function() {

        function SampleServiceResponse(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        SampleServiceResponse.prototype.status = "";
        SampleServiceResponse.prototype.data = null;

        SampleServiceResponse.fromObject = function fromObject(d) {
            if (d instanceof $root.nxngstarter.SampleServiceResponse)
                return d;
            var m = new $root.nxngstarter.SampleServiceResponse();
            if (d.status != null) {
                m.status = String(d.status);
            }
            if (d.data != null) {
                if (typeof d.data !== "object")
                    throw TypeError(".nxngstarter.SampleServiceResponse.data: object expected");
                m.data = $root.nxngstarter.SampleServiceResponse.ResponseData.fromObject(d.data);
            }
            return m;
        };

        SampleServiceResponse.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.defaults) {
                d.status = "";
                d.data = null;
            }
            if (m.status != null && m.hasOwnProperty("status")) {
                d.status = m.status;
            }
            if (m.data != null && m.hasOwnProperty("data")) {
                d.data = $root.nxngstarter.SampleServiceResponse.ResponseData.toObject(m.data, o);
            }
            return d;
        };

        SampleServiceResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        SampleServiceResponse.ResponseData = (function() {

            function ResponseData(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            ResponseData.prototype.stringValue = "";
            ResponseData.prototype.intValue = 0;

            ResponseData.fromObject = function fromObject(d) {
                if (d instanceof $root.nxngstarter.SampleServiceResponse.ResponseData)
                    return d;
                var m = new $root.nxngstarter.SampleServiceResponse.ResponseData();
                if (d.stringValue != null) {
                    m.stringValue = String(d.stringValue);
                }
                if (d.intValue != null) {
                    m.intValue = d.intValue | 0;
                }
                return m;
            };

            ResponseData.toObject = function toObject(m, o) {
                if (!o)
                    o = {};
                var d = {};
                if (o.defaults) {
                    d.stringValue = "";
                    d.intValue = 0;
                }
                if (m.stringValue != null && m.hasOwnProperty("stringValue")) {
                    d.stringValue = m.stringValue;
                }
                if (m.intValue != null && m.hasOwnProperty("intValue")) {
                    d.intValue = m.intValue;
                }
                return d;
            };

            ResponseData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ResponseData;
        })();

        return SampleServiceResponse;
    })();

    nxngstarter.SampleService = (function() {

        function SampleService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (SampleService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = SampleService;


        Object.defineProperty(SampleService.prototype.sampleServiceMethod = function sampleServiceMethod(request, callback) {
            return this.rpcCall(sampleServiceMethod, $root.nxngstarter.SampleServiceRequest, $root.nxngstarter.SampleServiceResponse, request, callback);
        }, "name", { value: "SampleServiceMethod" });

        return SampleService;
    })();

    return nxngstarter;
})();

export const google = $root.google = (() => {

    const google = {};

    google.protobuf = (function() {

        const protobuf = {};

        protobuf.Any = (function() {

            function Any(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            Any.prototype.type_url = "";
            Any.prototype.value = $util.newBuffer([]);

            Any.fromObject = function fromObject(d) {
                if (d instanceof $root.google.protobuf.Any)
                    return d;
                var m = new $root.google.protobuf.Any();
                if (d.type_url != null) {
                    m.type_url = String(d.type_url);
                }
                if (d.value != null) {
                    if (typeof d.value === "string")
                        $util.base64.decode(d.value, m.value = $util.newBuffer($util.base64.length(d.value)), 0);
                    else if (d.value.length)
                        m.value = d.value;
                }
                return m;
            };

            Any.toObject = function toObject(m, o) {
                if (!o)
                    o = {};
                var d = {};
                if (o.defaults) {
                    d.type_url = "";
                    if (o.bytes === String)
                        d.value = "";
                    else {
                        d.value = [];
                        if (o.bytes !== Array)
                            d.value = $util.newBuffer(d.value);
                    }
                }
                if (m.type_url != null && m.hasOwnProperty("type_url")) {
                    d.type_url = m.type_url;
                }
                if (m.value != null && m.hasOwnProperty("value")) {
                    d.value = o.bytes === String ? $util.base64.encode(m.value, 0, m.value.length) : o.bytes === Array ? Array.prototype.slice.call(m.value) : m.value;
                }
                return d;
            };

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
